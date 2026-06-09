<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BoothLayout from '@/layouts/BoothLayout.vue'
import { usePhotoboothStore } from '@/stores/photobooth'
import { formatRupiah } from '@/utils/formatter'

const store = usePhotoboothStore()
const router = useRouter()

const extraPrintPrice = 5000

const finalTotal = computed(() => {
  return store.selectedPackage.price + (store.extraPrint * extraPrintPrice)
})

const extraCost = computed(() => store.extraPrint * extraPrintPrice)

const updateExtraPrint = (value) => {
  store.setExtraPrint(Number(value))
}

const startPhoto = () => {
  store.setTotalPrice(finalTotal.value)
  router.push('/camera')
}
</script>

<template>
  <BoothLayout>
    <div class="wc-scene">

      <!-- ── BACKGROUND ── -->
      <div class="bg-layer">
        <svg class="bg-svg" viewBox="0 0 700 760" preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M490 0 C410 90 290 130 330 310 C370 470 510 510 480 760" fill="none" stroke="#1a3a6e"
            stroke-width="58" stroke-linecap="round" opacity="0.07" />
          <path d="M555 0 C465 95 365 138 398 318 C432 478 562 518 535 760" fill="none" stroke="#2a6e3a"
            stroke-width="44" stroke-linecap="round" opacity="0.055" />
          <path d="M618 0 C525 105 432 152 462 328 C492 490 615 528 592 760" fill="none" stroke="#c0292a"
            stroke-width="32" stroke-linecap="round" opacity="0.055" />
          <!-- Pitch lines top-right -->
          <g transform="translate(440, 20)" opacity="0.045">
            <rect x="0" y="0" width="200" height="155" fill="none" stroke="#0d1b3e" stroke-width="2" />
            <line x1="100" y1="0" x2="100" y2="155" stroke="#0d1b3e" stroke-width="1.5" />
            <circle cx="100" cy="78" r="36" fill="none" stroke="#0d1b3e" stroke-width="1.5" />
            <circle cx="100" cy="78" r="4" fill="#0d1b3e" />
          </g>
          <!-- Halftone dots bottom-left -->
          <g opacity="0.06">
            <circle cx="28" cy="540" r="3" fill="#0d1b3e" />
            <circle cx="48" cy="540" r="3" fill="#0d1b3e" />
            <circle cx="68" cy="540" r="3" fill="#0d1b3e" />
            <circle cx="28" cy="560" r="3" fill="#0d1b3e" />
            <circle cx="48" cy="560" r="3" fill="#0d1b3e" />
            <circle cx="68" cy="560" r="3" fill="#0d1b3e" />
            <circle cx="88" cy="560" r="3" fill="#0d1b3e" />
          </g>
          <!-- Trophy watermark -->
          <g transform="translate(48, 280)" opacity="0.04">
            <path d="M-22,0 C-30,-24 -34,-48 -22,-64 L22,-64 C34,-48 30,-24 22,0 Z" fill="#d4a844" />
            <path d="M-22,-14 C-40,-22 -46,-48 -30,-62" fill="none" stroke="#d4a844" stroke-width="6"
              stroke-linecap="round" />
            <path d="M22,-14 C40,-22 46,-48 30,-62" fill="none" stroke="#d4a844" stroke-width="6"
              stroke-linecap="round" />
            <rect x="-12" y="-80" width="24" height="18" rx="3" fill="#d4a844" />
            <ellipse cx="0" cy="4" rx="20" ry="7" fill="#d4a844" />
          </g>
          <!-- Stars -->
          <text x="62" y="86" font-size="13" fill="#c0292a" opacity="0.17" font-family="serif">★</text>
          <text x="638" y="310" font-size="11" fill="#1a3a6e" opacity="0.13" font-family="serif">★</text>
          <text x="32" y="490" font-size="10" fill="#2a6e3a" opacity="0.14" font-family="serif">★</text>
        </svg>
      </div>

      <!-- ── HEADER ── -->
      <div class="wc-hdr">
        <div>
          <p class="wc-hdr-overline">Stadium Booth</p>
          <h1 class="wc-hdr-title">Ringkasan <em>Pesanan</em></h1>
          <p class="wc-hdr-sub">Konfirmasi sebelum mulai foto</p>
        </div>
        <div class="wc-live-pill">
          <span class="wc-dot"></span>
          Live Session
        </div>
      </div>

      <!-- ── PROGRESS STEPS ── -->
      <div class="wc-steps">
        <div class="wc-step">
          <div class="wc-step-num wc-step-num--done">✓</div>
          <span class="wc-step-label wc-step-label--done">Paket</span>
        </div>
        <div class="wc-step-line wc-step-line--done"></div>
        <div class="wc-step">
          <div class="wc-step-num wc-step-num--done">✓</div>
          <span class="wc-step-label wc-step-label--done">Frame</span>
        </div>
        <div class="wc-step-line wc-step-line--done"></div>
        <div class="wc-step">
          <div class="wc-step-num wc-step-num--active">3</div>
          <span class="wc-step-label wc-step-label--active">Summary</span>
        </div>
        <div class="wc-step-line"></div>
        <div class="wc-step">
          <div class="wc-step-num wc-step-num--idle">4</div>
          <span class="wc-step-label wc-step-label--idle">Foto</span>
        </div>
      </div>

      <!-- ── MAIN ── -->
      <div class="wc-main">

        <!-- SUMMARY CARD -->
        <div class="wc-sum-card">
          <!-- Card header -->
          <div class="wc-sum-card-hdr">
            <span class="wc-sum-card-title">Detail Sesi</span>
            <span class="wc-sum-card-badge">⚽ {{ store.selectedPackage?.name }} Package</span>
          </div>

          <!-- Rows -->
          <div class="wc-sum-row">
            <span class="wc-sum-key">Paket</span>
            <span class="wc-sum-val">{{ store.selectedPackage?.name }}</span>
          </div>
          <div class="wc-sum-row">
            <span class="wc-sum-key">Email</span>
            <span class="wc-sum-val">{{ store.email }}</span>
          </div>
          <div class="wc-sum-row">
            <span class="wc-sum-key">Frame</span>
            <div class="wc-frame-mini">
              <div class="wc-frame-mini-box">🎞️</div>
              <span class="wc-sum-val">{{ store.selectedFrame?.name }}</span>
            </div>
          </div>
          <div class="wc-sum-row">
            <span class="wc-sum-key">Jumlah Foto</span>
            <span class="wc-sum-val">{{ store.selectedPackage?.photos }} Foto</span>
          </div>
          <div class="wc-sum-row">
            <span class="wc-sum-key">Jumlah Print</span>
            <span class="wc-sum-val">{{ store.selectedPackage?.prints }} Print</span>
          </div>
          <div class="wc-sum-row">
            <span class="wc-sum-key">Harga Paket</span>
            <span class="wc-sum-val">{{ formatRupiah(store.selectedPackage?.price) }}</span>
          </div>

          <!-- Extra print selector -->
          <div class="wc-sum-row wc-sum-row--highlight">
            <span class="wc-sum-key">Tambahan Print</span>
            <select class="wc-extra-select" :value="store.extraPrint" @change="updateExtraPrint($event.target.value)">
              <option :value="0">0 print</option>
              <option :value="1">1 print (+Rp 5.000)</option>
              <option :value="2">2 print (+Rp 10.000)</option>
              <option :value="3">3 print (+Rp 15.000)</option>
              <option :value="4">4 print (+Rp 20.000)</option>
              <option :value="5">5 print (+Rp 25.000)</option>
            </select>
          </div>

          <!-- Extra cost row (visible if extra > 0) -->
          <div v-if="store.extraPrint > 0" class="wc-sum-row">
            <span class="wc-sum-key">Biaya Tambahan</span>
            <span class="wc-sum-val wc-sum-val--red">+ {{ formatRupiah(extraCost) }}</span>
          </div>
        </div>

        <!-- WC COLOR STRIPE -->
        <div class="wc-stripe">
          <div class="wc-stripe-navy"></div>
          <div class="wc-stripe-green"></div>
          <div class="wc-stripe-red"></div>
        </div>

        <!-- TOTAL BLOCK -->
        <div class="wc-total-block">
          <div>
            <p class="wc-total-label">Total Pembayaran</p>
            <p class="wc-total-amount">
              <em>Rp</em> {{ finalTotal.toLocaleString('id-ID') }}
            </p>
            <p class="wc-total-sub">
              {{ store.extraPrint > 0 ? `Termasuk ${store.extraPrint} tambahan print` : 'Tanpa tambahan print' }}
            </p>
          </div>
          <div class="wc-total-scoreboard">
            <div class="wc-total-scoreboard-lbl">Session</div>
            <div class="wc-total-scoreboard-name">{{ store.selectedPackage?.name }}</div>
            <div class="wc-total-scoreboard-detail">
              {{ store.selectedPackage?.photos }} Foto · {{ store.selectedPackage?.prints }} Print
            </div>
          </div>
        </div>

        <!-- CTA BUTTONS -->
        <div class="wc-cta-row">
          <button class="wc-btn-back" @click="router.back()">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <polyline points="8.5,2 3.5,6.5 8.5,11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Back
          </button>
          <button class="wc-btn-start" @click="startPhoto">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="5" width="18" height="13" rx="2" stroke="white" stroke-width="1.8" />
              <circle cx="11" cy="11.5" r="3.8" stroke="white" stroke-width="1.8" />
              <path d="M8 5 L9.5 2.5 H12.5 L14 5" stroke="white" stroke-width="1.8" stroke-linejoin="round" />
            </svg>
            MULAI FOTO
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
        <span class="wc-tick-item">Liga · RMA <strong>2</strong>–<strong>2</strong> FCB</span>
      </div>

    </div>
  </BoothLayout>
</template>

<style src="@/assets/css/summary.css"></style>
