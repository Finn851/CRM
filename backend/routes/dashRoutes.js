const {Router} = require('express')
const router = Router()
const data = require('../data/data.json');
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const users = require('../data/users.json')

router.get('/api', async (req, res) => {
    res.json({data: data})
});

router.post("/", async (req, res) => {
    const stages = JSON.parse(req.body.data)
    const funnelID = req.body.funnelID
    let d = data
    d.data.forEach(el => {
        if(el.funnelID === funnelID){
            el.funnel = stages
        }
    });

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

router.post("/postDeal", (req, res) => {
    let d = data
    let u = users
    const funnelID = req.body.funnelID
    const timeParts = req.body.stageNotificationDate.split(' ')
    d.data.forEach(el => {
        if (el.funnelID === funnelID){
            el.funnel.forEach(e => {
                if(e.id == req.body.dealStage){
                    e.deals.push({id: uuidv4(), name: req.body.dealName, price: Number(req.body.dealPrice)})
                    e.dealsSum += Number(req.body.dealPrice)
                }
            })
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
    let d = data
    let u = users
    const funnelID = req.body.funnelID
    const timeParts = req.body.stageNotificationDate.split(' ')
    d.data.forEach(el => {
        if(el.funnelID === funnelID){
            el.funnel.push({id: uuidv4(), name: req.body.stageName, deals: [], dealsSum: 0, color: req.body.stageColor})
        }
    });
    u.users.forEach(el => {
        if(el.id === req.body.userID){
            el.notifications.unshift({notificationText: req.body.stageNotificationText, time: timeParts[0], date: timeParts[1]})
        }
    });
    fs.writeFile(
        path.join(__dirname, '..', 'data', 'data.json'),
        JSON.stringify(d),
        (err) => {
            if (err) {
                console.log(err)
            }
        }
    )
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