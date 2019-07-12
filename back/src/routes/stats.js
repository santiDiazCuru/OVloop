const express = require('express');
const router = express.Router();
const Message = require('../../db/models/message');


router.get('/general', function (req, res) {
    Message.find({}).then((msgs) => {
        res.send(msgs)
    })
})

router.post('/general', function (req, res) {
    // console.log(req.body,'soy req.bodyyyyyyy y req.gato')
    if (req.body.from) {
        Message.find({
            date: {
                $gte: req.body.from,
                $lt: req.body.to
            }
        }).then((msgs) => {
            res.send(msgs)
        })
    } else {
        Message.find({}).then((msgs) => {
            res.send(msgs)
        })
    }

})





// router.get('/status', function (req, res) {

//     if (req.body.from) {
//         Message.find({
//             status: req.body.status,
//             date: {
//                 $gte: req.body.from,
//                 $lt: req.body.to
//             }
//         }).then((msgs) => res.send(msgs))
//     } else {
//         Message.find({status: req.body.status}).then((msgs) => res.send(msgs))
//     }
// })
// router.get('/channel', function (req, res) {

//     if (req.body.from) {
//         Message.find({
//             status: req.body.status,
//             date: {
//                 $gte: req.body.from,
//                 $lt: req.body.to
//             }
//         }).then((msgs) => res.send(msgs))
//     } else {
//         Message.find({status: req.body.status}).then((msgs) => res.send(msgs))
//     }
// })

module.exports = router