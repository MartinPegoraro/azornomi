import { apiStrapi, apiNode } from "./base"
import axios from "axios"

// /api/auth/local/register

export const userApi = {
    registerUser: async (data) => {

        console.log(data, 'data');
        axios
            .post('http://localhost:5000/artist', data)
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
    }
}


