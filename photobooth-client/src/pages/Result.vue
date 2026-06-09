<script setup>
import BoothLayout from '@/layouts/BoothLayout.vue'
import PhotoStrip from '@/components/PhotoStrip.vue'
import { usePhotoboothStore } from '@/stores/photobooth'

const store = usePhotoboothStore()

const printPhoto = () => {
  window.print()
}

const sendEmail = () => {
  alert('Fitur email akan dibuat berikutnya')
}
</script>

<template>
  <BoothLayout>

    <h1 class="text-4xl font-bold mb-8">
      Hasil Akhir
    </h1>

    <PhotoStrip :photos="store.photos" :frame-name="store.selectedFrame?.name" />

    <div class="flex justify-center gap-4 mt-8">

      <button @click="finishOrder" class="px-8 py-4 bg-green-600 rounded-xl font-bold">
        CETAK & KIRIM EMAIL
      </button>

    </div>

  </BoothLayout>
</template>
