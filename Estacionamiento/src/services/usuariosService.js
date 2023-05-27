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

async function existeUsuario(email){
  let usuario = await obtenerUsuario(email)
  return usuario != null
}

async function crearUsuario(usuario){
  //Verificar que no existsa el usuario
  if (! existeUsuario()){
    //Traducir los nombres de los campos
    //id y fecha son auto generados
    let payload = {
      name: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      rol: usuario.rol
    }
    try{
      const response = await apiClient.post('', payload);
      return response;
    } catch(e){
      console.log(`${e}`)
    }
  }
}

export {obtenerUsuario, obtenerUsuarios, crearUsuario}
