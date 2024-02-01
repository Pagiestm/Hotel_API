import { hotelsService } from '../Services/hotel.services.js';

class HotelController {

    getClients() {
        return async (req, res) => {
            const clientsFromServices = await hotelsService.getClients();
            res.status(200).send(clientsFromServices);
        }
    }

    getClientById() {
        return async (req, res) => {
            try {
                const client = await hotelsService.getClientById(req.params.id);
                res.send(client);
            } catch (error) {
                res.status(404).send({ message: error.message });
            }
        }
    }

    addClient() {
        return async (req, res) => {
            const client = req.body;
            const message = await hotelsService.addClient(client);
            res.status(201).send({ message });
        }
    }

    updateClient() {
        return async (req, res) => {
            const client = req.body;
            const message = await hotelsService.updateClient(client);
            res.status(201).send({ message });
        }
    }

    reserveRoom() {
        return async (req, res) => {
            const { clientId, roomId } = req.params;
            try {
                const result = await hotelsService.reserveRoom(clientId, roomId);
                if (result.error) {
                    res.status(404).send({ error: result.error });
                } else {
                    res.status(201).send({ message: result.message });
                }
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'An error occurred while booking the room' });
            }
        }
    }

    cancelReservation() {
        return async (req, res) => {
            const { clientId, roomId } = req.params;
            try {
                const message = await hotelsService.cancelReservation(clientId, roomId);
                res.status(200).send({ message });
            } catch (error) {
                if (error.message.includes('not found')) {
                    res.status(404).send({ error: error.message });
                } else {
                    res.status(500).send({ error: 'An error occurred while cancelling the booking' });
                }
            }
        }
    }
}

export const hotelController = new HotelController();