import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://646be9b97b42c06c3b2a916c.mockapi.io/api/v1/usuarios',
  headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
})

async function obtenerUsuarios(){
  try{
    const response = await apiClient.get();
    return response.data;
  } catch(e){
    alert(`${e}`)
  }
}

async function obtenerUsuario(email){
  try{
    const usuarios = await obtenerUsuarios()
    let usuario = usuarios.find(usr => usr.email === email);
    return usuario;
  } catch(e){
    alert(`${e}`)
  }
}

export {obtenerUsuario, obtenerUsuarios}
