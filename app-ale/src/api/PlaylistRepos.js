import axios from "axios" 

const dominioB = "https://appale.firebaseio.com/playlist";
// const dominioB = "https://jsonplaceholder.typicode.com"
const baseURL =  `${dominioB}`;

export default axios.create({
    baseURL
})