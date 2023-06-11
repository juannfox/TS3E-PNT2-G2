import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://646be9b97b42c06c3b2a916c.mockapi.io/api/v1/usuarios",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

async function obtenerUsuarios() {
  try {
    const response = await apiClient.get();
    return response.data;
  } catch (e) {
    alert(`${e}`);
  }
}

async function obtenerUsuario(email) {
  try {
    const usuarios = await obtenerUsuarios();
    let usuario = usuarios.find((usr) => usr.email === email);
    return usuario;
  } catch (e) {
    alert(`${e}`);
  }
}

async function existeUsuario(email) {
  let usuario = await obtenerUsuario(email);
  return usuario != undefined;
}

async function crearUsuario(usuario) {
  //Verificar que no existsa el usuario
  let usuarioYaExiste = await existeUsuario(usuario.email);
  if (!usuarioYaExiste) {
    //Traducir los nombres de los campos
    //id y fecha son auto generados
    let payload = {
      name: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      rol: usuario.rol,
    };
    try {
      const response = await apiClient.post("", payload);
      return response.status == 201;
    } catch (e) {
      console.log(`${e}`);
    }
  } else {
    console.log(`${usuario.email} ya existe, ignorando...`);
  }
}

async function actualizarUsuario(email, usuarioActualizado) {

  //Verificar que exista el usuario
  let usuarioExistente = await obtenerUsuario(email);
  if (usuarioExistente != undefined) {
    //Traducir los nombres de los campos
    //id y fecha son auto generados
    let payload = {
      name: usuarioActualizado.nombre,
      email: usuarioActualizado.email,
      password: usuarioActualizado.password,
      rol: usuarioActualizado.rol,
    };
    try {
      const response = await apiClient.put(`/${usuarioExistente.id}`, payload);
      return response.status == 200;
    } catch (e) {
      console.log(`${e}`);
    }
  } else {
    throw new Error("Usuario ya existe.")
  }
}

async function eliminarUsuario(email) {
  //Verificar que existsa el usuario
  let usuarioExistente = await obtenerUsuario(email);
  if (usuarioExistente != undefined) {
    try {
      const response = await apiClient.delete(`/${usuarioExistente.id}`);
      return response.status == 201;
    } catch (e) {
      console.log(`${e}`);
    }
  } else {
    console.log(`${email} no existe, no es necesario eliminar.`);
    return true;
  }
}

export {
  obtenerUsuario,
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  existeUsuario
};
