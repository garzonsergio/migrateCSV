import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';


//downloadImage function and become a blob
export async function downloadImage(url) {
    try {
        // const response = await axios.get(url, { responseType: 'blob' });
        const response = await axios.get(url, { responseType: 'arrayBuffer' });
        console.log("Image downloaded successfully");
        return response?.data;
    } catch (error) {
        console.error("Error downloading the image:", error);
    }
}

export async function postValues(values) {
    const formData = new FormData();


    try {

        // let blob = await downloadImage(values?.foto)
        let imageBuffer = await downloadImage(values?.foto);
        const buffer = Buffer.from(imageBuffer);

      
        formData.append('fecha_hora_registro', values?.fecha_hora_registro);
        formData.append('latitud', values?.latitud);
        formData.append('longitud', values?.longitud);
        formData.append('fecha_hora_inicio', values?.fecha_hora_inicio);
        formData.append('id_camara', values?.id_camara);
        formData.append('zona', values?.zona);
        formData.append('tipo_incendio', values?.tipo_incendio);
        // formData.append('foto', blob); // Ensure this file exists
        formData.append('foto', buffer,{
            filename:`${values?.foto}`,
            contentType:'image/jpeg'
        })

        let url = 'http://127.0.0.1:8000/incendios_operacional/';

        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });
        console.log(response.data);
    } catch (err) {
        if (err.response) {
            console.error('Error en la respuesta:', err.response.data);
        } else if (err.request) {
            console.error('No se recibió respuesta del servidor:', err.request);
        } else {
            console.error('Error al configurar la solicitud:', err.message);
        }
    }
}




