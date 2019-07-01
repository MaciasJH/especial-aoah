<template>
<div class="text-xs-center">
    <v-bottom-sheet inset>
      <template v-slot:activator="{ on }">
        <v-btn
          color="#004c8c"
          dark
          v-on="on"
        >
          Reproductor
          <v-icon>music_note</v-icon>
        </v-btn>
      </template>
      <v-card tile>
        <v-progress-linear
          v-model="porcentaje"
          class="my-0"
          height="3"
        ></v-progress-linear>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-if="repro">Reproduciendo. . .</v-list-item-title>
              <v-list-item-title v-if="!repro">En pausa. . .</v-list-item-title>
              <v-list-item-subtitle>{{titulo}}</v-list-item-subtitle>
            </v-list-item-content>

                <youtube :videoId="videoId" @stop="stop" @playing="playing"
    :player-width="1"
    :player-height="1"
    @ready="ready"
    @ended="ended"
    ></youtube>
            <v-list-item-icon>
              <v-btn @click="ant()" icon>
                <v-icon>fast_rewind</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn v-if="repro" @click="pausa()" icon>
                <v-icon>pause</v-icon>
              </v-btn>
              <v-btn @click="stop()" icon>
                <v-icon>stop</v-icon>
              </v-btn>                 
              <v-btn v-if="!repro" @click="play()" icon>
                <v-icon>play_arrow</v-icon>
              </v-btn>           
            </v-list-item-icon>

            <v-list-item-icon
              class="ml-0"
              :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
            >
              <v-btn @click="sig()" icon>
                <v-icon>fast_forward</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
   
</div>
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
      porcentaje: 0,
      index: 0,
      titulo: '',
      playlistYT: 'PLu8LFhYmo24cz4Zj6qd57G3nRqTV1h1IV',      
      apikey: 'AIzaSyAgH8UJ-G09n-qxUfndVVq7b58HGj5BfJ8',
      videoList: [
      ],
      videoId:'',
    }
  },
  created(){
    this.fetchPlaylist()
  },
  methods: {
    async fetchVideo(){
      const { data } = await PostsRepository.getVideo(this.videoId, this.apikey)
      // const { data } = await VidRepos.get()
      this.titulo = data.items[0].snippet.title
      console.log(data.items[0])
    },
    async fetchPlaylist(){
      const { data } = await PostsRepository.getPlaylistYT(this.playlistYT, this.apikey)
    /*  Llamada PUT para agregar nuevo video a lista de reproduccion, 'test' es el nombre de la lista
        var videoObj = {
          "videoId" : "dQw4w9WgXcQ"
        }
        PostsRepository.createVid('test', data.length, videoObj)*/

      // const { data } = await VidRepos.get()
      // this.titulo = data.items[0].snippet.title
      this.videoList=data.items

      if (this.videoList.length < data.pageInfo.totalResults) {
        this.fetchPlaylistT(data.nextPageToken)
      }else{
        this.videoId=this.videoList[0].contentDetails.videoId
        this.shuffle(this.videoList)
      }
    },
    async fetchPlaylistT(pageToken){
      const { data } = await PostsRepository.getPlaylistYTT(this.playlistYT, this.apikey, pageToken)

      this.videoList=this.videoList.concat(data.items)

      if (this.videoList.length < data.pageInfo.totalResults) {
        this.fetchPlaylistT(data.nextPageToken)
      }else{
        this.videoId=this.videoList[0].contentDetails.videoId
        this.shuffle(this.videoList)
      }
    },    
    sig(){
      if (this.index < this.videoList.length-1) {
        this.index=this.index+1
      }
      else{
        this.shuffle(this.videoList)
      }
      this.videoId = this.videoList[this.index].contentDetails.videoId
      this.fetchVideo()
      this.repro=false;
      this.porcentaje = 0;
    },
    ant(){
      if (this.index >0) {
        this.index--
      }
      this.videoId = this.videoList[this.index].contentDetails.videoId
      this.fetchVideo()
      this.repro=false;
      this.porcentaje = 0;
      console.log(this.player)
    },
    pausa(){
      this.repro=false;
      this.player.pauseVideo()
    },
    play(){
      this.repro=true;
      this.player.playVideo()
      console.log(this.player.getDuration())
      console.log(this.player.getCurrentTime())
      this.loop()
    },
    ready (event) {
      this.player = event.target
      this.fetchVideo()
    },
    playing(event) {
    },
    change () {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      },    
    pause () {
      this.player.pauseVideo();
    },    
    stop () {
      console.log(this.player);
      this.player.pauseVideo()
      this.player.seekTo(0, true)
      this.repro = false;
    },
    ended (event) {
      this.videoId = this.videoList[this.index+1].contentDetails.videoId
      
    },
    shuffle(arr){
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      this.videoList = arr
      this.index = 0
      this.videoId = this.videoList[this.index].contentDetails.videoId
    },
    loop(){
      var _this = this
      this.porcentaje = ((_this.player.getCurrentTime() * 100)/_this.player.getDuration())  
      console.log(this.porcentaje)
      if (_this.repro == true) {
        setTimeout(function(){
          _this.loop();
        }, 50);
      } 

    }
  }
}
</script>