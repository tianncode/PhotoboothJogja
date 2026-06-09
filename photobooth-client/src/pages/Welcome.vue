<script setup>
import BoothLayout from '@/layouts/BoothLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const startSession = () => router.push('/package')
</script>

<template>
  <BoothLayout>
    <div class="fb-scene">
      <div class="bg-noise"></div>

      <!-- Football pitch wireframe (top-right background) -->
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
        <circle cx="42" cy="84" r="4" stroke="currentColor" stroke-width="0.8" />
        <circle cx="198" cy="84" r="4" stroke="currentColor" stroke-width="0.8" />
      </svg>

      <!-- Player silhouette circle (left background) -->
      <div class="player-deco">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
          <circle cx="60" cy="38" r="13" stroke="currentColor" stroke-width="1.2" />
          <path d="M36 96 C36 72 84 72 84 96" stroke="currentColor" stroke-width="1.2" />
          <circle cx="60" cy="88" r="9" stroke="currentColor" stroke-width="1" />
          <line x1="60" y1="51" x2="60" y2="80" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" />
        </svg>
      </div>

      <!-- Dot matrix grid (bottom-left background) -->
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

      <!-- Floating decorative stars -->
      <span class="fstar red" style="top:10%;left:7%;--sz:13px;--dur:5s;--tx:9px;--ty:11px">✦</span>
      <span class="fstar gold" style="top:19%;right:10%;--sz:9px;--dur:7.5s;--tx:-8px;--ty:13px">★</span>
      <span class="fstar dark" style="bottom:30%;left:13%;--sz:7px;--dur:6.2s;--tx:11px;--ty:-9px">✦</span>
      <span class="fstar red" style="bottom:20%;right:15%;--sz:11px;--dur:8s;--tx:-9px;--ty:-11px">✦</span>
      <span class="fstar gold" style="top:52%;right:5%;--sz:8px;--dur:9s;--tx:7px;--ty:8px">★</span>
      <span class="fstar dark" style="top:38%;left:4%;--sz:6px;--dur:4.5s;--tx:5px;--ty:7px">✦</span>
      <span class="fstar red" style="top:28%;left:18%;--sz:7px;--dur:6s;--tx:-6px;--ty:9px">✦</span>

      <div class="scene-scroll">
        <div class="card">

          <!-- Stadium stamp logo -->
          <div class="stamp">
            <span class="stamp-ico">⚽</span>
          </div>

          <!-- Sub-label -->
          <div class="stadium-label">STADIUM BOOTH · BANDUNG</div>

          <!-- Main title -->
          <div class="main-title">
            <span class="t-photo">PHOTO</span><span class="t-booth">booth</span>
          </div>

          <!-- Experience caption -->
          <div class="exp-label">OFFICIAL FOOTBALL<br>EXPERIENCE · 2026</div>

          <!-- Divider -->
          <div class="hd">
            <span class="hd-line"></span>
            <span class="hd-cross">+</span>
            <span class="hd-line"></span>
          </div>

          <!-- ───────── Match Day Frame ───────── -->
          <div class="match-frame">

            <!-- Watermark text -->
            <div class="mf-watermark" aria-hidden="true">
              MATCH<em class="mf-day">Day</em>
            </div>

            <!-- Date header -->
            <div class="mf-date">16 · 6 · 2026</div>

            <!-- Three-column photo layout -->
            <div class="mf-grid">

              <!-- Left column -->
              <div class="mf-col">
                <div class="ph ph-flag">
                  <div class="ph-flag-bar"></div>
                  <span class="ph-label">FLAG</span>
                </div>
                <div class="ph ph-trophy">
                  <span class="trophy-ico">🏆</span>
                  <span class="ph-label ph-lbl-gold">TROPHY</span>
                </div>
              </div>

              <!-- Center column -->
              <div class="mf-col mf-col-center">
                <div class="ph ph-player">
                  <svg class="player-svg" viewBox="0 0 44 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="22" cy="15" r="11" stroke="currentColor" stroke-width="1.5" />
                    <path d="M6 64 C6 42 38 42 38 64" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <line x1="22" y1="26" x2="22" y2="46" stroke="currentColor" stroke-width="1"
                      stroke-dasharray="2 2" />
                  </svg>
                  <span class="ph-label">PLAYER<br>VECTOR</span>
                </div>
              </div>

              <!-- Right column -->
              <div class="mf-col">
                <div class="ph ph-flag">
                  <div class="ph-flag-bar"></div>
                  <span class="ph-label">FLAG</span>
                </div>
                <div class="ph ph-ball">
                  <svg class="ball-svg" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="22" cy="22" r="16" stroke="currentColor" stroke-width="1.2" />
                    <polygon points="22,8 28,14 26,22 18,22 16,14" stroke="currentColor" stroke-width="1" fill="none" />
                    <line x1="12" y1="28" x2="16" y2="22" stroke="currentColor" stroke-width="0.8" />
                    <line x1="32" y1="28" x2="26" y2="22" stroke="currentColor" stroke-width="0.8" />
                    <line x1="22" y1="8" x2="22" y2="4" stroke="currentColor" stroke-width="0.8" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
          <!-- ─────────────────────────────────── -->

          <!-- Snap & Smile -->
          <div class="snap-title">SNAP &amp; SMILE · CETAK FOTO · KIRIM EMAIL</div>
          <div class="tricolor">
            <span class="tc tc-navy"></span>
            <span class="tc tc-red"></span>
            <span class="tc tc-green"></span>
          </div>

          <!-- Tag stickers -->
          <div class="stickers">
            <span class="stk stk-navy">🌍 FOOTBALL</span>
            <span class="stk stk-red">WORLD</span>
            <span class="stk stk-gold">2026</span>
            <span class="stk stk-light">BANDUNG</span>
          </div>

          <!-- CTA button -->
          <button class="cta-btn" @click="startSession">
            <span class="cta-ico">📸</span>
            MULAI SESI
          </button>

        </div>
      </div>

      <!-- Fixed live bottom bar -->
      <div class="live-bar">
        <span class="live-dot"></span>
        <span class="live-lbl">LIVE</span>
        <span class="live-sep">|</span>
        <div class="live-scroll">
          <span class="live-ticker">
            ⚽ STADIUM PHOTOBOOTH · SNAP &amp; SMILE · CETAK FOTO · KIRIM KE EMAIL · BANDUNG · WORLD CUP 2026 · OFFICIAL
            FOOTBALL EXPERIENCE ⚽
          </span>
        </div>
      </div>

    </div>
  </BoothLayout>
</template>

<style src="@/assets/css/welcome.css"></style>
