import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://646be9b97b42c06c3b2a916c.mockapi.io/api/v1/usuarios',
  headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
})

export default {
  async obtenerUsuarios(){
    try{
      const response = await apiClient.get();
      return response.data;
    } catch(e){
      alert(`${e}`)
    }
  },
  async obtenerUsuario(email){
    try{
      const response = await apiClient.get();
      usuario = response.data.filter(usr => usr.email === email);
      return usuario;
    } catch(e){
      alert(`${e}`)
    }
  }
}
