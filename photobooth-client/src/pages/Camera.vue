<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { usePhotoboothStore } from '@/stores/photobooth'
import BoothLayout from '@/layouts/BoothLayout.vue'

const router = useRouter()
const store = usePhotoboothStore()

const video = ref(null)
const canvas = ref(null)
const countdown = ref(null)
const currentPhoto = ref(0)
const isCapturing = ref(false)
const showFlash = ref(false)
const isReady = ref(false)

let stream = null

const totalPhotos = computed(() => store.selectedPackage?.photos ?? 0)

const photoDots = computed(() =>
  Array.from({ length: totalPhotos.value }, (_, i) => ({
    taken: i < currentPhoto.value - 1,
    active: isCapturing.value && i === currentPhoto.value - 1,
  }))
)

// Slots for the right-side strip
const stripSlots = computed(() =>
  Array.from({ length: totalPhotos.value }, (_, i) => ({
    index: i + 1,
    taken: i < store.photos.length,
    active: isCapturing.value && i === currentPhoto.value - 1,
    thumb: store.photos[i] ?? null,
  }))
)

onMounted(async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    video.value.srcObject = stream
    video.value.addEventListener('loadedmetadata', () => { isReady.value = true })
  } catch (err) {
    console.error(err)
    alert('Kamera tidak dapat diakses')
  }
})

onBeforeUnmount(() => {
  if (stream) stream.getTracks().forEach(t => t.stop())
})

function capturePhoto() {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  ctx.save()
  ctx.scale(-1, 1)
  ctx.drawImage(video.value, -canvas.value.width, 0)
  ctx.restore()
  store.addPhoto(canvas.value.toDataURL('image/png'))
  showFlash.value = true
  setTimeout(() => { showFlash.value = false }, 380)
}

async function startCountdown() {
  countdown.value = 3
  return new Promise(resolve => {
    const iv = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(iv)
        countdown.value = '📸'
        setTimeout(() => { countdown.value = null; resolve() }, 500)
      }
    }, 1000)
  })
}

async function startSession() {
  if (isCapturing.value) return
  isCapturing.value = true
  store.clearPhotos()
  for (let i = 0; i < totalPhotos.value; i++) {
    currentPhoto.value = i + 1
    await startCountdown()
    capturePhoto()
    await new Promise(r => setTimeout(r, 900))
  }
  router.push('/preview')
}
</script>

<template>
  <BoothLayout>
    <div class="camera-page">

      <!-- Header -->
      <div class="camera-header">
        <div>
          <p class="camera-eyebrow">Stadium Booth</p>
          <h1 class="camera-title">Kamera <span>Photobooth</span></h1>
        </div>
        <div class="camera-badge">
          <div class="camera-badge-dot" :class="{ ready: isReady && !isCapturing }" />
          <span class="camera-badge-text">
            {{ isCapturing ? 'Recording' : isReady ? 'Ready' : 'Connecting' }}
          </span>
        </div>
      </div>

      <!-- Progress row -->
      <div class="camera-progress-row">
        <span class="camera-progress-label">Foto</span>
        <div class="camera-dots">
          <div v-for="(dot, i) in photoDots" :key="i" class="camera-dot"
            :class="{ taken: dot.taken, active: dot.active }" />
        </div>
        <span class="camera-progress-counter">
          {{ currentPhoto || 0 }}
          <em>&thinsp;/&thinsp;{{ totalPhotos }}</em>
        </span>
        <span class="camera-package-label">
          {{ store.selectedPackage?.name }} · {{ totalPhotos }} Foto
        </span>
      </div>

      <!-- Two-column main -->
      <div class="camera-main">

        <!-- Viewfinder -->
        <div class="camera-viewfinder">
          <!-- corner brackets bottom via child element -->
          <div class="camera-vf-br" />

          <!-- STADIUM BOOTH · LIVE label -->
          <div class="camera-vf-label">Stadium Booth &middot; Live</div>

          <!-- Camera feed (hidden until ready, shows placeholder) -->
          <video v-show="isReady" ref="video" autoplay playsinline class="camera-video" />

          <!-- Placeholder -->
          <div v-if="!isReady" class="camera-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span class="camera-placeholder-text">Siap Kamera</span>
          </div>

          <!-- Countdown overlay -->
          <div v-if="countdown !== null" class="camera-countdown">
            <span class="camera-countdown-num">{{ countdown }}</span>
          </div>

          <!-- Shutter flash -->
          <div v-if="showFlash" class="camera-flash" />
        </div>

        <!-- Photo strip -->
        <div class="camera-strip">
          <div class="strip-header">Strip</div>
          <div v-for="slot in stripSlots" :key="slot.index" class="strip-slot"
            :class="{ taken: slot.taken, active: slot.active }">
            <span class="strip-slot-num">{{ slot.index }}</span>
            <template v-if="slot.taken">
              <img :src="slot.thumb" class="strip-slot-thumb" alt="" />
              <div class="strip-slot-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </template>
          </div>
        </div>

      </div><!-- /camera-main -->

      <!-- Hidden canvas -->
      <canvas ref="canvas" hidden />

      <!-- Action bar -->
      <div class="camera-actions">
        <button class="btn-back" @click="router.back()">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Back
        </button>

        <button class="btn-start" :disabled="isCapturing || !isReady" @click="startSession">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          {{ isCapturing ? `Mengambil foto ${currentPhoto}…` : 'Mulai Sesi Foto' }}
        </button>

        <div class="camera-package-block">
          <div class="camera-package-name">{{ store.selectedPackage?.name ?? '-' }}</div>
          <div class="camera-package-sub">{{ store.photos.length }} / {{ totalPhotos }} Foto</div>
        </div>
      </div>

    </div>
  </BoothLayout>
</template>

<style src="@/assets/css/camera.css"></style>
