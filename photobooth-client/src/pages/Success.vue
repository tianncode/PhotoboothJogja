<script setup>
import BoothLayout from '@/layouts/BoothLayout.vue'
import { usePhotoboothStore } from '@/stores/photobooth'
import { useRouter } from 'vue-router'

const store = usePhotoboothStore()
const router = useRouter()

const startNew = () => {
  try { store.$reset() } catch { }
  router.push('/')
}
</script>

<template>
  <BoothLayout>
    <div class="success-scene">
      <div class="bg-noise"></div>

      <!-- Pitch wireframe – top right (muted on success) -->
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
          </g>
        </svg>
      </div>

      <!-- ── Falling confetti ────────────────────────── -->
      <!-- Gold -->
      <span class="conf" style="left:5%;--col:#c9a84c;--sz:13px;--dur:5s;--delay:0s;--rot:480deg">✦</span>
      <span class="conf" style="left:15%;--col:#c9a84c;--sz:10px;--dur:4s;--delay:1.2s;--rot:360deg">★</span>
      <span class="conf" style="left:38%;--col:#c9a84c;--sz:14px;--dur:6s;--delay:0.5s;--rot:540deg">✦</span>
      <span class="conf" style="left:62%;--col:#c9a84c;--sz:9px;--dur:3.5s;--delay:2s;--rot:300deg">★</span>
      <span class="conf" style="left:82%;--col:#c9a84c;--sz:12px;--dur:5.5s;--delay:0.8s;--rot:420deg">✦</span>
      <span class="conf" style="left:93%;--col:#c9a84c;--sz:10px;--dur:4.8s;--delay:1.7s;--rot:600deg">★</span>
      <!-- Red -->
      <span class="conf" style="left:10%;--col:#cc1f1f;--sz:10px;--dur:4.5s;--delay:1.5s;--rot:400deg">✦</span>
      <span class="conf" style="left:25%;--col:#cc1f1f;--sz:13px;--dur:5.2s;--delay:0.3s;--rot:360deg">★</span>
      <span class="conf" style="left:48%;--col:#cc1f1f;--sz:8px;--dur:3.8s;--delay:1.8s;--rot:270deg">✦</span>
      <span class="conf" style="left:70%;--col:#cc1f1f;--sz:11px;--dur:6.2s;--delay:0.7s;--rot:480deg">★</span>
      <span class="conf" style="left:88%;--col:#cc1f1f;--sz:9px;--dur:4.2s;--delay:2.5s;--rot:330deg">✦</span>
      <!-- Navy -->
      <span class="conf" style="left:20%;--col:#0d1b3e;--sz:8px;--dur:5.5s;--delay:1s;--rot:540deg">✦</span>
      <span class="conf" style="left:54%;--col:#0d1b3e;--sz:7px;--dur:4.8s;--delay:3s;--rot:360deg">★</span>
      <span class="conf" style="left:76%;--col:#0d1b3e;--sz:9px;--dur:5.2s;--delay:0.4s;--rot:450deg">✦</span>
      <span class="conf" style="left:32%;--col:#c9a84c;--sz:7px;--dur:3.2s;--delay:2.2s;--rot:300deg">★</span>
      <span class="conf" style="left:58%;--col:#cc1f1f;--sz:8px;--dur:4.6s;--delay:0.6s;--rot:420deg">✦</span>

      <!-- ─────────────────────────────────────────────── -->

      <div class="success-scroll">

        <!-- ── Trophy hero ─────────────────────────────── -->
        <div class="success-hero">

          <!-- Animated trophy with pulse rings -->
          <div class="trophy-wrap">
            <span class="pulse-ring r1"></span>
            <span class="pulse-ring r2"></span>
            <span class="pulse-ring r3"></span>
            <div class="trophy-circle">
              <span class="trophy-ico">🏆</span>
            </div>
          </div>

          <div class="success-eyebrow">STADIUM BOOTH · BANDUNG</div>

          <div class="success-headline">
            <span class="sh-main">SESI</span>
            <em class="sh-em">Selesai!</em>
          </div>

          <!-- All 4 steps marked done -->
          <div class="step-row">
            <span class="step-pill done">01 ✓</span>
            <span class="step-conn"></span>
            <span class="step-pill done">02 ✓</span>
            <span class="step-conn"></span>
            <span class="step-pill done">03 ✓</span>
            <span class="step-conn"></span>
            <span class="step-pill done final">04 ✓</span>
          </div>

          <div class="hd">
            <span class="hd-line"></span>
            <span class="hd-cross">+</span>
            <span class="hd-line"></span>
          </div>
        </div>

        <!-- ── Email confirmation highlight ───────────── -->
        <div class="email-confirm">
          <span class="ec-icon">✉️</span>
          <div class="ec-body">
            <div class="ec-label">FOTO DIKIRIM KE</div>
            <div class="ec-email">{{ store.email || 'email@example.com' }}</div>
          </div>
          <span class="ec-check">✓</span>
        </div>

        <!-- ── Match report / session summary ─────────── -->
        <div class="match-report">
          <div class="mr-header">
            <span class="mr-ball">⚽</span>
            <span class="mr-title">MATCH REPORT</span>
            <span class="mr-badge complete">SELESAI</span>
          </div>

          <div class="mr-perf"></div>

          <div class="mr-body">
            <div class="mr-row">
              <span class="mr-label">PAKET</span>
              <span class="mr-val">{{ store.selectedPackage?.name || '—' }}</span>
            </div>
            <div class="mr-row">
              <span class="mr-label">FOTO</span>
              <span class="mr-val">{{ store.selectedPackage?.photos || 0 }} Lembar</span>
            </div>
            <div class="mr-row">
              <span class="mr-label">PRINT</span>
              <span class="mr-val">{{ store.selectedPackage?.prints || 0 }} Lembar</span>
            </div>
            <div class="mr-row">
              <span class="mr-label">FRAME</span>
              <span class="mr-val">{{ store.selectedFrame?.name || '—' }}</span>
            </div>
            <div class="mr-rule"></div>
            <div class="mr-row mr-total">
              <span class="mr-label">TOTAL</span>
              <span class="mr-val mr-price">
                Rp {{ store.totalPrice?.toLocaleString('id-ID') || '0' }}
              </span>
            </div>
          </div>
        </div>

        <!-- ── Info note ────────────────────────────────── -->
        <div class="info-note">
          <span class="in-dot">ℹ</span>
          Foto akan masuk dalam beberapa menit · Cek folder <strong>spam</strong> jika tidak muncul di inbox
        </div>

        <!-- ── Tricolor bar ──────────────────────────── -->
        <div class="tricolor">
          <span class="tc tc-navy"></span>
          <span class="tc tc-red"></span>
          <span class="tc tc-green"></span>
        </div>

        <!-- ── New session CTA ──────────────────────────── -->
        <button class="new-btn" @click="startNew">
          <span class="new-ico">🔄</span>
          MULAI SESI BARU
        </button>

        <!-- ── Brand footer ──────────────────────────────── -->
        <div class="brand-footer">
          <span class="bf-logo">⚽</span>
          <span class="bf-name">STADIUM BOOTH</span>
          <span class="bf-dot">·</span>
          <span class="bf-year">BANDUNG 2026</span>
        </div>

      </div>

      <!-- Fixed live bottom bar -->
      <div class="live-bar">
        <span class="live-dot"></span>
        <span class="live-lbl">LIVE</span>
        <span class="live-sep">|</span>
        <div class="live-scroll">
          <span class="live-ticker">
            ⚽ TERIMA KASIH TELAH MENGGUNAKAN STADIUM PHOTOBOOTH · FOTO AKAN SEGERA DIKIRIM · SEE YOU NEXT GAME · BANDUNG
            2026 ⚽
          </span>
        </div>
      </div>

    </div>
  </BoothLayout>
</template>

<style src="@/assets/css/success.css"></style>
