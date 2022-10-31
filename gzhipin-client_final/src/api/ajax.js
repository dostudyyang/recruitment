/*
this function module that can send ajax requests
The return value of the function is a promise object
 */
import axios from 'axios'
const baseUrl = ''
// const baseUrl = 'http://localhost:4000'
export default function ajax(url, data={}, type='GET') {
  url = baseUrl + url
  if(type==='GET') { // send GET request
    // Concatenated request string
    // data: {username: tom, password: 123}
    // paramStr: username=tom&password=123
    let paramStr = ''
    Object.keys(data).forEach(key => {
      paramStr += key + '=' + data[key] + '&'
    })
    if(paramStr) {
      paramStr = paramStr.substring(0, paramStr.length-1)
    }
    // use axios send get request
    return axios.get(url + '?' + paramStr)
  } else {// send post request
    // use axios send post request
    return axios.post(url, data)
  }
}
