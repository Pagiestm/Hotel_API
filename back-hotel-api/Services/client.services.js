import fs from "fs";
import { NotFoundError, AlreadyReservedError } from '../Errors/customErrors.js';

const pathClients = "Json/clients.json";
const pathHotel = "Json/hotel.json";

class ClientsServices {

    async getHotelInfo() {
        const data = await fs.promises.readFile(pathHotel, 'utf8');
        return JSON.parse(data);
    }

    async getAllRooms() {
        const hotelInfo = await this.getHotelInfo();
        return hotelInfo.rooms;
    }

    async getRoomById(roomId) {
        const rooms = await this.getAllRooms();
        const room = rooms.find(room => room.id === roomId);
        if (!room) {
            throw new NotFoundError(`No room found with id ${roomId}`);
        }
        return room;
    }

    async getClients() {
        const data = await fs.promises.readFile(pathClients, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.clients;
    }

    async getClientById(clientId) {
        const clients = await this.getClients();
        const client = clients.find(client => client.id === clientId);
        if (!client) {
            throw new NotFoundError(`No client found with id ${clientId}`);
        }
        return client;
    }

    async reserveRoom(clientId, roomId) {
        const client = await this.getClientById(clientId); 
        const rooms = await this.getAllRooms();
        const room = rooms.find(room => room.id === roomId);
        if (!room) {
            throw new NotFoundError(`No room found with id ${roomId}`);
        }
        if (room.reserved) {
            throw new AlreadyReservedError(`Room ${roomId} is already reserved`);
        }
        room.reserved = true;
    }

    async isRoomBookedByClient(roomId, clientId) {
        const rooms = await this.getAllRooms();
        const room = rooms.find(room => room.id === Number(roomId));
        return room && room.bookedBy === Number(clientId);
    }

    async doCancelBooking(roomId) {
        const rooms = await this.getAllRooms();
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
    
        const rooms = await this.getAllRooms();
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

export const clientsService = new ClientsServices();