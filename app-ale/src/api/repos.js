import axios from "axios" 

const dominioB = "https://www.googleapis.com";
// const dominioB = "https://jsonplaceholder.typicode.com"
const baseURL =  `${dominioB}/youtube/v3`;

export default axios.create({
    baseURL
})