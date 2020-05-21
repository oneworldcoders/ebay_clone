import Cookies from 'universal-cookie';

export default class Datastore {

  constructor(tokenStore=new Cookies(), userDataStore=localStorage) {
    this.tokenStore = tokenStore
    this.userDataStore = userDataStore
  }
  
  set(key, value) {
    if (key == 'token') {
      this.tokenStore.set(key, value, { path: '/'})
    } else {
      this.userDataStore.setItem(key, value)
    }
  }

  get(key) {
    if (key == 'token') {
      return this.tokenStore.get(key)
    } else {
      return this.userDataStore.getItem(key)
    }
  }

  clearAll() {
    this.tokenStore.remove('token')
    this.userDataStore.clear()
  }
}
