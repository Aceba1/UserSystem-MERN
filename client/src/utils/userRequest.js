//import axios from 'axios';
const {default: axios} = require('axios');
const baseURL  = 'https://localhost:4000';


const usernameRegex = /^\w*$/;
const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

const jsonHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
};

module.exports = {
    loginReq: async (form) => {
        const loginURL = `${baseURL}/user/login`

        let reqBody = {};
        for (const input of form) {
            reqBody[input.name] = input.value;
        }
        console.log(reqBody);

        // const reqData = {
        //     //headers: jsonHeaders,
        //     data: JSON.stringify(reqBody)
        // }

//
        const xhr = new XMLHttpRequest();
        xhr.open("GET", loginURL);
        xhr.onload = () => {
            console.log(xhr.responseText);
        };
        xhr.send();


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
    },

    regReq: (form) => {
        const loginURL = `${baseURL}/user/register`

        let reqBody = {};
        for (const input of form) {
            reqBody[input.name] = input.value;
        }
        console.log(reqBody);

        const errors = [];
        const {username: u, email: e, password: p, password2: p2} = reqBody;

        if (!usernameRegex.test(u))
            errors.push('Invalid characters in username!');

        if (u.length < 3)
            errors.push('Username is too short!');

        if (u.length > 20)
            errors.push('Username is too long!');

        if (!emailRegex.test(e))
            errors.push('Invalid email!');

        if (p.length < 6)
            errors.push('Password too short!');

        if (p.length > 100)
            errors.push('Password too long!');

        if (p2 !== p)
            errors.push("Passwords don't match!");
        
        if (errors.length !== 0) {
            console.log(errors);
        }
        else {
            const reqData = {
                headers: jsonHeaders,
                data: JSON.stringify({u, e, p, p2})
            }
    
            axios.post(loginURL, reqData)
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                if (err)
                    console.log(err)
            })

        }
    }
};

