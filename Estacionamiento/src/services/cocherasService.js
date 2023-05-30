import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://64727dbf6a9370d5a41b5d0f.mockapi.io/api/v1/cocheras",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

async function obtenerCocheras() {
  try {
    const response = await apiClient.get();
    return response.data;
  } catch (e) {
    alert(`${e}`);
  }
}

async function obtenerCochera(id) {
  try {
    const Cocheras = await obtenerCocheras();
    let cochera = Cocheras.find((cochera) => cochera.id === id);
    return cochera;
  } catch (e) {
    alert(`${e}`);
  }
}

async function cambiarEstadoCochera(estado, cochera) {
  //Verificar que no existsa el usuario
  if (await existeCochera(cochera.id)) {
    //Traducir los nombres de los campos
    //id y fecha son auto generados
    let payload = {
      piso: cochera.piso,
      ocupada: estado,
      numero: cochera.numero,
      id: cochera.id,
    };
    try {
      const response = await apiClient.put(`/${payload.id}`, payload);
      return response;
    } catch (e) {
      console.log(`${e}`);
    }
  }
}

async function existeCochera(id) {
  let usuario = await obtenerCochera(id);
  return usuario !== undefined;
}

async function crearCochera(cochera) {
  //Verificar que no existsa el usuario
  if (!existeCochera(cochera.id)) {
    //Traducir los nombres de los campos
    //id y fecha son auto generados
    let payload = {
      piso: cochera.piso,
      ocupada: cochera.ocupada,
      numero: cochera.numero,
      d: cochera.id,
    };
    try {
      const response = await apiClient.post("", payload);
      return response;
    } catch (e) {
      console.log(`${e}`);
    }
  }
}

export {obtenerCocheras, crearCochera, cambiarEstadoCochera};
