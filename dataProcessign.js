import fs from "fs";
import csv from "csv-parser";
import fetch from "node-fetch";
import path from "path";


import { postValues} from "./new.js";

const urlImages =
  "https://siata.gov.co/hidrologia/incendios_forestales/fotos_incendios/";

//   const camaras = async () => await getCamaras();
const zonas = [
  { id: 1, descripcion: "Medellín Occidente" },
  { id: 2, descripcion: "Medellín Zona Urbana" },
  { id: 3, descripcion: "Santa Elena" },
  { id: 4, descripcion: "Barbosa" },
  { id: 5, descripcion: "Bello" },
  { id: 6, descripcion: "Caldas" },
  { id: 7, descripcion: "Copacabana" },
  { id: 8, descripcion: "Envigado" },
  { id: 9, descripcion: "Girardota" },
  { id: 10, descripcion: "Itagüi" },
  { id: 11, descripcion: "La Estrella" },
  { id: 12, descripcion: "Sabaneta" },
];

const camaras = [
  { id: 1, descripcion: "Térmica Bello" },
  { id: 2, descripcion: "Bello 360" },
  { id: 3, descripcion: "Girardota 360" },
  { id: 4, descripcion: "Térmica Girardota" },
  { id: 5, descripcion: "Tasajera 360" },
  { id: 6, descripcion: "Térmica Tasajera" },
  { id: 7, descripcion: "Térmica Ciudadela La Vida" },
  { id: 8, descripcion: "Ciudadela La Vida 360" },
  { id: 9, descripcion: "Térmica Itagüí" },
  { id: 10, descripcion: "Itagüí 360" },
  { id: 11, descripcion: "Térmica EAFIT" },
  { id: 12, descripcion: "EAFIT 360" },
  { id: 13, descripcion: "Térmica Torre SIATA" },
  { id: 14, descripcion: "Torre SIATA 360" },
  { id: 15, descripcion: "Térmica Aeroparque" },
  { id: 16, descripcion: "Aeroparque 360" },
  { id: 17, descripcion: "Térmica AMVA" },
  { id: 18, descripcion: "AMVA 360" },
  { id: 19, descripcion: "Bomberos San Antonio de Prado 1" },
  { id: 20, descripcion: "Bomberos San Antonio de Prado 2" },
  { id: 21, descripcion: "Térmica Parque 3 Aguas" },
  { id: 22, descripcion: "Térmica CC Viva Envigado (Hacia Envigado)" },
  { id: 23, descripcion: "Viva Envigado Visible (Hacia Envigado)" },
  { id: 24, descripcion: "Térmica Viva Envigado (Hacia Itagüi)" },
  { id: 25, descripcion: "Viva Envigado Visible (Hacia Itagüi)" },
  { id: 26, descripcion: "Colegio Lusitania Visible" },
  { id: 27, descripcion: "Térmica Colegio Lusitania" },
  { id: 28, descripcion: "Térmica Tres Cruces" },
  { id: 29, descripcion: "Tres Cruces Visible" },
  { id: 30, descripcion: "Parque 3 Aguas Noroccidente Visible" },
  { id: 31, descripcion: "Parque 3 Aguas Suroccidente Visible" },
  { id: 32, descripcion: "Termica Parque 3 Aguas Suroccidente " },
  { id: 33, descripcion: "Termica Parque 3 Aguas Noroccidente " },
  { id: 34, descripcion: "Térmica Parque de las Aguas Sur" },
  { id: 35, descripcion: "Parque de las Aguas Sur Visible" },
  { id: 36, descripcion: "Térmica Parque de las Aguas Norte" },
  { id: 37, descripcion: "Parque de las Aguas Norte Visible" },
  { id: 38, descripcion: "La Estrella" },
  { id: 39, descripcion: "Copacabana 1" },
  { id: 40, descripcion: "Copacabana 2" },
  { id: 41, descripcion: "Girardota Norte" },
  { id: 42, descripcion: "Girardota Sur" },
  { id: 43, descripcion: "Parque de las Aguas Sur" },
  { id: 44, descripcion: "Parque de las Aguas Norte" },
  { id: 45, descripcion: "Megacolegio Paris" },
  { id: 46, descripcion: "Nueva Alcaldía La Estrella" },
  { id: 47, descripcion: "Sabaneta" },
  { id: 48, descripcion: "AMVA" },
  { id: 49, descripcion: "Celular operacional" },
  { id: 50, descripcion: "Otro" },
];

// Function to normalize strings by removing diacritics
function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

async function downloadImage(url, filepath) {
  try {
    // Step 4: Use fetch to fetch the image data
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`);

    // Step 5: Write the image data to a file using fs
    const fileStream = fs.createWriteStream(filepath);
    response.body.pipe(fileStream);

    fileStream.on("finish", () => {
      console.log("Image downloaded successfully");
    });
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
}

async function processCsvData() {
  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", async (row) => {
   
      const imageUrl = `${urlImages}${row.foto}`;
      const outputPath = `./${row.foto}`;

      // Array to send
      const arrayToPost = {
        fecha_hora_registro: new Date(),
        latitud: row?.lat,
        longitud: row?.lon,
        fecha_hora_inicio: row?.date,
        foto: imageUrl,
        id_camara: camaras.find((camara) => normalizeString(camara.descripcion) === normalizeString(row?.camara))?.id, //Must be sent the ID
        zona: zonas.find((zona) => normalizeString(zona.descripcion) === normalizeString(row?.municipio))?.id, //Must be sent the ID
      };

     
      try {
        // Ensure the image is downloaded before proceeding
           
        console.log("Image downloaded successfully");
        // // Post the values after the image is downloaded
        const response = await postValues(arrayToPost);
        console.log("🚀 ~ .on ~ response:", response)

      } catch (error) {
        console.error("Error downloading the image or posting values:", error);
      }
    })
    .on("end", () => {

      console.log('CSV file processed and JSON file created');
    });
}


await processCsvData();
