import fs from "fs";
import csv from "csv-parser";

const urlImages =
  "https://siata.gov.co/hidrologia/incendios_forestales/fotos_incendios/";

fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (row) => {
    
    //Download Image
    const imageBase64 = row.foto ? `${urlImages}${row?.foto}` : null;

    const newRow = {
      fecha_hora_registro: new Date(),
      latitud: row?.lat,
      longitud: row?.lon,
      fecha_hora_inicio: row?.date,
      foto: imageBase64,
      id_camara: row?.camara, //Must be sent the ID
      zona: row?.municipio,
    };
    console.log(newRow);
  })
  .on("end", () => {
    console.log("csv file processed");
  });

/* {
    "fecha_hora_registro": [
      "This field is required."
    ],
    "latitud": [
      "This field is required."
    ],
    "longitud": [
      "This field is required."
    ],
    "fecha_hora_inicio": [
      "This field is required."
    ]
  }
*/
