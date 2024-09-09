1import dotenv from "dotenv";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import axios from 'axios';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export async function getCamaras() {
  try {
    const res = await fetch(`${process.env.VITE_CAMARAS_URL}`);
    if (!res.ok) {
      throw new Error("No fue posible acceder a las cámaras");
    }
    return res.json();
  } catch (error) {
    console.error("Error al acceder a las cámaras", error);
    return { error: "Falló la conexión a las cámaras" };
  }
}

export async function getZonas() {
  try {
    const res = await fetch(`${process.env.VITE_ZONAS_URL}`);
    if (!res.ok) {
      throw new Error("No fue posible acceder a las zonas");
    }
    return res.json();
  } catch (error) {
    console.error("Error al acceder a las zonas del Valle de Aburrá", error);
    return { error: "Falló la conexión a las zonas del Valle de Aburrá" };
  }
}

export async function postValues(values) {
  const formData = new FormData();

  formData.append('fecha_hora_registro', new Date());
  formData.append('latitud', values?.latitud);
  formData.append('longitud', values?.longitud);
  formData.append('fecha_hora_inicio', values?.fecha_hora_inicio);
  formData.append('id_camara', values?.id_camara);
  formData.append('zona', values?.zona);
  formData.append('tipo_incendio', 'mediano');
  formData.append('foto', fs.createReadStream('./6.135.jpeg'));

  let url = 'http://127.0.0.1:8000/incendios_operacional/';

    try {
        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });
        console.log(response.data);
    } catch (err) {
        console.error('error:', err.response ? err.response.data : err.message);
    }
}

 postValues();