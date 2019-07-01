<template>
  <v-card
    class="mx-auto"
    max-width="400"
    max-height="560"
  >
    <v-img
      class="white--text"
      height="200px"
      :src="video.thumbnail"
    >
      <v-card-title class="align-end fill-height">{{ video.titulo}}</v-card-title>
    </v-img>

    <v-card-text>
      <span>Descripción</span><br>
      <span class="text--primary" >
        <div style="display: block;width: 380px; height: 200px;
  overflow: auto;">{{ video.descripcion }}</div>
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
      <v-btn
        text
        color="#004c8c"
      >
        Ver Video
      </v-btn>
      <v-btn
        icon
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>      
    </v-card-actions>
  </v-card>
</template>

<script>
import { RepositoryFactory } from '../api/reposFactory'
// import { RepositoryFactory } from '../api/RepositoryFactory'
const PostsRepository = RepositoryFactory.get('videos')

// const VidRepos = RepositoryFactory.get('videos')


export default {
  data() {
    return {
      playlistN: 'test',
      playlistYT: 'PLu8LFhYmo24cz4Zj6qd57G3nRqTV1h1IV',
      repro: false,
      ini: true,
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
  created(){
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
    sig(){
      if (this.index < this.videoList.length-1) {
        this.index=this.index+1
      }
      else{
        this.fini=true;
      }
      this.ini=false;
      this.video.videoId = this.videoList[this.index].contentDetails.videoId
      this.fetchVideo()
    },
    ant(){
      if (this.index >0) {
        this.index--
      }
      if(this.index ==0){
        this.ini=true
      }
      this.fini=false;
      this.video.videoId = this.videoList[this.index].contentDetails.videoId
      this.fetchVideo()
    }
  }
}
</script>