<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import BoothLayout from '@/layouts/BoothLayout.vue'
import { usePhotoboothStore } from '@/stores/photobooth'

const router = useRouter()
const store = usePhotoboothStore()

// ── Stepper ──────────────────────────────────────────────────
const steps = [
  { key: 'paket', label: 'Paket' },
  { key: 'frame', label: 'Frame' },
  { key: 'summary', label: 'Summary' },
  { key: 'bayar', label: 'Bayar' },
  { key: 'foto', label: 'Foto' },
]

const stepState = (i) => {
  if (i < 3) return 'done'
  if (i === 3) return 'active'
  return ''
}

// ── Countdown (5 menit = 300s) ───────────────────────────────
const DURATION = 300
const remaining = ref(DURATION)
let timer = null

const timerDisplay = computed(() => {
  const m = String(Math.floor(remaining.value / 60)).padStart(2, '0')
  const s = String(remaining.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

const isUrgent = computed(() => remaining.value > 0 && remaining.value <= 60)
const isExpired = computed(() => remaining.value <= 0)

const timerStatus = computed(() => {
  if (isExpired.value) return 'Waktu Habis'
  if (isUrgent.value) return 'Segera Bayar!'
  return 'Menunggu'
})

onMounted(() => {
  timer = setInterval(() => {
    if (remaining.value > 0) remaining.value--
  }, 1000)
})

onBeforeUnmount(() => clearInterval(timer))

// ── Payment methods ──────────────────────────────────────────
const methods = ['GOPAY', 'OVO', 'DANA', 'SHOPEEPAY', 'BCA']

// ── Fake QRIS ────────────────────────────────────────────────
const fakeQrisData = computed(() => {
  const payload =
    '000201010212' +
    '2658' +
    '0016ID.CO.QRIS.WWW' +
    '0117ID10230123456789' +
    '52044111' +
    '5303360' +
    `5404${store.totalPrice ?? 70000}` +
    '5802ID' +
    '5913STADIUM BOOTH' +
    '6007JAKARTA' +
    '6304ABCD'
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=0&data=${encodeURIComponent(payload)}`
})

// ── Pay action ────────────────────────────────────────────────
const verifying = ref(false)

const payNow = async () => {
  verifying.value = true
  await new Promise(r => setTimeout(r, 1500))
  clearInterval(timer)
  router.push('/camera')
}
</script>

<template>
  <BoothLayout>
    <div class="payment-page">

      <!-- ── Header ─────────────────────────────── -->
      <div class="camera-header">
        <div>
          <p class="camera-eyebrow">Stadium Booth</p>
          <h1 class="camera-title">Scan <span>QRIS</span></h1>
        </div>
        <div class="camera-badge" :style="isExpired ? { background: 'var(--red)' } : {}">
          <div class="camera-badge-dot" :class="{ ready: !isExpired && !isUrgent }" />
          <span class="camera-badge-text">
            {{ isExpired ? 'Waktu Habis' : 'Menunggu Pembayaran' }}
          </span>
        </div>
      </div>

      <!-- ── Stepper ────────────────────────────── -->
      <div class="payment-stepper">
        <div v-for="(step, i) in steps" :key="step.key" class="stepper-item">
          <div class="stepper-node">
            <div class="stepper-circle" :class="stepState(i)">
              <svg v-if="stepState(i) === 'done'" width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="3.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="stepper-label" :class="stepState(i)">{{ step.label }}</span>
          </div>
          <div v-if="i < steps.length - 1" class="stepper-line" :class="{ done: stepState(i) === 'done' }" />
        </div>
      </div>

      <!-- ── Two-column body ────────────────────── -->
      <div class="payment-body">

        <!-- ─── QRIS Card ──────────────────────── -->
        <div class="qris-card">

          <!-- Header -->
          <div class="qris-card-header">
            <span class="qris-card-title">QRIS Payment</span>
            <div class="qris-card-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span class="qris-card-badge-text">Stadium Booth</span>
            </div>
          </div>

          <!-- QR area -->
          <div class="qris-qr-area">
            <div class="qris-qr-frame">
              <div class="qris-qr-frame-inner">
                <img :src="fakeQrisData" class="qris-qr-img" alt="QRIS Payment Code" />
              </div>
            </div>

            <div class="qris-footer-row">
              <span class="qris-label">Didukung oleh QRIS</span>
              <div class="qris-divider" />
              <div class="qris-methods">
                <div v-for="m in methods" :key="m" class="qris-method-pill">{{ m }}</div>
              </div>
            </div>
          </div>

          <!-- ── Timer — 3-block row ── -->
          <div class="qris-timer-row">

            <!-- Left: label + status text -->
            <div class="qris-timer-label-block">
              <span class="qris-timer-label">Sisa Waktu</span>
              <span class="qris-timer-status"
                :style="{ color: isExpired ? 'var(--red)' : isUrgent ? 'var(--red)' : 'var(--label-dark)' }">
                {{ timerStatus }}
              </span>
            </div>

            <!-- Center: big countdown number -->
            <span class="qris-timer-value" :class="{ urgent: isUrgent || isExpired }">
              {{ timerDisplay }}
            </span>

            <!-- Right: clock icon -->
            <div class="qris-timer-icon-block">
              <svg class="qris-timer-icon" :class="{ urgent: isUrgent || isExpired }" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>

          </div><!-- /timer-row -->

        </div><!-- /qris-card -->

        <!-- ─── Order Panel ────────────────────── -->
        <div class="order-panel">

          <!-- Detail pesanan -->
          <div class="order-card">
            <div class="order-card-header">Detail Pesanan</div>
            <div class="order-card-body">
              <div class="order-row">
                <span class="order-row-label">Paket</span>
                <span class="order-row-value">{{ store.selectedPackage?.name ?? '-' }}</span>
              </div>
              <div class="order-divider" />
              <div class="order-row">
                <span class="order-row-label">Frame</span>
                <span class="order-row-value">{{ store.selectedFrame?.name ?? '-' }}</span>
              </div>
              <div class="order-divider" />
              <div class="order-row">
                <span class="order-row-label">Foto</span>
                <span class="order-row-value">{{ store.selectedPackage?.photos ?? '-' }}</span>
              </div>
              <div class="order-divider" />
              <div class="order-row">
                <span class="order-row-label">Print</span>
                <span class="order-row-value">{{ store.selectedPackage?.prints ?? '-' }}</span>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="order-total-box">
            <span class="order-total-label">Total Bayar</span>
            <span class="order-total-value">
              Rp {{ (store.totalPrice ?? 70000).toLocaleString('id-ID') }}
            </span>
          </div>

          <!-- Cara bayar -->
          <div class="order-card">
            <div class="order-card-header">Cara Bayar</div>
            <div class="order-steps">
              <div v-for="(text, i) in [
                'Buka aplikasi e-wallet',
                'Pilih Scan / Pay QR',
                'Arahkan ke QR Code',
                'Konfirmasi pembayaran',
                'Tekan “Saya Sudah Bayar”',]" :key="i" class="order-step">
                <div class="order-step-num">{{ i + 1 }}</div>
                <span class="order-step-text">{{ text }}</span>
              </div>
            </div>
          </div>

        </div><!-- /order-panel -->
      </div><!-- /payment-body -->

      <!-- ── Action bar ──────────────────────────── -->
      <div class="payment-actions">
        <button class="btn-back" @click="router.back()">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Back
        </button>

        <button class="btn-paid" :class="{ waiting: !verifying }" :disabled="isExpired || verifying" @click="payNow">
          <template v-if="verifying">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              class="spin-icon">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            Memverifikasi…
          </template>
          <template v-else>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Saya Sudah Bayar
          </template>
        </button>
      </div>

    </div>
  </BoothLayout>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spin-icon {
  animation: spin 0.7s linear infinite;
}
</style>

<style src="@/assets/css/paymentqris.css"></style>
