import Cookies from 'universal-cookie';

function Datastore() {
  const cookies = new Cookies()
  
  function set(key, value) {
    if (key == 'token') {
      cookies.set(key, value, { path: '/'})
    } else {
      localStorage.setItem(key, value)
    }
  }

  function get(key) {
    if (key == 'token') {
      return cookies.get(key)
    } else {
      return localStorage.getItem(key)
    }
  }

  function clearAll() {
    Object.keys(cookies.getAll()).forEach((cookie) => {
      cookies.remove(cookie)
    })
    localStorage.clear()
  }

  return {
    set,
    get,
    clearAll
  }
}

export default Datastore;