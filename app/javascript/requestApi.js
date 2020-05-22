export default class RequestApi {

  // find out more about window.fetch.bind(window)
  constructor(url, method, fetchApi=window.fetch) {
    // this.fetchApi = window.fetch.bind(window)
    this.url = url;
    this.params = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  unAuthenticatedRequest(data) {
    this.params.body = JSON.stringify(data);
    return this.makeRequest(this.url, this.params)
  }

  authenticatedRequest(token) {
    this.params.headers.Authorization = `Bearer ${token}`;
    return this.makeRequest(this.url, this.params)
  }

  makeRequest(url, params) {
    return fetch(url, params)
      .then(response => response.json())
      .then((json) => {
        return json
      })
      .catch((error) => {
        return { unauthenticated: 'You need to be logged in' }
      })
  }
}
