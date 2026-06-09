<script setup>
import BoothLayout from '@/layouts/BoothLayout.vue'
import { PACKAGES } from '@/utils/constants'
import { formatRupiah } from '@/utils/formatter'
import { usePhotoboothStore } from '@/stores/photobooth'
import { useRouter } from 'vue-router'

const store = usePhotoboothStore()
const router = useRouter()

const tierAccents = ['#0d1b3e', '#cc1f1f', '#c9a84c']

const selectPackage = (pkg) => {
  store.setPackage(pkg)
  store.setTotalPrice(pkg.price)
  router.push('/email')
}

const goBack = () => router.push('/')
</script>

<template>
  <BoothLayout>
    <div class="pkg-scene">
      <div class="bg-noise"></div>

      <!-- Pitch wireframe – top right -->
      <svg class="pitch-deco" viewBox="0 0 240 168" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="232" height="160" rx="4" stroke="currentColor" stroke-width="1.5" />
        <line x1="120" y1="4" x2="120" y2="164" stroke="currentColor" stroke-width="1" />
        <circle cx="120" cy="84" r="28" stroke="currentColor" stroke-width="1" />
        <circle cx="120" cy="84" r="2.5" fill="currentColor" />
        <rect x="4" y="44" width="38" height="80" stroke="currentColor" stroke-width="1" />
        <rect x="198" y="44" width="38" height="80" stroke="currentColor" stroke-width="1" />
        <rect x="4" y="58" width="16" height="52" stroke="currentColor" stroke-width="1" />
        <rect x="220" y="58" width="16" height="52" stroke="currentColor" stroke-width="1" />
        <line x1="0" y1="70" x2="4" y2="70" stroke="currentColor" stroke-width="1.5" />
        <line x1="0" y1="98" x2="4" y2="98" stroke="currentColor" stroke-width="1.5" />
        <line x1="236" y1="70" x2="240" y2="70" stroke="currentColor" stroke-width="1.5" />
        <line x1="236" y1="98" x2="240" y2="98" stroke="currentColor" stroke-width="1.5" />
      </svg>

      <!-- Dot grid – bottom left -->
      <div class="dot-grid">
        <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <circle cx="10" cy="10" r="2.2" />
            <circle cx="28" cy="10" r="2.2" />
            <circle cx="46" cy="10" r="2.2" />
            <circle cx="64" cy="10" r="2.2" />
            <circle cx="82" cy="10" r="2.2" />
            <circle cx="100" cy="10" r="2.2" />
            <circle cx="10" cy="28" r="2.2" />
            <circle cx="28" cy="28" r="2.2" />
            <circle cx="46" cy="28" r="2.2" />
            <circle cx="64" cy="28" r="2.2" />
            <circle cx="82" cy="28" r="2.2" />
            <circle cx="100" cy="28" r="2.2" />
            <circle cx="10" cy="46" r="2.2" />
            <circle cx="28" cy="46" r="2.2" />
            <circle cx="46" cy="46" r="2.2" />
            <circle cx="64" cy="46" r="2.2" />
            <circle cx="82" cy="46" r="2.2" />
            <circle cx="100" cy="46" r="2.2" />
            <circle cx="10" cy="64" r="2.2" />
            <circle cx="28" cy="64" r="2.2" />
            <circle cx="46" cy="64" r="2.2" />
            <circle cx="64" cy="64" r="2.2" />
            <circle cx="82" cy="64" r="2.2" />
            <circle cx="100" cy="64" r="2.2" />
            <circle cx="10" cy="82" r="2.2" />
            <circle cx="28" cy="82" r="2.2" />
            <circle cx="46" cy="82" r="2.2" />
            <circle cx="64" cy="82" r="2.2" />
            <circle cx="82" cy="82" r="2.2" />
            <circle cx="100" cy="82" r="2.2" />
            <circle cx="10" cy="100" r="2.2" />
            <circle cx="28" cy="100" r="2.2" />
            <circle cx="46" cy="100" r="2.2" />
            <circle cx="64" cy="100" r="2.2" />
            <circle cx="82" cy="100" r="2.2" />
            <circle cx="100" cy="100" r="2.2" />
          </g>
        </svg>
      </div>

      <!-- Floating stars -->
      <span class="fstar red" style="top:9%;left:8%;--sz:12px;--dur:5.5s;--tx:8px;--ty:10px">✦</span>
      <span class="fstar gold" style="top:17%;right:9%;--sz:9px;--dur:7s;--tx:-7px;--ty:12px">★</span>
      <span class="fstar dark" style="bottom:25%;left:11%;--sz:7px;--dur:6s;--tx:10px;--ty:-8px">✦</span>
      <span class="fstar red" style="bottom:16%;right:13%;--sz:11px;--dur:8.5s;--tx:-9px;--ty:-10px">✦</span>
      <span class="fstar gold" style="top:48%;right:5%;--sz:8px;--dur:9s;--tx:7px;--ty:8px">★</span>

      <div class="pkg-scroll">

        <!-- Back button -->
        <button class="back-btn" @click="goBack">
          <span class="back-arrow">←</span> KEMBALI
        </button>

        <!-- Page header -->
        <div class="pkg-header">
          <div class="pkg-stamp">⚽</div>
          <div class="pkg-eyebrow">STADIUM BOOTH · BANDUNG</div>
          <div class="pkg-headline">
            <span class="ph-main">PILIH</span>
            <em class="ph-em">Paket</em>
          </div>
          <div class="pkg-sub">Pilih paket sesuai kebutuhanmu</div>
          <div class="hd">
            <span class="hd-line"></span>
            <span class="hd-cross">+</span>
            <span class="hd-line"></span>
          </div>
        </div>

        <!-- Package cards grid -->
        <div class="pkg-grid">
          <div v-for="(pkg, index) in PACKAGES" :key="pkg.id" class="pkg-card"
            :style="{ '--accent': tierAccents[index % tierAccents.length] }" @click="selectPackage(pkg)">
            <!-- Faded tier number watermark -->
            <div class="card-num" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <!-- Accent top bar -->
            <div class="card-accent-bar"></div>

            <!-- Tier label -->
            <div class="card-tier">PAKET {{ String(index + 1).padStart(2, '0') }}</div>

            <!-- Package name -->
            <div class="card-name">{{ pkg.name }}</div>

            <!-- Stats row -->
            <div class="card-stats">
              <div class="stat-block">
                <span class="stat-val">{{ pkg.photos }}</span>
                <span class="stat-lbl">FOTO</span>
              </div>
              <span class="stat-dot">·</span>
              <div class="stat-block">
                <span class="stat-val">{{ pkg.prints }}</span>
                <span class="stat-lbl">PRINT</span>
              </div>
            </div>

            <!-- Rule -->
            <div class="card-rule"></div>

            <!-- Price -->
            <div class="card-price">{{ formatRupiah(pkg.price) }}</div>

            <!-- CTA row -->
            <div class="card-cta">
              <span class="cta-ico">📸</span>
              PILIH PAKET
              <span class="cta-arrow">→</span>
            </div>

          </div>
        </div>

      </div>

      <!-- Fixed live bottom bar -->
      <div class="live-bar">
        <span class="live-dot"></span>
        <span class="live-lbl">LIVE</span>
        <span class="live-sep">|</span>
        <div class="live-scroll">
          <span class="live-ticker">
            ⚽ STADIUM PHOTOBOOTH · PILIH PAKET · SNAP &amp; SMILE · CETAK FOTO · KIRIM KE EMAIL · BANDUNG · WORLD CUP
            2026 ⚽
          </span>
        </div>
      </div>

    </div>
  </BoothLayout>
</template>

<style src="@/assets/css/package.css"></style>
