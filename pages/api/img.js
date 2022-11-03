import { apiImage } from "./base"
export default function uploadImg(FormData, showNotification) {
    console.log(FormData)
    apiImage
        .post("/upload", FormData, {
            // withCredentials: true,
        })
        .then((res) => {
            console.log('anda');
            showNotification({ status: true, message: 'todo okey loco' })
            //Refresh table in component
        })
        .catch((err) => {
            console.log('no anda', err);
            showNotification({ status: true, message: 'todo mal bro, cualquier cosa hiciste' })
        });

}