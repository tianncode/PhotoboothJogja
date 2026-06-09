<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BoothLayout from '@/layouts/BoothLayout.vue'
import PhotoStrip from '@/components/PhotoStrip.vue'
import { usePhotoboothStore } from '@/stores/photobooth'
import { generatePhotoStrip, downloadPhotoStrip } from '@/services/photostrip'
import api from '@/services/api'

const router = useRouter()
const store = usePhotoboothStore()

const processing = ref(false)

const retakePhoto = () => {
  store.clearPhotos()
  router.push('/camera')
}

const usePhoto = async () => {
  processing.value = true
  try {
    const strip = await generatePhotoStrip()

    downloadPhotoStrip(strip)

    const response = await api.post('/send-photo', {
      email: store.email,
      image: strip,
    })

    console.log(response.data)

    router.push('/success')
  } catch (error) {
    console.error(error)
  } finally {
    processing.value = false
  }
}
</script>

<template>
  <BoothLayout>
    <div class="preview-page">

      <!-- ── Header ── -->
      <div class="preview-header">
        <div>
          <p class="preview-eyebrow">Stadium Booth</p>
          <h1 class="preview-title">Preview <span>Photostrip</span></h1>
        </div>
        <div class="preview-badge">
          <div class="preview-badge-dot" />
          <span class="preview-badge-text">Siap Cetak</span>
        </div>
      </div>

      <!-- ── Two-column body ── -->
      <div class="preview-body">

        <!-- Strip stage -->
        <div class="preview-stage">
          <span class="preview-stage-label">Stadium Booth &middot; Preview</span>

          <div class="preview-strip-wrapper">
            <PhotoStrip :photos="store.photos" :frame-name="store.selectedFrame?.name" />
          </div>

          <!-- Frame label below strip -->
          <div class="preview-frame-tag">
            <svg class="preview-frame-tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span class="preview-frame-tag-name">
              {{ store.selectedFrame?.name ?? 'Classic' }}
              &nbsp;·&nbsp;
              {{ store.selectedFrame?.subtitle ?? 'Navy · Clean' }}
            </span>
          </div>
        </div>

        <!-- Info panel -->
        <div class="preview-panel">

          <!-- Session summary card -->
          <div class="preview-card">
            <div class="preview-card-header">
              <svg class="preview-card-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span class="preview-card-title">Ringkasan Sesi</span>
            </div>
            <div class="preview-card-body">
              <div class="preview-row">
                <span class="preview-row-label">Paket</span>
                <span class="preview-row-value">{{ store.selectedPackage?.name ?? '-' }}</span>
              </div>
              <div class="preview-divider" />
              <div class="preview-row">
                <span class="preview-row-label">Jumlah Foto</span>
                <span class="preview-row-value">{{ store.photos.length }} Foto</span>
              </div>
              <div class="preview-divider" />
              <div class="preview-row">
                <span class="preview-row-label">Print</span>
                <span class="preview-row-value">{{ store.selectedPackage?.prints ?? 1 }} Print</span>
              </div>
              <div class="preview-divider" />
              <div class="preview-row">
                <span class="preview-row-label">Total</span>
                <span class="preview-row-value price">
                  Rp {{ store.selectedPackage?.price?.toLocaleString('id-ID') ?? '0' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Photo thumbnails card -->
          <div class="preview-card">
            <div class="preview-card-header">
              <svg class="preview-card-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span class="preview-card-title">Foto Kamu</span>
            </div>
            <div class="preview-card-body">
              <div class="preview-thumb-grid">
                <div v-for="(photo, i) in store.photos" :key="i" class="preview-thumb">
                  <img :src="photo" :alt="`Foto ${i + 1}`" />
                </div>
              </div>
            </div>
          </div>

          <!-- Email card -->
          <div class="preview-card">
            <div class="preview-card-header">
              <svg class="preview-card-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span class="preview-card-title">Kirim Ke</span>
            </div>
            <div class="preview-card-body">
              <div class="preview-row">
                <span class="preview-row-label">Email</span>
                <span class="preview-row-value" style="font-size:12px; text-transform: none; letter-spacing: 0">
                  {{ store.email ?? '-' }}
                </span>
              </div>
            </div>
          </div>

          <div class="preview-panel-spacer" />

          <!-- Action buttons + processing state -->
          <div class="preview-actions">
            <template v-if="!processing">
              <button class="btn-use" @click="usePhoto">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Gunakan Foto
              </button>
              <button class="btn-retake" @click="retakePhoto">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                </svg>
                Ulangi Foto
              </button>
            </template>

            <div v-else class="preview-processing">
              <div class="preview-spinner" />
              <span class="preview-processing-text">Memproses foto…</span>
            </div>
          </div>

          <p class="preview-hint">
            Foto akan dikirim ke email setelah konfirmasi
          </p>

        </div><!-- /preview-panel -->
      </div><!-- /preview-body -->

    </div>
  </BoothLayout>
</template>

<style src="@/assets/css/preview.css"></style>
