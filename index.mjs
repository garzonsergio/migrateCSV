import fetch from "node-fetch";
import dotenv from "dotenv";
import { getCamaras, getZonas } from "./services.js";

dotenv.config();

const camaras = async () => await getCamaras();
const zonas = async () => await getZonas();
camaras().then(console.log).catch(console.error);


