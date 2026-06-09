import { defineStore } from 'pinia'

export const usePhotoboothStore = defineStore('photobooth', {
  state: () => ({
    sessionId: null,

    // Paket
    selectedPackage: null,

    // Email pelanggan
    email: '',

    // Frame dipilih
    selectedFrame: null,

    // Tambahan print
    extraPrint: 0,

    // Harga total
    totalPrice: 0,

    // Hasil foto
    photos: [],
    
    finalStrip: null,
  }),

  actions: {
    setPackage(pkg) {
      this.selectedPackage = pkg
    },

    setEmail(email) {
      this.email = email
    },

    setFrame(frame) {
      this.selectedFrame = frame
    },

    setExtraPrint(value) {
      this.extraPrint = value
    },

    setTotalPrice(price) {
      this.totalPrice = price
    },

    addPhoto(photo) {
      this.photos.push(photo)
    },

    clearPhotos() {
      this.photos = []
    },

    resetSession() {
      this.sessionId = null
      this.selectedPackage = null
      this.email = ''
      this.selectedFrame = null
      this.extraPrint = 0
      this.totalPrice = 0
      this.photos = []
    },
  },
})
