'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();


router.use('/v1/sms', require('./sms'));
router.use('/stats', require('./stats'));


module.exports = router;