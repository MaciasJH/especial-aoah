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
    getPlaylist(){
        return PlayListRep.get()
    },
    
      createPost(payload) {
        return Repository.post(`${resource}`, payload);
      }
}