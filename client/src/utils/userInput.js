module.exports = {
  login: [
    {name: 'credidential', ph: 'Enter Username/Email', type: 'text', save: true},
    {name: 'password', ph: 'Enter Password', type: 'password'}
  ],
  register: [
    {name: 'username', ph: 'Enter Username', type: 'text', save: true},
    {name: 'email', ph: 'Enter Email', type: 'text', save: true},
    {name: 'password', ph: 'Enter Password', type: 'password'},
    {name: 'password2', ph: 'Re-enter Password', type: 'password'}
  ]
}