import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.5:3333' // é melhor colocar o endereço ip da máquina,
})

export default api;

//json server foi a lib usada para conseguirmos simular a api fake que nem foi usado na trilha de react