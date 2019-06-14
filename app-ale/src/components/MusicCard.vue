<template>
  <v-card
    class="mx-auto"
    max-width="400"
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
      <span class="text--primary">
        <span>{{ video.descripcion }}</span>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn
        icon
        color="#004c8c"
      >
        <v-icon>chevron_left</v-icon>
      </v-btn>
      <v-btn
        icon
        color="#004c8c"
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
      repro: false,
      index: 0,
      video: {
        titulo: '',
        descripcion: '',
        thumbnail: '',
        videoId: ''
      },
      apikey: 'AIzaSyAgH8UJ-G09n-qxUfndVVq7b58HGj5BfJ8',
      videoList: [
        {
          titulo: 'Test',
          videoId: 'lG0Ys-2d4MA'
        },
        {
          titulo: 'Test2',
          videoId: 'y2oy7b4SFgE'          
        }
      ],
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
      const { data } = await PostsRepository.getPlaylist()
      // const { data } = await VidRepos.get()
      // this.titulo = data.items[0].snippet.title
      this.videoList=data
      this.video.videoId=this.videoList[0].videoId
      this.fetchVideo()
    },
    sig(){
      if (this.index < this.videoList.length-1) {
        this.index=this.index+1
      }
      else{
      }
      this.video.videoId = this.videoList[this.index].videoId
      this.fetchVideo()
    },
    ant(){
      if (this.index >0) {
        this.index--
      }
      this.video.videoId = this.videoList[this.index].videoId
      this.fetchVideo()
    }
  }
}
</script>