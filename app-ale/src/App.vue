<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"      
      app
    >
    <v-list-item style="background-color: #0086c3">
      <v-list-item-content>
        <v-list-item-title class="title" style="color: white">
          Aplicación
          
        </v-list-item-title>

        <v-list-item-subtitle style="color: white">
          Menú
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
      <v-divider></v-divider>
      <v-list
        dense
        nav>
        <v-list-item @click="go('')">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="go('music')">
          <v-list-item-action>
            <v-icon>library_music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Musica</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="go('recuerdos')">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Recuerdos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="go('videos')">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Videos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="go('estad')">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Estadisticas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>                        
        <v-list-item @click="go('about')">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="light-blue" dark fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Menu</v-app-bar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
       <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="light-blue" app>
       <v-layout column align-center justify-center>
      <music-player></music-player>
       </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import MusicPlayer from './components/MusicPlayer'

  export default {
    data: () => ({
      drawer: null
    }),
    components: {
     MusicPlayer,
    },
    props: {
      source: String
    },
    methods:{
      go(ruta){
        this.$router.push('/'+ruta)
      }  
    }
  }
  
</script>