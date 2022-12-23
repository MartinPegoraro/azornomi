import { apiNode, apiArtist, apiCanva, apiImage, apiSaveImg } from "./base"
import axios from "axios"

// /api/auth/local/register

export const userApi = {
    sendSearch: async (data) => {
        try {
            console.log(data);
            const response = await apiNode.post("/auth/sendSearch", data)
            return response

        } catch (error) {
            console.log(error);
            return error.response
        }
    },

    registerUserArtist: async (data) => {

        // console.log(data, 'data');
        // axios
        //     .post('http://localhost:5000/artist', data)
        //     .then(response => {
        //         // Handle success.
        //         console.log(response.data.body.email);
        //         console.log('Well done!');
        //         // console.log('User profile', response.data.nickName);
        //         // console.log('User token', response.data.password);
        //     })
        //     .catch(error => {
        //         // Handle error.
        //         console.log('An error occurred:', error.response);
        //     });
        try {
            const response = await apiArtist
                .post("/", data)
            return response

        } catch (error) {
            console.log(error);
            return error.response
        }
    },
    registerUserCanva: async (data) => {
        try {
            const response = await apiCanva
                .post("/", data)
            return response

        } catch (error) {
            console.log(error);
            return error.response
        }
    },
    confirmUserArtist: async (data) => {
        try {
            const response = await apiArtist
                .post("/send-codEmail", data)
            // console.log(response);
            return response

        } catch (error) {
            console.log(error);
            return error.response
        }
    },
    confirmUserCanva: async (data) => {
        try {
            const response = await apiCanva
                .post("/send-codEmail", data)
            // console.log(response);
            return response

        } catch (error) {
            console.log(error);
            return error.response
        }
    },
    loginUser: async (data) => {
        try {
            const res = await apiNode.post("/auth/login", data)
            return res
        } catch (err) {
            console.log(err);
        }
        // console.log("Info a enviar", typeof (data), data)
        // apiNode
        //     .post("/auth/login", data)
        //     .then((res) => {
        //         const { user, token } = res.data.body
        //         console.log(user, 'anda');
        //         console.log(token, 'anda');


        //         localStorage.setItem("user", JSON.stringify(user))
        //         localStorage.setItem("token", token)

        //         // showNotification({ status: true, message: 'tusuario creado' })
        //         //Refresh table in component
        //     })
        //     .catch((err) => {
        //         console.log('no anda', err);
        //         // showNotification({ status: true, message: 'todo mal bro, no se creo o ya existe' })
        //     });
    },
    sendMsgEmail: async (data) => {
        // console.log("enviar codigo al correo api", data)
        // let response;
        // await apiArtist
        //     .post("/send-codRecoverPass", { email: data.email })
        //     .then((res) => {
        //         console.log(res.data.body);
        //         response = res.data.body
        //         // return res.data.body
        //         // showNotification({ status: true, message: 'tusuario creado' })
        //         //Refresh table in component
        //     })
        //     .catch((err) => {
        //         console.log('no anda', err);
        //         // showNotification({ status: true, message: 'todo mal bro, no se creo o ya existe' })
        //     });

        try {
            const response = await apiNode
                .post("/auth/send-codRecoverPass", { email: data.email })
            console.log(response);
            return response

        } catch (error) {
            console.log(error);
            return error.response
        }
        // return response
    },
    checkCod: async (data) => {
        console.log("codido de verif en api", data)
        try {
            const response = await apiNode
                .post('/auth/checkCod', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    forgetPassword: async (data) => {
        console.log("cambiar contrasena api", data)
        try {
            const response = await apiNode
                .post('/auth/recoverPass', data)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getAllCanva: async (data) => {
        try {
            const response = await apiImage
                .get('/getAllCanva')
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getAllArtist: async (data) => {
        try {
            const response = await apiImage
                .get('/getAllArtist')
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getOneCanva: async (id) => {
        // console.log(data);
        try {
            const response = await apiCanva
                .get(`/${id}`)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getOneArtist: async (id) => {
        // console.log(data);
        try {
            const response = await apiArtist
                .get(`/${id}`)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getOneUser: async (id) => {        // aca ya se obtienen los 2 tipos de user
        try {
            const res = await apiCanva.get(`/user/${id}`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    },

    updateCanva: async (user, formData) => {
        try {
            const res = await apiCanva.patch(`/${user._id}`, formData)
            return res
        } catch (error) {
            console.log(error);
        }
    },

    updateArtist: async (user, formData) => {
        try {
            const res = await apiArtist.patch(`/${user._id}`, formData)
            return res
        } catch (error) {
            console.log(error);
        }
    },

    createSaveImg: async (data) => {
        try {
            const response = await apiSaveImg
                .post(`/createImgSave`, data)
            // console.log(response.data.body, 'response');
            return response
        } catch (error) {
            console.log(error.response);
        }
    },

    savePublication: async (id, state) => {
        // console.log(id, state);
        try {
            const response = await apiSaveImg
                .patch(`/savePublication/${id}`, { savedImg: state })
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getImgSave: async (data) => {
        try {
            console.log('getImg');
            const response = await apiSaveImg
                .post(`/getImgSave`, data)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    deleteImg: async (id) => {
        try {
            console.log(id);

            const response = await apiImage
                .delete(`/deleteImg/${id}`)
            console.log(response.data);
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getAllArtistData: async () => {
        try {
            const response = await apiArtist
                .get(`/getAllArtistData`)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getAllCanvaData: async () => {
        try {
            const response = await apiCanva
                .get(`/getAllCanvaData`)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },

    deleteUserCanva: async (id) => {
        try {
            console.log(id);
            const response = await apiCanva
                .delete(`/delete/${id}`)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    deleteUserArtist: async (id) => {
        try {
            const response = await apiArtist
                .delete(`/delete/${id}`)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getChatArtist: async (id) => {
        try {
            const response = await apiImage
                .get(`/getChatArtist/${id}`)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
    getChatCanva: async (id) => {
        try {
            const response = await apiImage
                .get(`/getChatCanva/${id}`)
            return response
        } catch (error) {
            console.log(error.response);
        }
    },
}


