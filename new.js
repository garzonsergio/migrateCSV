import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';


//JSON File must be previously transform from .csv to .json
//Get the data from JSON file
const data = fs.readFileSync('dataFirst.json', 'utf8');
const jsonData = JSON.parse(data);


// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

//Post values in dataBase
export async function postValues(values) {
    const formData = new FormData();

    try {

        formData.append('fecha_hora_registro', values?.fecha_hora_registro);
        formData.append('latitud', values?.latitud);
        formData.append('longitud', values?.longitud);
        formData.append('fecha_hora_inicio', values?.fecha_hora_inicio);
        formData.append('id_camara', values?.id_camara);
        formData.append('zona', values?.zona);
        formData.append('tipo_incendio', values?.tipo_incendio);
        formData.append('image_url', values?.foto); // Ensure this file exists

        //Replace with the url of the API of production
        let url = 'http://127.0.0.1:8000/incendios_operacional/';

        // let url = 'http://192.168.1.60/incendios_operacional/';

        // while (true) {
        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });
        console.log(response.data);
        // break;
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
// }

///To execute the code in each value of the JSON

for (let i = 0; i < jsonData.length; i++) {
    await postValues(jsonData[i])
    console.log(i, ' of ', jsonData.length)
    // await delay(1000);
}




