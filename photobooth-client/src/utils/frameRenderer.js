import FRAME_SLOTS from './frameSlots'

// ─── Helpers ────────────────────────────────────────────────────────────────

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Returns the source crop rect so a photo covers a destination slot (object-fit: cover).
 */
function computeCoverSource(photo, destW, destH) {
  const sw = photo.naturalWidth || photo.width
  const sh = photo.naturalHeight || photo.height
  const photoRatio = sw / sh
  const destRatio = destW / destH
  let sx = 0, sy = 0, sWidth = sw, sHeight = sh
  if (photoRatio > destRatio) {
    sWidth = Math.round(sh * destRatio)
    sx = Math.round((sw - sWidth) / 2)
  } else {
    sHeight = Math.round(sw / destRatio)
    sy = Math.round((sh - sHeight) / 2)
  }
  return { sx, sy, sWidth, sHeight }
}

// ─── Auto-detect white rectangular slots ────────────────────────────────────

/**
 * Scans the frame image for large bright/white rectangular regions.
 * Returns [{x, y, width, height}] in the frame's natural coordinate space.
 */
async function detectWhiteSlots(frameImg) {
  const maxDim = 800
  const scale = Math.min(1, maxDim / Math.max(frameImg.naturalWidth, frameImg.naturalHeight))
  const w = Math.max(1, Math.round(frameImg.naturalWidth * scale))
  const h = Math.max(1, Math.round(frameImg.naturalHeight * scale))

  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const cx = c.getContext('2d')
  cx.drawImage(frameImg, 0, 0, w, h)
  const { data } = cx.getImageData(0, 0, w, h)

  // Binary mask: opaque and bright (white-ish)
  const mask = new Uint8Array(w * h)
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    mask[p] = (a > 200 && lum > 220) ? 1 : 0
  }

  const visited = new Uint8Array(w * h)
  const boxes = []
  const stack = []
  const minArea = Math.max(500, (w * h) * 0.003)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x
      if (!mask[idx] || visited[idx]) continue

      let minX = x, maxX = x, minY = y, maxY = y, area = 0
      stack.push(idx)
      visited[idx] = 1

      while (stack.length) {
        const cur = stack.pop()
        const cy = Math.floor(cur / w)
        const cx2 = cur % w
        area++
        if (cx2 < minX) minX = cx2
        if (cx2 > maxX) maxX = cx2
        if (cy < minY) minY = cy
        if (cy > maxY) maxY = cy

        for (const n of [cur - 1, cur + 1, cur - w, cur + w]) {
          if (n >= 0 && n < w * h && !visited[n] && mask[n]) {
            visited[n] = 1
            stack.push(n)
          }
        }
      }

      if (area >= minArea) {
        boxes.push({
          x: Math.round((minX - 2) / scale),
          y: Math.round((minY - 2) / scale),
          width: Math.round((maxX - minX + 5) / scale),
          height: Math.round((maxY - minY + 5) / scale),
        })
      }
    }
  }

  boxes.sort((a, b) => a.y - b.y)
  return boxes
}

// ─── Core render logic ───────────────────────────────────────────────────────

/**
 * Punches out white/bright pixels inside the given slots on a canvas context.
 * This removes the opaque white placeholder so photos drawn underneath show through.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<{x,y,width,height}>} slots
 * @param {number} threshold  luminance threshold for "white" (0–255, default 215)
 */
