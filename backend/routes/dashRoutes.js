const {Router} = require('express')
const router = Router()
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const data = require('../data/data.json');

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
    d.data.forEach(el => {
        if(el.id == req.body.dealStage){
            el.deals.push({id: uuidv4(), name: req.body.dealName, price: Number(req.body.dealPrice)})
            el.dealsSum += Number(req.body.dealPrice)
        }
    });
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
    d.data.push({id: uuidv4(), name: req.body.stageName, deals: [], dealsSum: 0, color: req.body.stageColor})
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