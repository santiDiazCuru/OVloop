'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();

const version = 'v1'

router.use(`/${version}/sms`, require('./sms'));
router.use('/stats', require('./stats'));


module.exports = router;