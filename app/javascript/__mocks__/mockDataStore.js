export class MockTokenStore {

  constructor(store = {}) {
    this.store = store
  }

  set(key, value) {
    this.store[key] = value
  }

  get(key) {
    return this.store[key]
  }

  remove(key) {
    this.store = {}
  }
}

export class MockUserDataStore {

  constructor(store = {}) {
    this.store = store
  }

  setItem(key, value) {
    this.store[key] = value
  }

  getItem(key) {
    return this.store[key]
  }

  clear() {
    this.store = {}
  }
}