function punchWhiteSlotsFromContext(ctx, slots, threshold = 215) {
  for (const slot of slots) {
    const x = Math.max(0, Math.round(slot.x))
    const y = Math.max(0, Math.round(slot.y))
    const w = Math.round(slot.width)
    const h = Math.round(slot.height)

    const imageData = ctx.getImageData(x, y, w, h)
    const d = imageData.data

    for (let i = 0; i < d.length; i += 4) {
      const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]
      if (lum > threshold) {
        d[i + 3] = 0  // transparent
      }
    }

    ctx.putImageData(imageData, x, y)
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * Renders photos into a frame PNG's slots onto the given canvas.
 *
 * How it works:
 *  1. Draw photos into their slot rectangles (in frame's natural coordinate space).
 *  2. Build a modified copy of the frame where the white slot areas are punched
 *     out (made transparent) so the photos show through.
 *  3. Draw the punched frame on top — decorative elements (characters, borders, etc.)
 *     that aren't white survive and appear above the photos.
 *
 * Frame config shape (from frameSlots.js):
 *   {
 *     canvasWidth:  number,   // frame PNG natural width  (optional — auto-detected)
 *     canvasHeight: number,   // frame PNG natural height (optional — auto-detected)
 *     whiteSlot:    boolean,  // true if photo slots are opaque white (default: true)
 *     luminanceThreshold: number, // how "white" to punch (default 215, range 0–255)
 *     slots: [{ x, y, width, height }],  // in frame's natural pixel coordinates
 *   }
 *
 * @param {{ canvas, frameSrc, photoSrc, frameKey, debug }} opts
 *   debug=true draws colored outlines around detected slots (useful for calibrating coords)
 */
export async function renderFrameToCanvas({ canvas, frameSrc, photoSrc, frameKey, debug = false }) {
  if (!canvas) throw new Error('canvas is required')

  const frameImg = await loadImage(frameSrc)

  // ── Resolve config ──
  let config = FRAME_SLOTS[frameKey]
  let slotsWereAutoDetected = false

  if (!config) {
    console.warn(`[frameRenderer] No slot config found for key "${frameKey}". Auto-detecting white slots.`)
    const autoSlots = await detectWhiteSlots(frameImg)
    console.info(`[frameRenderer] Auto-detected ${autoSlots.length} slot(s):`, autoSlots)
    config = {
      canvasWidth: frameImg.naturalWidth,
      canvasHeight: frameImg.naturalHeight,
      whiteSlot: true,
      slots: autoSlots,
    }
    slotsWereAutoDetected = true
  }

  const canvasW = config.canvasWidth ?? frameImg.naturalWidth
  const canvasH = config.canvasHeight ?? frameImg.naturalHeight
  const whiteSlot = config.whiteSlot !== false   // default true
  const luminanceThreshold = config.luminanceThreshold ?? 215

  canvas.width = canvasW
  canvas.height = canvasH

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvasW, canvasH)

  // ── Normalize photos array ──
  const photoSources = Array.isArray(photoSrc) ? photoSrc : [photoSrc]
  const photoImgs = await Promise.all(
    photoSources.map(src => (src ? loadImage(src) : Promise.resolve(null)))
  )

  // ── Scale: fit frame natural size into target canvas ──
  const scaleX = canvasW / frameImg.naturalWidth
  const scaleY = canvasH / frameImg.naturalHeight
  // Use uniform scale only if canvas differs from frame natural size
  const sx = scaleX, sy = scaleY

  const slots = config.slots

  if (slots.length === 0) {
    console.warn('[frameRenderer] No slots found — drawing frame only.')
    ctx.drawImage(frameImg, 0, 0, canvasW, canvasH)
    return { composedDataUrl: canvas.toDataURL('image/png'), slotDataUrls: [] }
  }

  // ── Step 1: Draw photos into their slot positions ──
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i]
    const photo = photoImgs[i] ?? photoImgs[0]
    if (!photo) continue

    const drawX = Math.round(slot.x * sx)
    const drawY = Math.round(slot.y * sy)
    const drawW = Math.round(slot.width * sx)
    const drawH = Math.round(slot.height * sy)

    const { sx: cropX, sy: cropY, sWidth, sHeight } = computeCoverSource(photo, drawW, drawH)
    ctx.drawImage(photo, cropX, cropY, sWidth, sHeight, drawX, drawY, drawW, drawH)
  }

  if (whiteSlot) {
    // ── Step 2: Build a punched copy of the frame (white slots → transparent) ──
    const frameCanvas = document.createElement('canvas')
    frameCanvas.width = canvasW
    frameCanvas.height = canvasH
    const frameCtx = frameCanvas.getContext('2d')
    frameCtx.drawImage(frameImg, 0, 0, canvasW, canvasH)

    // Scale slots to canvas size before punching
    const scaledSlots = slots.map(s => ({
      x: s.x * sx,
      y: s.y * sy,
      width: s.width * sx,
      height: s.height * sy,
    }))
    punchWhiteSlotsFromContext(frameCtx, scaledSlots, luminanceThreshold)

    // ── Step 3: Draw the punched frame on top — decorations survive, white holes are gone ──
    ctx.drawImage(frameCanvas, 0, 0)
  } else {
    // Frame has transparent holes already — just draw it on top
    ctx.drawImage(frameImg, 0, 0, canvasW, canvasH)
  }

  // ── Debug: draw slot outlines ──
  if (debug || slotsWereAutoDetected) {
    ctx.save()
    slots.forEach((slot, i) => {
      const colors = ['#FF3B30', '#34C759', '#007AFF', '#FF9500', '#AF52DE']
      ctx.strokeStyle = colors[i % colors.length]
      ctx.lineWidth = 4
      ctx.strokeRect(
        Math.round(slot.x * sx),
        Math.round(slot.y * sy),
        Math.round(slot.width * sx),
        Math.round(slot.height * sy)
      )
      ctx.fillStyle = colors[i % colors.length]
      ctx.font = `bold ${Math.round(24 * Math.min(sx, sy))}px sans-serif`
      ctx.fillText(`Slot ${i + 1}`, Math.round(slot.x * sx) + 8, Math.round(slot.y * sy) + 32)
    })
    ctx.restore()
  }

  // ── Per-slot data URLs (for downstream use) ──
  const slotDataUrls = slots.map((slot, i) => {
    const off = document.createElement('canvas')
    off.width = Math.round(slot.width)
    off.height = Math.round(slot.height)
    const offCtx = off.getContext('2d')
    const photo = photoImgs[i] ?? photoImgs[0]
    if (photo) {
      const { sx: cx, sy: cy, sWidth, sHeight } = computeCoverSource(photo, slot.width, slot.height)
      offCtx.drawImage(photo, cx, cy, sWidth, sHeight, 0, 0, slot.width, slot.height)
    }
    return off.toDataURL('image/png')
  })

  return {
    composedDataUrl: canvas.toDataURL('image/png'),
    slotDataUrls,
  }
}

export default { loadImage, renderFrameToCanvas }
