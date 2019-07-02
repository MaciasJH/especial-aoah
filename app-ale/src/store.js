import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlistId: null,
    bandera: false
  },
  mutations: {
    setPlaylist(state, newState){
      state.playlistId = newState
      console.log('entro aqui y el nuevo state es: ')
      console.log(newState)
    },
    setBandera(state, newState){
      state.bandera = newState
    }
  },
  actions: {
    setPlaylist: ({ commit }, params) => {
      commit('setPlaylist', params)
    },
    setBandera: ({ commit }, params) =>{
      commit('setBandera', params)
    }
  }
})
