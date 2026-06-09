<script setup>
import BoothLayout from '@/layouts/BoothLayout.vue'
import { usePhotoboothStore } from '@/stores/photobooth'
import { useRouter } from 'vue-router'
import { formatRupiah } from '@/utils/formatter'

const store = usePhotoboothStore()
const router = useRouter()

const frames = [
  { id: 1, name: 'Classic',      desc: 'Navy · Clean',       badge: null,       image: null },
  { id: 2, name: 'Film Strip',   desc: 'Dark · Cinematic',   badge: 'popular',  image: null },
  { id: 3, name: 'WC 2026',      desc: 'Tricolor · Official', badge: 'new',     image: null },
  { id: 4, name: 'Matchday',     desc: 'Dark Navy · Stadium', badge: null,      image: null },
  { id: 5, name: 'Gold Trophy',  desc: 'Gold · Prestige',    badge: null,       image: null },
  { id: 6, name: 'Pitch Green',  desc: 'Lapangan · Field',   badge: null,       image: null },
  { id: 7, name: '3 Nations',    desc: 'Host · Countries',   badge: 'wc',       image: null },
  { id: 8, name: 'Vintage Press', desc: 'Editorial · Classic', badge: null,     image: null },
]

const selectFrame = (frame) => {
  store.setFrame(frame)
  router.push('/summary')
}
</script>

<template>
  <BoothLayout>
    <div class="wc-scene">

      <!-- ── BACKGROUND ── -->
      <div class="bg-layer">
        <svg class="bg-svg" viewBox="0 0 700 780" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M490 0 C410 90 290 130 330 310 C370 470 510 510 480 780" fill="none" stroke="#1a3a6e" stroke-width="60" stroke-linecap="round" opacity="0.07"/>
          <path d="M555 0 C465 95 365 138 398 318 C432 478 562 518 535 780" fill="none" stroke="#2a6e3a" stroke-width="46" stroke-linecap="round" opacity="0.055"/>
          <path d="M618 0 C525 105 432 152 462 328 C492 490 615 528 592 780" fill="none" stroke="#c0292a" stroke-width="34" stroke-linecap="round" opacity="0.055"/>
          <g transform="translate(-10,520)" opacity="0.05">
            <rect x="20" y="20" width="200" height="150" fill="none" stroke="#0d1b3e" stroke-width="2"/>
            <line x1="120" y1="20" x2="120" y2="170" stroke="#0d1b3e" stroke-width="1.5"/>
            <circle cx="120" cy="95" r="38" fill="none" stroke="#0d1b3e" stroke-width="1.5"/>
          </g>
          <g opacity="0.06">
            <circle cx="28" cy="120" r="3" fill="#0d1b3e"/><circle cx="48" cy="120" r="3" fill="#0d1b3e"/><circle cx="68" cy="120" r="3" fill="#0d1b3e"/>
            <circle cx="28" cy="140" r="3" fill="#0d1b3e"/><circle cx="48" cy="140" r="3" fill="#0d1b3e"/><circle cx="68" cy="140" r="3" fill="#0d1b3e"/>
          </g>
          <text x="62" y="88" font-size="13" fill="#c0292a" opacity="0.18" font-family="serif">★</text>
          <text x="640" y="300" font-size="11" fill="#1a3a6e" opacity="0.14" font-family="serif">★</text>
          <text x="320" y="50" font-size="9" fill="#d4a844" opacity="0.22" font-family="serif">★</text>
        </svg>
      </div>

      <!-- ── HEADER ── -->
      <div class="wc-hdr">
        <div>
          <p class="wc-hdr-overline">Stadium Booth</p>
          <h1 class="wc-hdr-title">Pilih <em>Frame</em></h1>
          <p class="wc-hdr-sub">Pilih frame untuk sesi photobooth kamu</p>
        </div>
        <div class="wc-hdr-right">
          <div class="wc-live-pill">
            <span class="wc-dot"></span>
            Live Session
          </div>
        </div>
      </div>

      <!-- ── SESSION INFO BAR ── -->
      <div class="wc-info-bar">
        <div class="wc-info-item">
          <div class="wc-info-key">Paket</div>
          <div class="wc-info-val">{{ store.selectedPackage?.name }}</div>
        </div>
        <div class="wc-info-item">
          <div class="wc-info-key">Jumlah Foto</div>
          <div class="wc-info-val">{{ store.selectedPackage?.photos }} Foto</div>
        </div>
        <div class="wc-info-item">
          <div class="wc-info-key">Print</div>
          <div class="wc-info-val">{{ store.selectedPackage?.prints }} Print</div>
        </div>
        <div class="wc-info-item">
          <div class="wc-info-key">Total</div>
          <div class="wc-info-val wc-info-val--red">{{ formatRupiah(store.totalPrice) }}</div>
        </div>
        <div class="wc-info-item">
          <div class="wc-info-key">Email</div>
          <div class="wc-info-val">{{ store.email }}</div>
        </div>
      </div>

      <!-- ── SECTION LABEL ── -->
      <p class="wc-section-label">Choose Your Frame</p>

      <!-- WC color stripe -->
      <div class="wc-stripe">
        <div class="wc-stripe-navy"></div>
        <div class="wc-stripe-green"></div>
        <div class="wc-stripe-red"></div>
      </div>

      <!-- ── FRAME GRID ── -->
      <div class="wc-frame-grid">
        <div
          v-for="frame in frames"
          :key="frame.id"
          class="wc-frame-card"
          :class="{ active: store.selectedFrame?.id === frame.id }"
          @click="selectFrame(frame)"
        >
          <!-- Check badge -->
          <div class="wc-frame-chk">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <polyline points="2,5 4,7.5 8,2" fill="none" stroke="#f2ede2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <!-- Tag badges -->
          <span v-if="frame.badge === 'popular'" class="wc-badge wc-badge--red">Popular</span>
          <span v-if="frame.badge === 'new'" class="wc-badge wc-badge--gold">New</span>
          <span v-if="frame.badge === 'wc'" class="wc-badge wc-badge--gold">WC</span>

          <!-- Frame preview -->
          <div class="wc-frame-preview" :class="`wc-fp--${frame.id}`">
            <!-- Preview rendered per frame id via CSS + slots -->
            <template v-if="frame.image">
              <img :src="frame.image" :alt="frame.name" class="wc-frame-preview-img" />
            </template>
            <template v-else>
              <div class="wc-fp-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </div>
            </template>
          </div>

          <!-- Frame info -->
          <div class="wc-frame-info">
            <div class="wc-frame-name">{{ frame.name }}</div>
            <div class="wc-frame-desc">{{ frame.desc }}</div>
          </div>
        </div>
      </div>

      <!-- ── CTA BUTTONS ── -->
      <div class="wc-cta-row">
        <button class="wc-btn-back" @click="router.back()">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <polyline points="8.5,2 3.5,6.5 8.5,11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back
        </button>
        <button
          class="wc-btn-next"
          :disabled="!store.selectedFrame"
          @click="router.push('/summary')"
        >
          Lanjut ke Summary →
        </button>
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

<style src="@/assets/css/frame.css"></style>
