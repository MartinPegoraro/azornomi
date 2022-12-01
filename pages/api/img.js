import { apiArtist, apiCanva, apiImage } from "./base"
// export default async function uploadImg(FormData, showNotification) {
//     // console.log(FormData, 'formdata dentro de imgapi')
//     apiImage
//         .post("/", FormData, {
//             // withCredentials: true,
//         })
// .then((res) => {
//     console.log(res, 'respuesta del servidor');
//     showNotification({ status: true, message: 'todo okey loco' })
//     //Refresh table in component
// })
// .catch((err) => {
//     console.log('no anda', err);
//     showNotification({ status: true, message: 'todo mal bro, cualquier cosa hiciste' })
// });
//   

// }

export const imgApi = {
    uploadImg: async (formData) => {
        try {
            const response = await apiImage
                .post("/", formData)
            return response

            // console.log(response);
            // if (response.data.status === 200) {
            //     if (user.appRole === 'canva') {
            //         console.log('entro en lienzo');
            //         await apiCanva.post(`/updateImg/:${user._id}`, idImg)
            //     } else {
            //         console.log('entro en artista');
            //         await apiArtist.post(`/updateImg/:${user._id}`, idImg)
            //     }
            // }
        } catch (error) {
            console.log(error);
            return error.response
        }
    },

    uploadInUser: async (user, idImg, description) => {
        try {
            const res = await apiImage.post(`/uploadInUser/${user._id}`, { imageId: idImg, description: description })
            return res
        } catch (error) {
            console.log(error);
        }
    },

    uploadImgProfile: async (user, idImg) => {
        try {
            const res = await apiImage.post(`/updateImgProfile/${user._id}`, { imageId: idImg })
            console.log(res.data.status, 'img.js');
            return res
        } catch (error) {
            console.log(error);
        }
    }
}