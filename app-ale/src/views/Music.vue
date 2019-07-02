<template>
  <MusicCard v-if="bandera" :test="playlistId">
  </MusicCard>
</template>

<script>
import MusicCard from '../components/MusicCard';
import MusicItems from '../components/MusicItems';
import Store from '../store';

export default {
  components: {
    MusicCard, MusicItems
  },
  data(){
    return{
     // bandera: false,
     // playlistId: 'playlistId'
    }
  },
  created(){
    Store.dispatch('setPlaylist', 'PLu8LFhYmo24cz4Zj6qd57G3nRqTV1h1IV')
    Store.dispatch('setBandera', true)
  },
  computed:{
    playlistId(){
      return Store.state.playlistId
    },
    bandera(){
      return Store.state.bandera
    }
  }
};
</script>
