/**
 * photostrip.service.js
 * Captures the #photostrip DOM element to a PNG using html2canvas.
 * Output is identical to what the user sees in Preview.
 *
 * Install: npm install html2canvas
 */
import html2canvas from 'html2canvas'

/**
 * Renders the #photostrip element to a base64 PNG string.
 * @returns {Promise<string>} base64 data URL  (image/png)
 */
export async function generatePhotoStrip() {
  const el = document.getElementById('photostrip')

  if (!el) {
    throw new Error('[photostrip] Element #photostrip not found in DOM.')
  }

  const canvas = await html2canvas(el, {
    scale: 2,          // 2× for retina / print quality
    useCORS: true,       // allow cross-origin photo src
    allowTaint: true,
    backgroundColor: null,    // respect el's own background
    logging: false,
  })

  return canvas.toDataURL('image/png')
}

/**
 * Triggers a PNG download in the browser.
 * @param {string} dataUrl - base64 PNG from generatePhotoStrip()
 * @param {string} [filename]
 */
export function downloadPhotoStrip(
  dataUrl,
  filename = `stadium-booth-${Date.now()}.png`
) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
