import { clientsService } from '../Services/client.services.js';

class ClientController {

    getHotelInfo() {
        return async (req, res) => {
            try {
                const hotelInfo = await clientsService.getHotelInfo();
                res.status(200).send(hotelInfo);
            } catch (error) {
                res.status(500).send({ error: 'An error occurred while getting hotel info' });
            }
        }
    }

    getAllRooms() {
        return async (req, res) => {
            try {
                const rooms = await clientsService.getAllRooms();
                res.status(200).send(rooms);
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'An error occurred while getting rooms' });
            }
        }
    }

    getRoomById() {
        return async (req, res) => {
            try {
                const roomId = parseInt(req.params.id);
                const room = await clientsService.getRoomById(roomId);
                res.status(200).send(room);
            } catch (error) {
                console.error(error);
                if (error.message.startsWith('No room found')) {
                    res.status(404).send({ error: 'Room not found' });
                } else {
                    res.status(500).send({ error: 'An error occurred while getting room info' });
                }
            }
        }
    }

    reserveRoom() {
        return async (req, res) => {
            try {
                const clientId = parseInt(req.params.clientId);
                const roomId = parseInt(req.params.roomId);
                await clientsService.reserveRoom(clientId, roomId);
                res.status(200).send({ message: `Room ${roomId} reserved by client ${clientId}` });
            } catch (error) {
                console.error(error);
                if (error.message.startsWith('No room found')) {
                    res.status(404).send({ error: 'Room not found' });
                } else if (error.message.startsWith('No client found')) {
                    res.status(404).send({ error: 'Client not found' });
                } else if (error.message.startsWith('Room is already reserved')) {
                    res.status(400).send({ error: 'Room is already reserved' });
                } else {
                    res.status(500).send({ error: 'An error occurred while reserving the room' });
                }
            }
        }
    }

    cancelReservation() {
        return async (req, res) => {
            try {
                const clientId = parseInt(req.params.clientId);
                const roomId = parseInt(req.params.roomId);
                await clientsService.cancelReservation(clientId, roomId);
                res.status(200).send({ message: `Reservation for room ${roomId} cancelled by client ${clientId}` });
            } catch (error) {
                console.error(error);
                if (error.message.startsWith('No room found')) {
                    res.status(404).send({ error: 'Room not found' });
                } else if (error.message.startsWith('No client found')) {
                    res.status(404).send({ error: 'Client not found' });
                } else if (error.message.startsWith('Room is not reserved')) {
                    res.status(400).send({ error: 'Room is not reserved' });
                } else {
                    res.status(500).send({ error: 'An error occurred while cancelling the reservation' });
                }
            }
        }
    }
}

export const clientController = new ClientController();