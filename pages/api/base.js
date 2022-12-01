import axios from "axios";
const apiImage = axios.create({ baseURL: "http://localhost:5000/upload" });
const apiStrapi = axios.create({ baseURL: "http://localhost:1337/api" });
const apiNode = axios.create({ baseURL: "http://localhost:5000" })
const apiArtist = axios.create({ baseURL: "http://localhost:5000/artist" })
const apiCanva = axios.create({ baseURL: "http://localhost:5000/canva" })
const apiSaveImg = axios.create({ baseURL: "http://localhost:5000/saveImage" })

export { apiImage, apiStrapi, apiNode, apiCanva, apiArtist, apiSaveImg };