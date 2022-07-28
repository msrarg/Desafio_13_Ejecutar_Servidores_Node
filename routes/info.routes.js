const { Router } = require('express');
const { info }   = require('../controllers/info.controller');

const router = Router();

router.get('/info', info)

module.exports = router;
