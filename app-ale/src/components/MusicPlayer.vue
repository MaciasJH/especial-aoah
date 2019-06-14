<template>
  <youtube 
    :video-id="videoId" 
    ref="youtube" 
    @playing="playing"
    fitParent
    >
  </youtube>
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
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  }
}
</script>
