import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export async function getCamaras() {
    try {
      const res = await fetch(`${process.env.VITE_CAMARAS_URL}`);
      if (!res.ok) {
        throw new Error('No fue posible acceder a las cámaras');
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
        throw new Error('No fue posible acceder a las zonas');
      }
      return res.json();
    } catch (error) {
      console.error("Error al acceder a las zonas del Valle de Aburrá", error)
      return { error: "Falló la conexión a las zonas del Valle de Aburrá" }
    }
  }