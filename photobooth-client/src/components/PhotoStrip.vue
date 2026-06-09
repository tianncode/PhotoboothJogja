<script setup>
import { computed } from 'vue'

const props = defineProps({
  photos: { type: Array, default: () => [] },
  frameName: { type: String, default: 'Classic' },
})

// ─── Theme map (inline styles for html2canvas fidelity) ───────
const THEMES = {
  'Classic': {
    stripBg: '#FFFFFF',
    headerBg: '#1A2035',
    headerText: '#FFFFFF',
    headerLabel: 'CLASSIC',
    headerSub: 'NAVY · CLEAN',
    footerBg: '#1A2035',
    footerText: '#FFFFFF',
    photoBorder: '1.5px solid #E8E3DC',
    photoRadius: '4px',
    photoGap: '14px',
    padding: '16px',
    accent: '#FFFFFF',
    type: 'classic',
  },
  'Film Strip': {
    stripBg: '#111111',
    headerBg: '#000000',
    headerText: '#FFFFFF',
    headerLabel: 'FILM STRIP',
    headerSub: 'DARK · CINEMATIC',
    footerBg: '#000000',
    footerText: '#888888',
    photoBorder: '1px solid #333333',
    photoRadius: '2px',
    photoGap: '6px',
    padding: '8px 36px',
    accent: '#FFD600',
    type: 'film',
  },
  'WC 2026': {
    stripBg: '#FFFFFF',
    headerBg: '#FFFFFF',
    headerText: '#1A2035',
    headerLabel: 'WC 2026',
    headerSub: 'TRICOLOR · OFFICIAL',
    footerBg: '#FFFFFF',
    footerText: '#555555',
    photoBorder: '1px solid #E0E0E0',
    photoRadius: '3px',
    photoGap: '12px',
    padding: '14px',
    accent: '#C62828',
    type: 'tricolor',
  },
  'Matchday': {
    stripBg: '#0F1829',
    headerBg: '#0F1829',
    headerText: '#FFFFFF',
    headerLabel: 'MATCHDAY',
    headerSub: 'DARK NAVY · STADIUM',
    footerBg: '#0F1829',
    footerText: '#B8962E',
    photoBorder: '1px solid #2C3652',
    photoRadius: '3px',
    photoGap: '10px',
    padding: '14px',
    accent: '#B8962E',
    type: 'matchday',
  },
  'Gold Trophy': {
    stripBg: '#F5EDD0',
    headerBg: '#B8962E',
    headerText: '#FFFFFF',
    headerLabel: 'GOLD TROPHY',
    headerSub: 'GOLD · PRESTIGE',
    footerBg: '#B8962E',
    footerText: '#FFFFFF',
    photoBorder: '2px solid #D4B86A',
    photoRadius: '4px',
    photoGap: '14px',
    padding: '16px',
    accent: '#B8962E',
    type: 'gold',
  },
  'Pitch Green': {
    stripBg: '#1B5E20',
    headerBg: '#2E7D32',
    headerText: '#FFFFFF',
    headerLabel: 'PITCH GREEN',
    headerSub: 'LAPANGAN · FIELD',
    footerBg: '#1B5E20',
    footerText: '#A5D6A7',
    photoBorder: '1.5px solid #388E3C',
    photoRadius: '3px',
    photoGap: '12px',
    padding: '14px',
    accent: '#A5D6A7',
    type: 'pitch',
  },
  '3 Nations': {
    stripBg: '#FFFFFF',
    headerBg: '#FFFFFF',
    headerText: '#1A2035',
    headerLabel: '3 NATIONS',
    headerSub: 'HOST · COUNTRIES',
    footerBg: '#FFFFFF',
    footerText: '#666666',
    photoBorder: '1px solid #E0E0E0',
    photoRadius: '3px',
    photoGap: '12px',
    padding: '14px',
    accent: '#B22234',
    type: 'nations',
  },
  'Vintage Press': {
    stripBg: '#F4E8D0',
    headerBg: '#F4E8D0',
    headerText: '#2C1810',
    headerLabel: 'PRESS PHOTO',
    headerSub: 'EDITORIAL · CLASSIC',
    footerBg: '#F4E8D0',
    footerText: '#5C4033',
    photoBorder: '1px dashed #8B6F47',
    photoRadius: '2px',
    photoGap: '14px',
    padding: '16px',
    accent: '#2C1810',
    type: 'vintage',
  },
}

const t = computed(() => THEMES[props.frameName] ?? THEMES['Classic'])

// Current date for footer
const dateStr = new Date().toLocaleDateString('id-ID', {
  day: '2-digit', month: 'short', year: 'numeric'
}).toUpperCase()
</script>

