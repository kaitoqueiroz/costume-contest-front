import AuthService from './AuthService'

const axios = require('axios');

const SERVER_URL = process.env.VUE_APP_API_URL;

class RequestService {
  constructor () {
    this.axios = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.token
      },
      baseURL: SERVER_URL,
      timeout: 60000,
    });

    this.axios.interceptors.response.use(
      this.responseHandler,
      this.errorResponseHandler
    );

    return this.axios;
  }
  getAuthorization () {
    return 'Bearer ' + localStorage.token;
  }
  responseHandler (response) {
    return response;
  }
  errorResponseHandler (err) {
    if(err.response.status === 401){
      AuthService.logout();
    }
  }
}

export default RequestService;