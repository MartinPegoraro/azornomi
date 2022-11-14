import axios from "axios";
const apiImage = axios.create({ baseURL: "http://54.94.62.103:3009" });
const apiStrapi = axios.create({ baseURL: "http://localhost:1337/api" });
const apiNode = axios.create({ baseURL: "http://localhost:5000" })
const apiArtist = axios.create({ baseURL: "http://localhost:5000/artist" })
const apiCanva = axios.create({ baseURL: "http://localhost:5000/canva" })

export { apiImage, apiStrapi, apiNode, apiCanva, apiArtist };