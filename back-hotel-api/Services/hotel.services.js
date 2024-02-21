import fs from "fs";
import { NotFoundError } from '../Errors/customErrors.js';

const pathClients = "Json/clients.json";
const pathHotel = "Json/hotel.json";

class HotelsServices {

    async getClients() {
        const data = await fs.promises.readFile(pathClients, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.clients;
    }

    async getClientById(id) {
        const clients = await this.getClients();
        const client = clients.find(client => client.id === Number(id));
        if (!client) {
            throw new NotFoundError(`Client with id ${id} not found`);
        }
        return client;
    }

    async addClient() {
        return "Client added successfully";
    }

    async updateClient() {
        return "Client updated successfully";
    }

    async getRooms() {
        const data = await fs.promises.readFile(pathHotel, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.rooms;
    }

    async reserveRoom(clientId, roomId) {
        const clients = await this.getClients();
        const client = clients.find(client => client.id === Number(clientId));
        if (!client) {
            throw new NotFoundError(`Client with clientId ${clientId} not found`);
        }

        const rooms = await this.getRooms();
        const room = rooms.find(room => room.id === Number(roomId));
        if (!room) {
            throw new NotFoundError(`Room with id ${roomId} not found`);
        }

        return { message: `La chambre ${roomId} est réservé pour le client ${clientId}` };
    }

    async isRoomBookedByClient(roomId, clientId) {
        const rooms = await this.getRooms();
        const room = rooms.find(room => room.id === Number(roomId));
        return room && room.bookedBy === Number(clientId);
    }

    async doCancelBooking(roomId) {
        const rooms = await this.getRooms();
        const room = rooms.find(room => room.id === Number(roomId));
        if (room) {
            room.bookedBy = null;
        }
    }

    async cancelReservation(clientId, roomId) {
        const clients = await this.getClients();
        const client = clients.find(client => client.id === Number(clientId));
        if (!client) {
            throw new NotFoundError(`Client with id ${clientId} not found`);
        }

        const rooms = await this.getRooms();
        const room = rooms.find(room => room.id === Number(roomId));
        if (!room) {
            throw new NotFoundError(`Room with id ${roomId} not found`);
        }

        if (!this.isRoomBookedByClient(roomId, clientId)) {
            throw new NotFoundError(`No booking found for client ${clientId} in room ${roomId}`);
        }

        this.doCancelBooking(roomId, clientId);

        return `La réservation pour le client ${clientId} dans la chambre ${roomId} a été annulée`;
    }
}

export const hotelsService = new HotelsServices();