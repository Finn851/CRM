const {Router} = require('express')
const router = Router()
const users = require('../data/users.json');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')


router.get('/users', (req, res) => {
    res.json({users: users})
})

// Функция для создания токена JWT
const generateAccessToken = (user) => {
  const accessToken = jwt.sign(user, 'your_secret_key');
  return accessToken;
};

// ...

router.post('/login', (req, res) => {
    const { name, password } = req.body;
    const user = users.users.find(user => user.name === name && user.password === password);
    let d = users
    if (user) {
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ message: 'Успешный вход', accessToken, userID: user.id });
      user.isAuth = true
      d.users.forEach(el => {
        if(el.id == user.id){
          el = user
        }
      });
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'users.json'),
        JSON.stringify(d),
        (err) => {
          if (err) {
            console.log(err)
          }
        }
      )
    } else {
      res.status(401).json({ message: 'Неверные имя пользователя или пароль'});
    }
});

router.post('/timer', (req, res) => {
  const {time, userID, date} = req.body
  const User = users.users.find(user => user.id === userID);
  User.sessions.unshift({date, time})
  let d = users
  d.users.forEach(el => {
    if(el.id === User.id){
      el = User
    }
  });
  fs.writeFile(
    path.join(__dirname, '..', 'data', 'users.json'),
    JSON.stringify(d),
    (err) => {
      if (err) {
        console.log(err)
      }
    }
  )
})

router.post('/logout', (req,res) => {
  const {userID, isAuth} = req.body
  let d = users
  d.users.forEach(el => {
    if(el.id == userID){
      el.isAuth = isAuth
    }
  });
  fs.writeFile(
    path.join(__dirname, '..', 'data', 'users.json'),
    JSON.stringify(d),
    (err) => {
      if (err) {
        console.log(err)
      }
    }
  )
})

module.exports = router