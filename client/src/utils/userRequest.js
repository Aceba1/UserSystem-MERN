//import axios from 'axios';
//const {default: axios} = require('axios');
const baseURL  = 'http://localhost:4000';

// Note: We aren't encrypt passwords when sending to the backend!
// Strange, but seems to be common practice. Probably makes sense for local networks.

const usernameRegex = /^\w*$/;
const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

// function getBody(form) {
//   let Body = {};
//   for (const input of form) {
//     Body[input.name] = input.value;
//   }
//   return Body;
// }

module.exports = {
  getError: (err = { validation_error: [], message: "" }) => {
    if (err.validation_error !== undefined) {
      let arr = [];
      for (let i in err.validation_error) 
        arr.push(err.validation_error[i].message)
      return arr.join('\n');
    }
    if (err.message !== undefined)
      return err.message;
    return JSON.stringify(err);
  },

  login: {
    endpoint: baseURL + '/user/login',
    method: 'PUT',
    validation: (data) => {
      const failedValues = [];
      for (const key in data) {
        const val = data[key].trim();
        if (val && val !== '') {
          switch (key) {
            case 'credidential': {
              if (!emailRegex.test(val)) { // Not an email
                if (!usernameRegex.test(val)) failedValues.push({key: 'credidential', error: 'Invalid characters! ( Valid: A-Z a-z 0-9 _ )'});
                if (val.length < 3) failedValues.push({key: 'credidential', error: 'Too short! ( Min: 3 )'});
                if (val.length > 21) failedValues.push({key: 'credidential', error: 'Too long! ( Max: 21 )'});
              }
              break;
            }
            case 'password': {
              if (val.length < 7) failedValues.push({key: 'password', error: 'Too short! ( Min: 7 )'});
              if (val.length > 1000) failedValues.push({key: 'password', error: 'Too long! ( Max: 1000 )'});
            }
          }
        }
      }
      if (failedValues.length !== 0) {
        const errObj = {};
        failedValues.forEach(err => {
          if (errObj.hasOwnProperty(err.key))
            errObj[err.key] = `${errObj[err.key]}\n${err.error}`
          else
            errObj[err.key] = err.error;
        });
        return errObj;
      }
      return false;
    }
  },
  register: {
    endpoint: baseURL + '/user/register',
    method: 'POST',
    validation: (data) => {
      return false
    }
  }
}

// function validation(data) {
//   const failedValues = [];
//   for (const key in data) {
//     const val = data[key].trim();
//     if (val && val !== '') {
//       switch (key) {
//         case 'credidential': {
//           if (!emailRegex.test(val)) {

//           }
//           break;
//         }
//         case 'password': {
//           if (val.length < 7) failedValues.push({key: 'password', error: 'Password needs to be at least 7 characters'});
//         }
//       }
//     }
//   }
//   if (failedValues !== 0) {
//     const errObj = {};
//     failedValues.forEach(err => {
//       if (errObj.hasOwnProperty(err.key))
//         errObj[err.key] = `${errObj[err.key]}\n${err.error}`
//       else  
//     })
//   }
// }

// function getError(err = { validation_error: [], message: "" }) {
//   if (err.validation_error !== undefined) {
//     let arr = [];
//     for (let i in err.validation_error) 
//       arr.push(err.validation_error[i].message)
//     return arr;
//   }

//   if (err.message !== undefined)
//     return [err.message];
  
//   return [JSON.stringify(err)];
// }

// module.exports = {
//   loginReq: async (reqBody, errorFunc) => {
//     const loginURL = `${baseURL}/user/login`

//     //const reqBody = getBody(form);
    
//     if (reqBody.credidential === '' || reqBody.password === '') {
//       errorFunc(['Empty Email or Password!']);
//       return;
//     }

//     axios.put(loginURL, { credidential: reqBody.credidential, password: reqBody.password })
//       .then( res => {
//         if (res.status === 200) {
//           // Do something when login succeeds

//           // By keeping in localStorage, programmer needs to add token to requests
//           // Contrary to cookies, which is added to every server request
//           localStorage.setItem("token", res.data.token); // Move to Cookies! (Add expiration as well)
//           localStorage.setItem("user", res.data.user);
//           console.log(res.data);
//           window.location.pathname = '/';
//         }
//       })
//       .catch( err => {
//         if (err) {
          
//           if (err.response) {
//             console.log(err.response.data);
//             errorFunc(getError(err.response.data));
//           }
//           else {
//             console.log(err);
//             errorFunc([err.message]);
//           }
//         }
//       });
//   },

//   regReq: async (reqBody, errorFunc, history) => {
//     const regURL = `${baseURL}/user/register`

//     //const reqBody = getBody(form);

//     const errors = [];
//     const {username: u, email: e, password: p, password2: p2} = reqBody;

//     if (!usernameRegex.test(u))
//       errors.push('Invalid characters in username! ( Valid: A-Z a-z 0-9 _ )');

//     if (u.length < 3)
//       errors.push('Username is too short! ( Min: 3 )');

//     if (u.length > 21)
//       errors.push('Username is too long! ( Max: 21 )');

//     if (!emailRegex.test(e))
//       errors.push('Invalid email!');

//     if (p.length < 7)
//       errors.push('Password too short! ( Min: 7 )');

//     if (p.length > 1000)
//       errors.push('Password too long! ( Max: 1000 )');

//     if (p2 !== p)
//       errors.push("Passwords don't match!");
    
//     if (errors.length !== 0) {
//       errorFunc(errors);
//       return;
//     }
    
//     errorFunc(undefined);

//     axios.post(regURL, { username: u, email: e, password: p })
//       .then( res => {
//         if (res.status === 201) {
//           // Do something when login succeeds
//           localStorage.setItem("token", res.data.token); // Move to Cookies!
//           localStorage.setItem("user", res.data.user);
//           console.log(res.data);
//           window.location.pathname = '/';
//         }
//       })
//       .catch( err => {
//         if (err) {
//           if (err.response) {
//             console.log(err.response.data)
//             errorFunc(getError(err.response.data));
//           }
//           else {
//             console.log(err); 
//             errorFunc(getError(err.message));
//           }
//         }
//       })
//   }
// };



//     // const response = await fetch(loginURL, {
//     //   method: "POST",
//     //   mode: "cors",
//     //   headers: {
//     //     "Content-Type": "application/json"
//     //   },
//     //   body: ''//JSON.stringify(reqBody)
//     // });
//     //console.log(response.json());
    
//     // axios.post(loginURL, reqBody)
//     // .then( res => {
//     //   console.log(res);
//     // })
//     // .catch( err => {
//     //   if (err)
//     //     console.log(err)
//     // })
    
//     // const xhr = new XMLHttpRequest();
//     // xhr.open("GET", loginURL);
//     // xhr.onload = () => {
//     //   console.log(xhr.responseText);
//     // };
//     // xhr.send();