<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePhotoboothStore } from '@/stores/photobooth'
import BoothLayout from '@/layouts/BoothLayout.vue'

const router = useRouter()
const store = usePhotoboothStore()

const email = ref(store.email || '')
const isDirty = ref(false)

const isValid = computed(() => {
  if (!email.value) return null
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})

const next = () => {
  isDirty.value = true
  if (!isValid.value) return
  store.setEmail(email.value)
  router.push('/frame')
}

const goBack = () => router.push('/package')
</script>

<template>
  <BoothLayout>
    <div class="email-scene">
      <div class="bg-noise"></div>

      <!-- Pitch wireframe – top right -->
      <svg class="pitch-deco" viewBox="0 0 240 168" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="232" height="160" rx="4" stroke="currentColor" stroke-width="1.5"/>
        <line x1="120" y1="4" x2="120" y2="164" stroke="currentColor" stroke-width="1"/>
        <circle cx="120" cy="84" r="28" stroke="currentColor" stroke-width="1"/>
        <circle cx="120" cy="84" r="2.5" fill="currentColor"/>
        <rect x="4" y="44" width="38" height="80" stroke="currentColor" stroke-width="1"/>
        <rect x="198" y="44" width="38" height="80" stroke="currentColor" stroke-width="1"/>
        <rect x="4" y="58" width="16" height="52" stroke="currentColor" stroke-width="1"/>
        <rect x="220" y="58" width="16" height="52" stroke="currentColor" stroke-width="1"/>
        <line x1="0" y1="70" x2="4" y2="70" stroke="currentColor" stroke-width="1.5"/>
        <line x1="0" y1="98" x2="4" y2="98" stroke="currentColor" stroke-width="1.5"/>
        <line x1="236" y1="70" x2="240" y2="70" stroke="currentColor" stroke-width="1.5"/>
        <line x1="236" y1="98" x2="240" y2="98" stroke="currentColor" stroke-width="1.5"/>
      </svg>

      <!-- Dot grid – bottom left -->
      <div class="dot-grid">
        <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <circle cx="10" cy="10" r="2.2"/><circle cx="28" cy="10" r="2.2"/><circle cx="46" cy="10" r="2.2"/><circle cx="64" cy="10" r="2.2"/><circle cx="82" cy="10" r="2.2"/><circle cx="100" cy="10" r="2.2"/>
            <circle cx="10" cy="28" r="2.2"/><circle cx="28" cy="28" r="2.2"/><circle cx="46" cy="28" r="2.2"/><circle cx="64" cy="28" r="2.2"/><circle cx="82" cy="28" r="2.2"/><circle cx="100" cy="28" r="2.2"/>
            <circle cx="10" cy="46" r="2.2"/><circle cx="28" cy="46" r="2.2"/><circle cx="46" cy="46" r="2.2"/><circle cx="64" cy="46" r="2.2"/><circle cx="82" cy="46" r="2.2"/><circle cx="100" cy="46" r="2.2"/>
            <circle cx="10" cy="64" r="2.2"/><circle cx="28" cy="64" r="2.2"/><circle cx="46" cy="64" r="2.2"/><circle cx="64" cy="64" r="2.2"/><circle cx="82" cy="64" r="2.2"/><circle cx="100" cy="64" r="2.2"/>
            <circle cx="10" cy="82" r="2.2"/><circle cx="28" cy="82" r="2.2"/><circle cx="46" cy="82" r="2.2"/><circle cx="64" cy="82" r="2.2"/><circle cx="82" cy="82" r="2.2"/><circle cx="100" cy="82" r="2.2"/>
          </g>
        </svg>
      </div>

      <!-- Floating stars -->
      <span class="fstar red"  style="top:10%;left:7%;--sz:13px;--dur:5s;--tx:9px;--ty:11px">✦</span>
      <span class="fstar gold" style="top:20%;right:9%;--sz:9px;--dur:7.5s;--tx:-8px;--ty:13px">★</span>
      <span class="fstar dark" style="bottom:28%;left:12%;--sz:8px;--dur:6.2s;--tx:10px;--ty:-9px">✦</span>
      <span class="fstar red"  style="bottom:18%;right:14%;--sz:11px;--dur:8s;--tx:-9px;--ty:-11px">✦</span>
      <span class="fstar gold" style="top:52%;right:5%;--sz:8px;--dur:9s;--tx:7px;--ty:8px">★</span>

      <div class="email-scroll">

        <!-- Back button -->
        <button class="back-btn" @click="goBack">
          <span class="back-arrow">←</span> KEMBALI
        </button>

        <div class="email-card">

          <!-- Stamp + header -->
          <div class="email-stamp">✉️</div>
          <div class="email-eyebrow">STADIUM BOOTH · BANDUNG</div>

          <div class="email-headline">
            <span class="eh-main">MASUKKAN</span>
            <em class="eh-em">Email</em>
          </div>

          <!-- Step indicator -->
          <div class="step-row">
            <span class="step-pill done">01 PAKET</span>
            <span class="step-connector"></span>
            <span class="step-pill active">02 EMAIL</span>
            <span class="step-connector"></span>
            <span class="step-pill">03 FOTO</span>
          </div>

          <!-- Divider -->
          <div class="hd">
            <span class="hd-line"></span>
            <span class="hd-cross">+</span>
            <span class="hd-line"></span>
          </div>

          <!-- Description -->
          <p class="email-desc">
            Foto hasil sesi akan dikirim ke alamat email ini setelah selesai.
          </p>

          <!-- Input group -->
          <div class="input-group">
            <label class="input-label">ALAMAT EMAIL</label>

            <div class="input-wrap" :class="{
              'state-valid':   isValid === true  && isDirty,
              'state-invalid': isValid === false && isDirty
            }">
              <!-- Icon -->
              <span class="input-icon">
                <svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/>
                  <path d="M1 4 L10 9 L19 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
              </span>

              <input
                v-model="email"
                type="email"
                placeholder="contoh@email.com"
                class="email-input"
                autocomplete="email"
                @keyup.enter="next"
              />

              <!-- Valid check -->
              <span v-if="isValid === true && isDirty" class="input-check">✓</span>
            </div>

            <!-- Error message -->
            <div v-if="isValid === false && isDirty" class="input-error">
              <span class="err-ico">⚠</span> Format email tidak valid
            </div>
          </div>

          <!-- Tricolor bar -->
          <div class="tricolor">
            <span class="tc tc-navy"></span>
            <span class="tc tc-red"></span>
            <span class="tc tc-green"></span>
          </div>

          <!-- Submit button -->
          <button
            class="submit-btn"
            :class="{ 'is-disabled': isDirty && !isValid }"
            @click="next"
          >
            <span class="submit-txt">LANJUT KE FOTO</span>
            <span class="submit-arrow">→</span>
          </button>

          <!-- Privacy note -->
          <div class="privacy-note">
            🔒 Email hanya digunakan untuk mengirim foto sesimu
          </div>

        </div>
      </div>

      <!-- Live bottom bar -->
      <div class="live-bar">
        <span class="live-dot"></span>
        <span class="live-lbl">LIVE</span>
        <span class="live-sep">|</span>
        <div class="live-scroll">
          <span class="live-ticker">
            ⚽ STADIUM PHOTOBOOTH · MASUKKAN EMAIL · FOTO DIKIRIM SETELAH SESI · BANDUNG · WORLD CUP 2026 ⚽
          </span>
        </div>
      </div>

    </div>
  </BoothLayout>
</template>

<style src="@/assets/css/email.css"></style>
