import repos from './repos'
import PlayListRep from './PlaylistRepos'

const resource = "/videos"
const part = "snippet,contentDetails,statistics,status"
export default {
    get(){
        return repos.get(`${resource}`)
    },
    getVideo(id, key){
        return repos.get(`${resource}?id=${id}&key=${key}&part=${part}`);
    },
    getPost(postId) {
        return Repository.get(`${resource}/${postId}`);
      },
    getPlaylist(name){
      return PlayListRep.get(`${name}/.json`)
    },
    getPlaylistYT(id, key){
      return repos.get(`playlistItems?playlistId=${id}&key=${key}&part=snippet,contentDetails&maxResults=10`);
    },
    getPlaylistYTT(id, key, token){
      return repos.get(`playlistItems?playlistId=${id}&key=${key}&pageToken=${token}&part=snippet,contentDetails&maxResults=10`);
    },
    getPlaylistYTP(id, key){
      return repos.get(`playlists?id=${id}&key=${key}&part=snippet,contentDetails&maxResults=10`);
    },
    createVid(name, id, videoId) {
        return PlayListRep.put(`${name}/${id}/.json`, videoId);
      }
}