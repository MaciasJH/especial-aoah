<template>
<v-card
  elevation="24"
  max-width="480"
  class="mx-auto">  
  <youtube 
    :video-id="videoId" 
    ref="youtube" 
    @playing="playing"
    fitParent
    >
  </youtube>
  <v-btn
      v-on="playVideo()"
      class="mt-5"
      dark
    >
</v-card>
</template>

<script>
export default {
  data() {
    return {
      videoId: 'lG0Ys-2d4MA'
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo()
    },
    playing() {
      console.log('we are watching!!!')
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  }
}
</script>
