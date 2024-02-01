import express from 'express';
import { clientController } from '../Controllers/client.controller.js';

export const router = express.Router();

router.get('/hotelInfo', clientController.getHotelInfo());
router.get('/rooms', clientController.getAllRooms());
router.get('/rooms/:id', clientController.getRoomById());
router.post('/reserveRoom/:clientId/:roomId', clientController.reserveRoom());
router.delete('/cancelRoom/:clientId/:roomId', clientController.cancelReservation());