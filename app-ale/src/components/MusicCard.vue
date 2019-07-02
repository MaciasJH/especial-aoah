<template>
  <v-card
    class="mx-auto"
    max-width="440"
    max-height="520"
  >
    <v-img
      class="white--text"
      height="240px"
      :src="video.thumbnail"
    >
      <v-card-title class="align-end fill-height">{{ video.titulo }}</v-card-title>
    </v-img>

    <v-card-text>
      <span>Descripción</span><br>
      <span class="text--primary" >
        <div v-if="video.descripcion !=''" style="display: block;width: 420px; height: 150px;
  overflow: auto;">{{ video.descripcion }}</div>
        <div v-else style="display: block;width: 420px; height: 150px;
  overflow: auto;">Sin descripción</div>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn
        icon
        color="#004c8c"
        :disabled="ini"
        @click="ant()"
      >
        <v-icon>chevron_left</v-icon>
      </v-btn>
      <v-btn
        icon
        color="#004c8c"
        :disabled="fini"
        @click="sig()"
      >
        <v-icon>chevron_right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-dialog
        v-model="dialog"
        max-width=860px
        >
      <template v-slot:activator="{on}">
      <v-btn
        icon
        color="red"
        @click="salir()"
      >
        <v-icon>close</v-icon>
      </v-btn>         
      <v-btn
        text
        color="#004c8c"
        v-on="on"
      >
        Ver Video
      </v-btn>

      </template>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
          style="font-size=fontS"
        >
          {{video.titulo}}
        </v-card-title>
        <v-divider></v-divider>

        <youtube style="margin-top:10px;text-align: center" :videoId="video.videoId" 
    :player-width="anchoV"
    :player-height="altoV"
    ></youtube>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
   
    </v-card-actions>
  </v-card>
</template>

<script>
import { RepositoryFactory } from '../api/reposFactory'
import Store from '../store'
// import { RepositoryFactory } from '../api/RepositoryFactory'
const PostsRepository = RepositoryFactory.get('videos')

// const VidRepos = RepositoryFactory.get('videos')


export default {
  props:{
    test: {}
  }, 
  data() {  
    return {
      dialog: false,
      playlistN: 'test',
      playlistYT: '',
      repro: false,
      ini: false,
      fini: false,
      index: 0,
      video: {
        titulo: '',
        descripcion: '',
        thumbnail: '',
        videoId: ''
      },
      apikey: 'AIzaSyAgH8UJ-G09n-qxUfndVVq7b58HGj5BfJ8',
      videoList: [],
    }
  },
  computed:{
    fontS(){
      switch (this.$vuetify.breakpoint.name){
        case 'xs': return '3em'
        case 'sm': return '4em'
        default: return '5em'
      }
    },
    anchoV(){
      switch (this.$vuetify.breakpoint.name){
        case 'xs': return '360px'
        case 'sm': return '540px'
        case 'md': return '780px'
        case 'lg': return '746px'
        case 'xl': return '1280px'
      }
    },
    altoV(){
      switch (this.$vuetify.breakpoint.name){
        case 'xs': return '180px'
        case 'sm': return '260px'
        case 'md': return '400px'
        case 'lg': return '420px'
        case 'xl': return '720px'
      }
    }
  },
  created(){
    console.log('Va creando: '+this.playlistYT+this.test)
    this.playlistYT = this.test
    this.fetchPlaylist()
  },
  methods: {
    async fetchVideo(){
      console.log("fetchvideo  "+this.video.videoId)
      const { data } = await PostsRepository.getVideo(this.video.videoId, this.apikey)
      // const { data } = await VidRepos.get()
      this.video.titulo = data.items[0].snippet.title
      this.video.descripcion = data.items[0].snippet.description
      this.video.thumbnail = data.items[0].snippet.thumbnails.high.url
      this.video.videoId = data.items[0].id
      console.log(this.video)
    },
    async fetchPlaylist(){
      //const { data } = await PostsRepository.getPlaylist(this.playlistN)
      //console.log(data)
      const { data } = await PostsRepository.getPlaylistYT(this.playlistYT, this.apikey)      
      
      // const { data } = await VidRepos.get()
      // this.titulo = data.items[0].snippet.title
      this.videoList=data.items
      
      if (this.videoList.length < data.pageInfo.totalResults) {
        this.fetchPlaylistT(data.nextPageToken)
      }else{
        this.video.videoId=this.videoList[0].contentDetails.videoId
        this.fetchVideo()
      }
      
    },
    async fetchPlaylistT(pageToken){
      const { data } = await PostsRepository.getPlaylistYTT(this.playlistYT, this.apikey, pageToken)

      this.videoList=this.videoList.concat(data.items)

      if (this.videoList.length < data.pageInfo.totalResults) {
        this.fetchPlaylistT(data.nextPageToken)
      }else{
        this.video.videoId=this.videoList[0].contentDetails.videoId
        this.fetchVideo()
      }
    },
    salir(){
      Store.dispatch('setBandera', false)
    },
    sig(){
      if (this.index < this.videoList.length-1) {
        this.index=this.index+1
      }
      else{
        this.index=0;
      }
      this.ini=false;
      this.video.videoId = this.videoList[this.index].contentDetails.videoId
      this.fetchVideo()
    },
    ant(){
      if (this.index >0) {
        this.index--
      }
      else{
        this.index=this.videoList.length-1
      }
      this.fini=false;
      this.video.videoId = this.videoList[this.index].contentDetails.videoId
      this.fetchVideo()
    },
  }
}
</script>