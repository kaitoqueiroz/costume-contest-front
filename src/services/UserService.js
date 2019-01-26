import RequestService from './RequestService'

class UserService {
  voteAndGetNext (data) {
    const requestService = new RequestService();
    return requestService.post('vote-and-get-next', data);
  }
  getNext () {
    const requestService = new RequestService();
    return requestService.get('get-next');
  }
  getRanking () {
    const requestService = new RequestService();
    return requestService.get('ranking');
  }
  profile () {
    const requestService = new RequestService();
    return requestService.get('me');
  }
  update (data) {
    const requestService = new RequestService();
    return requestService.post('update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
}
export default new UserService();