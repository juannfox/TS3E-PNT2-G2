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
  }
}
