import express from 'express';
import { hotelController } from '../Controllers/hotel.controller.js';

export const router = express.Router();

router.get('/', hotelController.getClients());
router.get('/:id', hotelController.getClientById());
router.post('/addClients', hotelController.addClient());
router.put('/updateClients', hotelController.updateClient());
router.post('/reserveRoom/:clientId/:roomId', hotelController.reserveRoom());
router.delete('/cancelReservation/:clientId/:roomId', hotelController.cancelReservation());