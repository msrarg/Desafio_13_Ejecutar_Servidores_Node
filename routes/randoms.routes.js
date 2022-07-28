const { Router }  = require('express');
const { randoms } = require('../controllers/randoms.controller');

const router = Router();

router.get('/', randoms);

module.exports = router;
