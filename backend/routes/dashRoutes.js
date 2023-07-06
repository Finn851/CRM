const {Router} = require('express')
const router = Router()
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const data = require('../data/data.json');
const users = require('../data/users.json')

router.get('/api', (req, res) => {
    res.json({data: data})
});

router.post("/", async (req, res) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.join(__dirname, '..', 'data', 'data.json'),
            JSON.stringify(req.body),
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
});

router.post("/postDeal", (req, res) => {
    d = data
    u = users
    const timeParts = req.body.stageNotificationDate.split(' ')
    d.data.forEach(el => {
        if(el.id == req.body.dealStage){
            el.deals.push({id: uuidv4(), name: req.body.dealName, price: Number(req.body.dealPrice)})
            el.dealsSum += Number(req.body.dealPrice)
        }
    });
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
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.join(__dirname, '..', 'data', 'data.json'),
            JSON.stringify(d),
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
});

router.post("/postStage", (req, res) => {
    d = data
    u = users
    const timeParts = req.body.stageNotificationDate.split(' ')
    d.data.push({id: uuidv4(), name: req.body.stageName, deals: [], dealsSum: 0, color: req.body.stageColor})
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
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.join(__dirname, '..', 'data', 'data.json'),
            JSON.stringify(d),
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
});

module.exports = router