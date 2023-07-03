const express = require('express');

const router = express.Router();

const { InfoController , TicketController} = require('../../controllers');
router.get('/info', InfoController.info);
router.post('/tickets' ,TicketController.create);

module.exports = router;

