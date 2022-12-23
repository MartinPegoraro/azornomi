import axios from "axios";
// const apiImage = axios.create({ baseURL: "http://localhost:5000/upload" });
// const apiStrapi = axios.create({ baseURL: "http://localhost:1337/api" });
// const apiNode = axios.create({ baseURL: "http://localhost:5000" })
// const apiArtist = axios.create({ baseURL: "http://localhost:5000/artist" })
// const apiCanva = axios.create({ baseURL: "http://localhost:5000/canva" })
// const apiSaveImg = axios.create({ baseURL: "http://localhost:5000/saveImage" })

const apiImage = axios.create({ baseURL: "http://54.94.62.103:3002/upload" });
const apiNode = axios.create({ baseURL: "http://54.94.62.103:3002" })
const apiArtist = axios.create({ baseURL: "http://54.94.62.103:3002/artist" })
const apiCanva = axios.create({ baseURL: "http://54.94.62.103:3002/canva" })
const apiSaveImg = axios.create({ baseURL: "http://54.94.62.103:3002/saveImage" })

export { apiImage, apiNode, apiCanva, apiArtist, apiSaveImg };