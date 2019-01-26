import router from '../router'

const axios = require('axios');

const SERVER_URL = process.env.VUE_APP_API_URL;

let intervalID = null;

class AuthService {
  login (email, password) {
    this.setTokenToRefresh();

    return axios.post(
      SERVER_URL + 'auth/login',
      {
        email: email,
        password: password
      }
    );
  }
  register (formData) {
    return axios.post(
      SERVER_URL + 'auth/signup', formData
    );
  }
  recover (formData) {
    return axios.post(
      SERVER_URL + 'auth/recovery?email='+formData.email
    );
  }
  reset (formData) {
    return axios.post(
      SERVER_URL + 'auth/reset', formData
    );
  }
  loginSuccessful (req) {
    localStorage.token = req.data.token;
    router.push({name: 'ranking'});
  }
  registerSuccessful (req) {
    localStorage.token = req.data.token;
    router.push({name: 'ranking'});
  }
  logout () {
    delete localStorage.token;
    router.push({name: 'login'});

    clearInterval(intervalID);
  }
  setTokenToRefresh () {
    intervalID = setInterval(() => {
      const axiosRefresh = axios.create({
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.token
        },
        baseURL: SERVER_URL,
        timeout: 60000,
      });

      axiosRefresh.get('auth/refresh')
      .then((refreshResponse) => {
        localStorage.token = refreshResponse.data.token;
      });
    }, 60000);
  }
}
export default new AuthService();