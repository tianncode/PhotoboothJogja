<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BoothLayout from '@/layouts/BoothLayout.vue'
import { usePhotoboothStore } from '@/stores/photobooth'
import { formatRupiah } from '@/utils/formatter'

const router = useRouter()
const store = usePhotoboothStore()

const selectedMethod = ref('qris')

const paymentMethods = [
  {
    id: 'qris',
    name: 'QRIS',
    desc: 'Scan QR · Semua e-wallet',
    icon: 'qris',
    available: true,
    recommended: true,
  },
  {
    id: 'cash',
    name: 'Cash',
    desc: 'Bayar tunai langsung',
    icon: '💵',
    available: false,
  },
  {
    id: 'debit',
    name: 'Debit / EDC',
    desc: 'Kartu debit & kredit',
    icon: '💳',
    available: false,
  },
  {
    id: 'transfer',
    name: 'Transfer',
    desc: 'Transfer bank manual',
    icon: '🏦',
    available: false,
  },
]

const selectMethod = (method) => {
  if (!method.available) return
  selectedMethod.value = method.id
}

const proceed = () => {
  if (selectedMethod.value === 'qris') {
    router.push('/payment-qris')
  }
}
</script>

<template>
  <BoothLayout>
    <div class="wc-scene">

      <!-- ── BACKGROUND ── -->
      <div class="bg-layer">
        <svg class="bg-svg" viewBox="0 0 700 680" preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M490 0 C410 90 290 130 330 310 C370 470 510 510 480 680" fill="none" stroke="#1a3a6e"
            stroke-width="58" stroke-linecap="round" opacity="0.07" />
          <path d="M555 0 C465 95 365 138 398 318 C432 478 562 518 535 680" fill="none" stroke="#2a6e3a"
            stroke-width="44" stroke-linecap="round" opacity="0.055" />
          <path d="M618 0 C525 105 432 152 462 328 C492 490 615 528 592 680" fill="none" stroke="#c0292a"
            stroke-width="32" stroke-linecap="round" opacity="0.055" />
          <g transform="translate(440, 20)" opacity="0.04">
            <rect x="0" y="0" width="200" height="155" fill="none" stroke="#0d1b3e" stroke-width="2" />
            <line x1="100" y1="0" x2="100" y2="155" stroke="#0d1b3e" stroke-width="1.5" />
            <circle cx="100" cy="78" r="36" fill="none" stroke="#0d1b3e" stroke-width="1.5" />
          </g>
          <g opacity="0.06">
            <circle cx="28" cy="480" r="3" fill="#0d1b3e" />
            <circle cx="48" cy="480" r="3" fill="#0d1b3e" />
            <circle cx="68" cy="480" r="3" fill="#0d1b3e" />
            <circle cx="28" cy="500" r="3" fill="#0d1b3e" />
            <circle cx="48" cy="500" r="3" fill="#0d1b3e" />
            <circle cx="68" cy="500" r="3" fill="#0d1b3e" />
          </g>
          <text x="62" y="86" font-size="13" fill="#c0292a" opacity="0.17" font-family="serif">★</text>
          <text x="638" y="300" font-size="11" fill="#1a3a6e" opacity="0.13" font-family="serif">★</text>
          <g transform="translate(50, 300)" opacity="0.035">
            <path d="M-22,0 C-30,-24 -34,-48 -22,-64 L22,-64 C34,-48 30,-24 22,0 Z" fill="#d4a844" />
            <path d="M-22,-14 C-40,-22 -46,-48 -30,-62" fill="none" stroke="#d4a844" stroke-width="6"
              stroke-linecap="round" />
            <path d="M22,-14 C40,-22 46,-48 30,-62" fill="none" stroke="#d4a844" stroke-width="6"
              stroke-linecap="round" />
            <rect x="-12" y="-80" width="24" height="18" rx="3" fill="#d4a844" />
            <ellipse cx="0" cy="4" rx="20" ry="7" fill="#d4a844" />
          </g>
        </svg>
      </div>

      <!-- ── HEADER ── -->
      <div class="wc-hdr">
        <div>
          <p class="wc-hdr-overline">Stadium Booth</p>
          <h1 class="wc-hdr-title">Metode <em>Pembayaran</em></h1>
          <p class="wc-hdr-sub">Pilih cara bayar kamu</p>
        </div>
        <div class="wc-live-pill">
          <span class="wc-dot"></span>
          Live Session
        </div>
      </div>

      <!-- ── PROGRESS STEPS ── -->
      <div class="wc-steps">
        <div class="wc-step">
          <div class="wc-step-num wc-s-done">✓</div><span class="wc-step-lbl wc-lbl-done">Paket</span>
        </div>
        <div class="wc-sline wc-sline-done"></div>
        <div class="wc-step">
          <div class="wc-step-num wc-s-done">✓</div><span class="wc-step-lbl wc-lbl-done">Frame</span>
        </div>
        <div class="wc-sline wc-sline-done"></div>
        <div class="wc-step">
          <div class="wc-step-num wc-s-done">✓</div><span class="wc-step-lbl wc-lbl-done">Summary</span>
        </div>
        <div class="wc-sline wc-sline-done"></div>
        <div class="wc-step">
          <div class="wc-step-num wc-s-active">4</div><span class="wc-step-lbl wc-lbl-active">Bayar</span>
        </div>
        <div class="wc-sline"></div>
        <div class="wc-step">
          <div class="wc-step-num wc-s-idle">5</div><span class="wc-step-lbl wc-lbl-idle">Foto</span>
        </div>
      </div>

      <!-- ── ORDER SUMMARY BAR ── -->
      <div class="wc-order-bar">
        <div>
          <p class="wc-order-label">Pesanan</p>
          <p class="wc-order-pkg">{{ store.selectedPackage?.name }} Package</p>
          <p class="wc-order-detail">
            {{ store.selectedPackage?.photos }} Foto ·
            {{ store.selectedPackage?.prints }} Print ·
            {{ store.selectedFrame?.name }} Frame
          </p>
        </div>
        <div class="wc-order-total">
          <p class="wc-order-total-lbl">Total</p>
          <p class="wc-order-total-amt">{{ formatRupiah(store.totalPrice) }}</p>
        </div>
      </div>

      <!-- ── MAIN ── -->
      <div class="wc-main">
        <p class="wc-section-label">Pilih Metode Pembayaran</p>

        <!-- PAYMENT GRID -->
        <div class="wc-pay-grid">
          <div v-for="method in paymentMethods" :key="method.id" class="wc-pay-card" :class="{
            'wc-pay-active': selectedMethod === method.id,
            'wc-pay-disabled': !method.available,
          }" @click="selectMethod(method)">
            <!-- Recommended badge -->
            <span v-if="method.recommended" class="wc-pay-rec">Recommended</span>

            <!-- Soon badge -->
            <span v-if="!method.available" class="wc-pay-soon">Segera Hadir</span>

            <!-- Check -->
            <div class="wc-pay-chk">
              <svg width="9" height="9" viewBox="0 0 9 9">
                <polyline points="1.5,4.5 3.5,7 7.5,1.5" fill="none" stroke="#f2ede2" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <!-- Icon: QRIS custom, others emoji -->
            <template v-if="method.icon === 'qris'">
              <div class="wc-qris-logo">
                <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="#f2ede2" stroke-width="2" />
                  <rect x="5" y="5" width="6" height="6" fill="#f2ede2" />
                  <rect x="20" y="2" width="12" height="12" rx="2" stroke="#f2ede2" stroke-width="2" />
                  <rect x="23" y="5" width="6" height="6" fill="#f2ede2" />
                  <rect x="2" y="20" width="12" height="12" rx="2" stroke="#f2ede2" stroke-width="2" />
                  <rect x="5" y="23" width="6" height="6" fill="#f2ede2" />
                  <rect x="20" y="20" width="3" height="3" fill="#f2ede2" />
                  <rect x="25" y="20" width="3" height="3" fill="#f2ede2" />
                  <rect x="20" y="25" width="3" height="3" fill="#f2ede2" />
                  <rect x="25" y="25" width="7" height="7" rx="1" stroke="#f2ede2" stroke-width="1.5" />
                </svg>
              </div>
            </template>
            <template v-else>
              <div class="wc-pay-emoji">{{ method.icon }}</div>
            </template>

            <div class="wc-pay-name" :class="{ 'wc-pay-name--muted': !method.available }">
              {{ method.name }}
            </div>
            <div class="wc-pay-desc">{{ method.desc }}</div>
          </div>
        </div>

        <!-- WC COLOR STRIPE -->
        <div class="wc-stripe">
          <div class="wc-stripe-navy"></div>
          <div class="wc-stripe-green"></div>
          <div class="wc-stripe-red"></div>
        </div>

        <!-- CTA -->
        <div class="wc-cta-row">
          <button class="wc-btn-back" @click="router.back()">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <polyline points="8.5,2 3.5,6.5 8.5,11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Back
          </button>
          <button class="wc-btn-pay" @click="proceed">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="5" width="16" height="11" rx="2" stroke="white" stroke-width="1.8" />
              <line x1="2" y1="9" x2="18" y2="9" stroke="white" stroke-width="1.8" />
            </svg>
            Lanjut Bayar
          </button>
        </div>
      </div>

      <!-- ── TICKER ── -->
      <div class="wc-ticker">
        <span class="wc-ticker-lbl">Live</span>
        <span class="wc-tick-div"></span>
        <span class="wc-tick-item">EPL · MCI <strong>3</strong>–<strong>1</strong> ARS</span>
        <span class="wc-tick-div"></span>
        <span class="wc-tick-item">UCL · LIV <strong>4</strong>–<strong>0</strong> PSG</span>
        <span class="wc-tick-div"></span>
        <span class="wc-tick-item">WC 2026 · KSA <strong>1</strong>–<strong>2</strong> URY</span>
      </div>

    </div>
  </BoothLayout>
</template>

<style src="@/assets/css/payment.css"></style>
