<template>
<v-container>
  <v-card
    v-if="!bandera"
    max-width="900"
    class="mx-auto"
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
            xs2
            md3
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-img
                :src="item.snippet.thumbnails.medium.url"
                height="120"
                @click="showCard(item)"
              >
                <v-card-title class="title white--text fill-height">
                  <v-layout
                    fill-height
                    column
                    justify-space-between
                  >
                    <p class="mt-3 subheading text-xs-left">test1</p>

                    <div>
                      <p class="ma-0 body-1 font-weight-bold font-italic text-xs-left">
                        test2
                      </p>
                      <p class="caption font-weight-medium font-italic text-xs-left">
                        test3
                      </p>
                    </div>

                  </v-layout>
                </v-card-title>                
              </v-img>
            </v-item>
          </v-flex>
        </v-layout>
      </v-item-group>
    </v-container>
  </v-card>

  <MusicCard v-if="bandera" :test="playlistId">
  </MusicCard>
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