<template>
  <!-- Root: id="photostrip" required by generatePhotoStrip() -->
  <div id="photostrip" class="ps-root" :class="`ps-type--${t.type}`" :style="{ background: t.stripBg, width: '320px' }">

    <!-- ══ FILM STRIP: sprocket holes left ══ -->
    <div v-if="t.type === 'film'" class="ps-sprocket ps-sprocket--left">
      <div v-for="n in 12" :key="n" class="ps-hole" />
    </div>

    <!-- ══ WC 2026: tricolor top stripe ══ -->
    <div v-if="t.type === 'tricolor'" class="ps-tricolor-bar" />

    <!-- ══ MATCHDAY: stadium arc decoration ══ -->
    <div v-if="t.type === 'matchday'" class="ps-stadium-arc" />

    <!-- ─── HEADER ─────────────────────────────── -->
    <div class="ps-header" :style="{
      background: t.headerBg,
      color: t.headerText,
      padding: t.type === 'vintage' ? '18px 16px 14px' : '14px 16px',
      borderBottom: t.type === 'vintage' ? `2px solid ${t.accent}` : 'none',
    }">
      <!-- Classic / Matchday / Gold / Pitch / Film -->
      <template v-if="!['tricolor', 'nations', 'vintage'].includes(t.type)">
        <div class="ps-header-eyebrow" :style="{ color: t.accent, opacity: 0.7 }">
          STADIUM BOOTH
        </div>
        <div class="ps-header-label" :style="{ color: t.headerText }">
          {{ t.headerLabel }}
        </div>
        <div class="ps-header-sub" :style="{ color: t.headerText, opacity: 0.55 }">
          {{ t.headerSub }}
        </div>
      </template>

      <!-- WC 2026 tricolor header -->
      <template v-else-if="t.type === 'tricolor'">
        <div class="ps-header-eyebrow" style="color:#B0B0B0">FIFA WORLD CUP</div>
        <div class="ps-wc-title">
          <span style="color:#B22234">W</span><span style="color:#1A1A1A">C</span>
          <span style="color:#1A1A1A; font-size:18px; margin-left:6px">2026</span>
        </div>
        <div class="ps-header-sub" style="color:#888">TRICOLOR · OFFICIAL</div>
      </template>

      <!-- 3 Nations header -->
      <template v-else-if="t.type === 'nations'">
        <div class="ps-header-eyebrow" style="color:#999">WC HOST NATIONS</div>
        <div class="ps-nations-flags">
          <div class="ps-nation" style="background:#B22234">
            <span class="ps-nation-code">US</span>
            <span class="ps-nation-name">USA</span>
          </div>
          <div class="ps-nation" style="background:#FF0000">
            <span class="ps-nation-code">CA</span>
            <span class="ps-nation-name">CANADA</span>
          </div>
          <div class="ps-nation" style="background:#006847">
            <span class="ps-nation-code">MX</span>
            <span class="ps-nation-name">MEXICO</span>
          </div>
        </div>
      </template>

      <!-- Vintage Press header -->
      <template v-else-if="t.type === 'vintage'">
        <div class="ps-vintage-masthead">
          <div class="ps-vintage-rule" :style="{ background: t.accent }" />
          <div class="ps-vintage-title" :style="{ color: t.accent }">PRESS PHOTO</div>
          <div class="ps-vintage-rule" :style="{ background: t.accent }" />
        </div>
        <div class="ps-vintage-sub" :style="{ color: t.footerText }">
          EDITORIAL · CLASSIC · {{ dateStr }}
        </div>
      </template>
    </div>

    <!-- ─── PHOTOS ────────────────────────────── -->
    <div class="ps-photos" :style="{
      padding: t.padding,
      gap: t.photoGap,
      background: t.stripBg,
    }">
      <!-- PITCH GREEN: center circle decoration -->
      <div v-if="t.type === 'pitch'" class="ps-pitch-circle" />

      <div v-for="(photo, i) in photos" :key="i" class="ps-photo-wrap" :style="{
        border: t.photoBorder,
        borderRadius: t.photoRadius,
        overflow: 'hidden',
      }">
        <!-- Photo number badge -->
        <div class="ps-photo-badge" :style="{
          background: t.accent,
          color: t.type === 'classic' ? t.headerBg : (t.type === 'gold' ? '#FFF' : t.headerBg),
        }">
          {{ String(i + 1).padStart(2, '0') }}
        </div>
        <img :src="photo" class="ps-photo-img" :alt="`Foto ${i + 1}`" />
      </div>

      <!-- Empty slot placeholders -->
      <div v-for="n in Math.max(0, 4 - photos.length)" :key="`empty-${n}`" class="ps-photo-empty" :style="{
        border: t.photoBorder,
        borderRadius: t.photoRadius,
        color: t.type === 'classic' ? '#CCC' : (t.type === 'matchday' || t.type === 'pitch' || t.type === 'film') ? '#444' : '#CCC',
      }">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
          :stroke="t.type === 'matchday' || t.type === 'pitch' || t.type === 'film' ? '#444' : '#CCC'"
          stroke-width="1.5">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
    </div>

    <!-- ─── FOOTER ────────────────────────────── -->
    <div class="ps-footer" :style="{
      background: t.footerBg,
      borderTop: t.type === 'vintage' ? `2px solid ${t.accent}` : 'none',
      padding: t.type === 'vintage' ? '12px 16px' : '12px 16px',
    }">
      <!-- Vintage: dashed border box -->
      <template v-if="t.type === 'vintage'">
        <div class="ps-vintage-footer-box" :style="{ borderColor: t.accent }">
          <span :style="{ color: t.footerText, fontFamily: 'serif', fontSize: '11px', letterSpacing: '0.12em' }">
            STADIUM BOOTH PHOTOBOOTH
          </span>
        </div>
      </template>

      <!-- WC tricolor footer stripe -->
      <template v-else-if="t.type === 'tricolor'">
        <div class="ps-tricolor-bar ps-tricolor-bar--bottom" />
        <div style="text-align:center; padding-top: 8px">
          <span class="ps-footer-brand" :style="{ color: t.footerText }">STADIUM BOOTH</span>
          <span class="ps-footer-date" :style="{ color: '#AAAAAA' }">{{ dateStr }}</span>
        </div>
      </template>

      <template v-else>
        <span class="ps-footer-brand" :style="{ color: t.footerText }">STADIUM BOOTH</span>
        <span class="ps-footer-date" :style="{ color: t.footerText, opacity: 0.5 }">{{ dateStr }}</span>
      </template>
    </div>

    <!-- ══ FILM STRIP: sprocket holes right ══ -->
    <div v-if="t.type === 'film'" class="ps-sprocket ps-sprocket--right">
      <div v-for="n in 12" :key="n" class="ps-hole" />
    </div>

  </div>
