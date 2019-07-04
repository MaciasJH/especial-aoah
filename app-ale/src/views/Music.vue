<template>
<v-container>
  <MusicCard v-if="bandera" :test="playlistId" class="mb-4">
  </MusicCard>
  <div v-if="bandera">
    Más playlists
  </div>
  <div v-else>
    Playlists
  </div>
  <v-divider>
  </v-divider>
  <v-card
    
    max-width="900"
    class="mx-auto mt-2"
  >
    <v-container
      grid-list-md
      pa-1
    >
      <v-item-group
        v-model="selected"
        :multiple="false"
      >
        <v-layout wrap>
          <v-flex
            v-for="(item, i) in items"
            :key="i"
            xs12
            sm6
            md3
            xl12
          >De: {{item.snippet.channelTitle}}
            <v-hover  v-slot:default="{ active, toggle, hover }">
              <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img
                :src="item.snippet.thumbnails.high.url"
                :height="optionH"
                @click="showCard(item)"
              >
              <v-expand-transition>
                <div  v-if="hover"
                class="d-flex black darken-2 v-card--reveal display-3 white--text"
                style="opacity: 0.9">
                <v-card-title class="white--text align-end fill-height" v-bind:style="{fontSize: fontS}">
                  <v-layout
                    fill-height
                    column
                    justify-space-between
                  >
                  <span class="headline  lighten-2">{{item.snippet.title}}</span>
                  <div class="align-self-center">
                      <v-btn
                        v-if="hover"                     
                      >
                        <v-icon
                        class="md-light">
                          launch</v-icon>
                      </v-btn>
                    </div>  
                    
                  </v-layout>  
                </v-card-title></div></v-expand-transition>
                
                <v-card-title class="white--text align-end fill-height" v-bind:style="{fontSize: fontS}">

                  <span class="headline  lighten-2">{{item.snippet.title}}</span>
                  
                </v-card-title>  
                    
                       
              </v-img>
              
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-item-group>
    </v-container>
  </v-card>


</v-container>
</template>

<script>
import MusicCard from '../components/MusicCard';
import MusicItems from '../components/MusicItems';
import Store from '../store';
import { RepositoryFactory } from '../api/reposFactory'

// import { RepositoryFactory } from '../api/RepositoryFactory'
const PostsRepository = RepositoryFactory.get('videos')
export default {
  components: {
    MusicCard, MusicItems
  },
  data(){
    return{
      index: 0,
      apikey: 'AIzaSyAgH8UJ-G09n-qxUfndVVq7b58HGj5BfJ8',
      items: [],
      selected: [],   
      playlists: ["PLu8LFhYmo24cz4Zj6qd57G3nRqTV1h1IV", "PLFs4vir_WsTwEd-nJgVJCZPNL3HALHHpF"] 
     // bandera: false,
     // playlistId: 'playlistId'
    }
  },
  created(){
    this.fetchPlaylists()
  },
  computed:{
    playlistId(){
      return Store.state.playlistId
    },
    bandera(){
      return Store.state.bandera
    },
    optionH(){
      switch (this.$vuetify.breakpoint.name){
        case 'xs': return '180px'
        case 'sm': return '160px'
        case 'md': return '160px'
        case 'lg': return '120px'
        case 'xl': return '220px'
      }
    },
    fontS(){
      switch (this.$vuetify.breakpoint.name){
        case 'xs': return '26px'
        case 'sm': return '32px'
        default: return '18px'
      }
    }    
  },
  methods:{
      async fetchPlaylists(){
      const { data } = await PostsRepository.getPlaylistYTP(this.playlists[0], this.apikey)
    /*  Llamada PUT para agregar nuevo video a lista de reproduccion, 'test' es el nombre de la lista
        var videoObj = {
          "videoId" : "dQw4w9WgXcQ"
        }
        PostsRepository.createVid('test', data.length, videoObj)*/

      // const { data } = await VidRepos.get()
      // this.titulo = data.items[0].snippet.title
      this.items=data.items
      if (this.items.length < this.playlists.length) {
        this.index++
        console.log('primero')        
        console.log(this.items)        
        this.fetchPlaylistsT(this.playlists[this.index])
      }else{

      }
    },
    async fetchPlaylistsT(id){
      const { data } = await PostsRepository.getPlaylistYTP(id, this.apikey)
      console.log('l de play: '+this.playlists.length+' l de item'+this.items.length)
      this.items=this.items.concat(data.items)
      console.log('l de play: '+this.playlists.length+' l de item'+this.items.length)
      if (this.items.length < this.playlists.length) {
        this.index++
        console.log('recursivo en: '+this.index)        
        console.log(this.items)        
        this.fetchPlaylistsT(this.index)
      }else{
        console.log('Ha terminado')
        console.log(this.items)
      }
    },  
    showCard(playlist){
      Store.dispatch('setPlaylist', playlist.id)
      Store.dispatch('setBandera', true)      
      console.log(playlist)
    },  
  }
};
</script>
