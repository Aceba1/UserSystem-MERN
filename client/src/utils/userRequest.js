//import axios from 'axios';
const {default: axios} = require('axios');
const baseURL  = 'http://localhost:4000';
const bcrypt = require('bcrypt');

const usernameRegex = /^\w*$/;
const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

const jsonHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
};

module.exports = {
    loginReq: async (form, errorFunc) => {
        const loginURL = `${baseURL}/user/login`

        let reqBody = {};
        for (const input of form) {
            reqBody[input.name] = input.value;
        }

        if (reqBody.email == '' || reqBody.password == '') {
            errorFunc(['Empty Email or Password!']);
            return;
        }

        axios.put(loginURL, { email: reqBody.email, password: await bcrypt.hash(reqBody.password, 10) })
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                if (err) {
                    console.log(err);
                    errorFunc(err);
                }
            });
    },

    regReq: async (form, errorFunc) => {
        const regURL = `${baseURL}/user/register`

        const reqBody = {};
        for (const input of form) {
            reqBody[input.name] = input.value;
        }
        console.log(reqBody);

        const errors = [];
        const {username: u, email: e, password: p, password2: p2} = reqBody;

        if (!usernameRegex.test(u))
            errors.push('Invalid characters in username! ( Valid characters: A-Z a-z 0-9 _ )');

        if (u.length < 3)
            errors.push('Username is too short! ( min: 3 )');

        if (u.length > 20)
            errors.push('Username is too long! ( max: 20 )');

        if (!emailRegex.test(e))
            errors.push('Invalid email!');

        if (p.length < 6)
            errors.push('Password too short! ( min: 6 )');

        if (p.length > 100)
            errors.push('Password too long! ( max: 100)');

        if (p2 !== p)
            errors.push("Passwords don't match!");
        
        if (errors.length !== 0) {
            errorFunc(errors);
            return;
        }
            // const reqData = {
            //     headers: jsonHeaders,
            //     data: JSON.stringify({u, e, p, p2})
            // }
    
            // axios.post(loginURL, reqData)
            // .then( res => {
            //     console.log(res);
            // })
            // .catch( err => {
            //     if (err)
            //         console.log(err)
            // })

        axios.post(regURL, { username: u, email: e, password: await bcrypt.hash(p, 10) })
        .then( res => {
        console.log(res);
        })
        .catch( err => {
        if (err) {
            console.log(err); 
            errorFunc(err);
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