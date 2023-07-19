const {Router} = require('express')
const router = Router()
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const users = require('../data/users.json')

router.post("/postDeal", (req, res) => {
    let u = users
    const timeParts = req.body.stageNotificationDate.split(' ')
    u.users.forEach(el => {
        if(el.id === req.body.userID){
            el.notifications.unshift({notificationText: req.body.stageNotificationText, time: timeParts[0], date: timeParts[1]})
        }
    });
    fs.writeFile(
        path.join(__dirname, '..', 'data', 'users.json'),
        JSON.stringify(u),
        (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        }
    )
    res.json({ message: 'Форма успешно отправлена' });
});

router.post("/postStage", (req, res) => {
    let u = users
    const timeParts = req.body.stageNotificationDate.split(' ')
    u.users.forEach(el => {
        if(el.id === req.body.userID){
            el.notifications.unshift({notificationText: req.body.stageNotificationText, time: timeParts[0], date: timeParts[1]})
        }
    });
    fs.writeFile(
        path.join(__dirname, '..', 'data', 'users.json'),
        JSON.stringify(u),
        (err) => {
            if (err) {
                console.log(err)
            }
        }
    )
    res.json({ message: 'Форма успешно отправлена' });
});

module.exports = router