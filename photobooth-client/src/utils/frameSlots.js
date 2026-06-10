/**
 * FRAME_SLOTS
 *
 * Key    → must match selectedFrame.name exactly (what you pass as `frameKey`)
 * whiteSlot → true  = your PNG has opaque white placeholder rectangles (most common)
 *             false = your PNG already has transparent holes (just draw photos under)
 * luminanceThreshold → 0–255. Pixels brighter than this get punched out. Default 215.
 *                      Raise it (e.g. 230) if non-slot whites are being erased.
 *                      Lower it (e.g. 190) if the slot isn't clearing fully.
 * slots  → array of { x, y, width, height } in the frame PNG's natural pixel coordinates
 *
 * ─── How to find slot coordinates for a new frame ────────────────────────────
 *
 * Option A — Use the built-in debug mode:
 *   Pass debug=true to renderFrameToCanvas:
 *     renderFrameToCanvas({ canvas, frameSrc, photoSrc, frameKey, debug: true })
 *   Colored rectangles will be drawn over auto-detected slots.
 *   Tweak the x/y/width/height until they align, then save here.
 *
 * Option B — Check in an image editor (Figma, Photoshop, etc.):
 *   Open your frame PNG, hover over each corner of a white slot,
 *   note the pixel coordinates, compute width = right - left, height = bottom - top.
 *
 * Option C — Run detectWhiteSlots in the browser console:
 *   import { renderFrameToCanvas } from '@/utils/frameRenderer'
 *   Use debug: true — slot coords are also logged to the console.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const FRAME_SLOTS = {

  // ── Example: a frame with 3 portrait-stacked photos ──────────────────────
  // Replace x/y/width/height with the real pixel values from your PNG.
  'Frame 9-3': {
    canvasWidth: 1260,
    canvasHeight: 1890,
    whiteSlot: true,          // PNG has opaque white photo areas
    luminanceThreshold: 215,  // tune if whites aren't clearing / too much is clearing
    slots: [
      // { x: LEFT_EDGE, y: TOP_EDGE, width: SLOT_W, height: SLOT_H }
      // ↑ These must be measured from your actual PNG — see calibration guide above.
      { x: 680, y: 320, width: 480, height: 360 },
      { x: 680, y: 710, width: 480, height: 360 },
      { x: 680, y: 1100, width: 480, height: 360 },
    ],
  },

  // ── 2-slot example ────────────────────────────────────────────────────────
  // 'My Frame 2': {
  //   canvasWidth: 900,
  //   canvasHeight: 1200,
  //   whiteSlot: true,
  //   slots: [
  //     { x: 50,  y: 80,  width: 800, height: 480 },
  //     { x: 50,  y: 620, width: 800, height: 480 },
  //   ],
  // },

  // ── Frame with transparent holes (no punching needed) ─────────────────────
  // 'Transparent Frame': {
  //   canvasWidth: 1080,
  //   canvasHeight: 1920,
  //   whiteSlot: false,   // PNG already has transparent holes
  //   slots: [
  //     { x: 40, y: 40, width: 1000, height: 900 },
  //   ],
  // },

}

export default FRAME_SLOTS
