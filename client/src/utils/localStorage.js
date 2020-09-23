const storageAccess = {
  get: (key, initial) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return initial;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
} 
export default storageAccess;