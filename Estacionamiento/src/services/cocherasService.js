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

async function obtenerCochera(piso, numero) {
  try {
    const Cocheras = await obtenerCocheras();
    let cochera = Cocheras.find(
      (cochera) => cochera.piso === piso && cochera.numero === numero
    );
    return cochera;
  } catch (e) {
    alert(`${e}`);
  }
}

async function cambiarEstadoCochera(estado, cochera) {
  //Verificar que no existsa el usuario
  if (await existeCochera(cochera.piso, cochera.numero)) {
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

async function existeCochera(piso, numero) {
  let cochera = await obtenerCochera(piso, numero);
  return cochera !== undefined;
}

async function crearCochera(cochera) {
  //Verificar que no existsa el usuario
  if (!(await existeCochera(cochera.piso, cochera.numero))) {
    //Traducir los nombres de los campos
    //id y fecha son auto generados
    let payload = {
      piso: cochera.piso,
      ocupada: cochera.ocupada,
      numero: cochera.numero,
      id: cochera.id,
    };
    try {
      const response = await apiClient.post("", payload);
      return true;
    } catch (e) {
      console.log(`${e}`);
    }
  }
  return false;
}

async function BorrarCochera(cochera) {
  //Verificar que no existsa el usuario
  if (await existeCochera(cochera.piso, cochera.numero)) {
    try {
      await apiClient.delete(`/${cochera.id}`);
      return true;
    } catch (e) {
      console.log(`${e}`);
    }
  } else {
    return false;
  }
}

export {obtenerCocheras, crearCochera, cambiarEstadoCochera, BorrarCochera};
