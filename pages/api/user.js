import { apiStrapi, apiNode, apiArtist, apiCanva } from "./base"
import axios from "axios"

// /api/auth/local/register

export const userApi = {
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
            console.log(response);
            return response

        } catch (error) {
            console.log(error);
            return error.response
        }
    },
    registerUserCanva: async (data) => {
        try {
            console.log(data, 'dentro del try ')
            const response = await apiCanva
                .post("/", data)
            console.log(response);
            return response

        } catch (error) {
            console.log(error);
            return error.response
        }
    },
    confirmUser: async (data) => {
        console.log(data, 'data');
        axios
            .post('http://localhost:5000/artist/send-codEmail', data)
            .then(response => {
                // Handle success.
                console.log(response.data.body.email);
                console.log('Well done!');
                // console.log('User profile', response.data.nickName);
                // console.log('User token', response.data.password);
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    },
    loginUser: async (data) => {
        console.log("Info a enviar", typeof (data), data)
        apiNode
            .post("/auth/login", data)
            .then((res) => {
                const { user, token } = res.data.body
                console.log(user, 'anda');
                console.log(token, 'anda');


                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)

                // showNotification({ status: true, message: 'tusuario creado' })
                //Refresh table in component
            })
            .catch((err) => {
                console.log('no anda', err);
                // showNotification({ status: true, message: 'todo mal bro, no se creo o ya existe' })
            });
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
    }
}


