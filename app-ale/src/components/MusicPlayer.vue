<template>
<div>
    <youtube :videoId="videoId" @stop="stop" @playing="playing"
    :player-width="130"
    :player-height="100"
    @ready="ready"
    @ended="ended"
    ></youtube>
    <v-bottom-sheet inset>
      <template v-slot:activator="{ on }">
        <v-btn
          color="red"
          dark
          v-on="on"
        >
          Open Player
        </v-btn>
      </template>
      <v-card tile>
        <v-progress-linear
          :value="50"
          class="my-0"
          height="3"
        ></v-progress-linear>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Reproduciendo. . .</v-list-item-title>
              <v-list-item-subtitle>{{titulo}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-icon>
              <v-btn icon>
                <v-icon>fast_rewind</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>pause</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon
              class="ml-0"
              :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
            >
              <v-btn icon>
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
      titulo: '',
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
      videoId:'',
    }
  },
  created(){
    this.videoId = this.videoList[0].videoId
    this.fetch()
  },
  methods: {
    async fetch(){
      const { data } = await PostsRepository.getVideo(this.videoId, this.apikey)
      // const { data } = await VidRepos.get()
      this.titulo = data.items[0].snippet.title
      console.log(data.items[0].snippet.title)
    },
    ready (event) {
      console.log(event)
      this.player = event.target
      // this.player.playVideo()
    },
    playing(event) {
      console.log("Hola")
    },
    change () {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = this.videoList[1].videoId
      },    
    pause () {
      this.player.pauseVideo();
    },    
    stop () {
      this.player.stopVideo();
    },
    ended (event) {
      console.log(event)
      this.videoId = this.videoList[1].videoId
    }
  }
}
</script>