</template>

<style scoped>
/* ── Root ─────────────────────────────────── */
.ps-root {
  position: relative;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  overflow: hidden;
  flex-shrink: 0;
}

/* ── Header ───────────────────────────────── */
.ps-header {
  text-align: center;
}

.ps-header-eyebrow {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.ps-header-label {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
}

.ps-header-sub {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-top: 3px;
}

/* ── Photos ───────────────────────────────── */
.ps-photos {
  display: flex;
  flex-direction: column;
  position: relative;
}

.ps-photo-wrap {
  position: relative;
  width: 100%;
  line-height: 0;
}

.ps-photo-badge {
  position: absolute;
  top: 6px;
  left: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0;
  z-index: 2;
  line-height: 1;
}

.ps-photo-img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.ps-photo-empty {
  width: 100%;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
}

/* ── Footer ───────────────────────────────── */
.ps-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ps-footer-brand {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.ps-footer-date {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* ─────────────────────────────────────────── */
/* FILM STRIP: sprocket holes                 */
/* ─────────────────────────────────────────── */
.ps-sprocket {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: #000;
  z-index: 10;
  padding: 8px 0;
}

.ps-sprocket--left {
  left: 0;
}

.ps-sprocket--right {
  right: 0;
}

.ps-hole {
  width: 14px;
  height: 10px;
  background: #333;
  border-radius: 2px;
  border: 1px solid #555;
}

/* ─────────────────────────────────────────── */
/* WC 2026: tricolor stripe                   */
/* ─────────────────────────────────────────── */
.ps-tricolor-bar {
  height: 6px;
  background: linear-gradient(90deg, #B22234 33.3%, #FFFFFF 33.3% 66.6%, #3C3B6E 66.6%);
  width: 100%;
}

.ps-wc-title {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 0.04em;
  line-height: 1;
  margin: 4px 0 2px;
}

/* ─────────────────────────────────────────── */
/* 3 NATIONS                                  */
/* ─────────────────────────────────────────── */
.ps-nations-flags {
  display: flex;
  margin-top: 6px;
}

.ps-nation {
  flex: 1;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.ps-nation-code {
  font-size: 18px;
  font-weight: 900;
  color: #FFF;
  letter-spacing: 0.04em;
  line-height: 1;
}

.ps-nation-name {
  font-size: 8px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.16em;
}

/* ─────────────────────────────────────────── */
/* MATCHDAY: arc                              */
/* ─────────────────────────────────────────── */
.ps-stadium-arc {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 120px;
  border-radius: 0 0 50% 50%;
  border: 1.5px solid rgba(184, 150, 46, 0.2);
  pointer-events: none;
  z-index: 0;
}

/* ─────────────────────────────────────────── */
/* PITCH GREEN: center circle                 */
/* ─────────────────────────────────────────── */
.ps-pitch-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  pointer-events: none;
}

/* ─────────────────────────────────────────── */
/* VINTAGE PRESS                              */
/* ─────────────────────────────────────────── */
.ps-vintage-masthead {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin-bottom: 4px;
}

.ps-vintage-rule {
  flex: 1;
  height: 1.5px;
  max-width: 48px;
}

.ps-vintage-title {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'Georgia', serif;
}

.ps-vintage-sub {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-align: center;
  text-transform: uppercase;
  opacity: 0.65;
}

.ps-vintage-footer-box {
  width: 100%;
  border: 1px dashed;
  padding: 6px;
  display: flex;
  justify-content: center;
}
</style>
