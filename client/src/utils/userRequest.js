//import axios from 'axios';
const {default: axios} = require('axios');
const baseURL  = 'http://localhost:4000';

// Note: We aren't encrypt passwords when sending to the backend!
// Strange, but seems to be common practice. Probably makes sense for local networks.

const usernameRegex = /^\w*$/;
const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

function getBody(form) {
    let Body = {};
    for (const input of form) {
        Body[input.name] = input.value;
    }
    return Body;
}

function getError(err = { validation_error: []}) {
    if (err.validation_error !== undefined) {
        let arr = [];
        for (let i in err.validation_error) 
            arr.push(err.validation_error[i].message)
        return arr;
    }
    
    return [JSON.stringify(err)];
}

module.exports = {
    loginReq: async (form, errorFunc) => {
        const loginURL = `${baseURL}/user/login`

        const reqBody = getBody(form);
        
        if (reqBody.credidential === '' || reqBody.password === '') {
            errorFunc(['Empty Email or Password!']);
            return;
        }

        axios.put(loginURL, { credidential: reqBody.credidential, password: reqBody.password })
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                if (err) {
                    console.log(err);
                    errorFunc();
                }
            });
    },

    regReq: async (form, errorFunc) => {
        const regURL = `${baseURL}/user/register`

        const reqBody = getBody(form);

        const errors = [];
        const {username: u, email: e, password: p, password2: p2} = reqBody;

        if (!usernameRegex.test(u))
            errors.push('Invalid characters in username! ( Valid: A-Z a-z 0-9 _ )');

        if (u.length < 3)
            errors.push('Username is too short! ( Min: 3 )');

        if (u.length > 21)
            errors.push('Username is too long! ( Max: 21 )');

        if (!emailRegex.test(e))
            errors.push('Invalid email!');

        if (p.length < 7)
            errors.push('Password too short! ( Min: 7 )');

        if (p.length > 1000)
            errors.push('Password too long! ( Max: 1000 )');

        if (p2 !== p)
            errors.push("Passwords don't match!");
        
        if (errors.length !== 0) {
            errorFunc(errors);
            return;
        }

        axios.post(regURL, { username: u, email: e, password: p })
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                if (err) {
                    console.log(err); 
                    errorFunc(getError(err));
                }
            })
    }
};



        // const response = await fetch(loginURL, {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: ''//JSON.stringify(reqBody)
        // });
        //console.log(response.json());
        
        // axios.post(loginURL, reqBody)
        // .then( res => {
        //     console.log(res);
        // })
        // .catch( err => {
        //     if (err)
        //         console.log(err)
        // })
        
        // const xhr = new XMLHttpRequest();
        // xhr.open("GET", loginURL);
        // xhr.onload = () => {
        //     console.log(xhr.responseText);
        // };
        // xhr.send();