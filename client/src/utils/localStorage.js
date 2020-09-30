module.exports = {
  /**
   * @param {string} key ID of value
   * @param {any} initial Initial value, if not defined
   * @returns {initial} Same type as initial
   */
  get: (key, initial) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return initial;
  },
  /**
   * @param {string} key ID of value
   * @param {any} value The new value
   */
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
} 