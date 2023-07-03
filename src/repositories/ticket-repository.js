const CrudRepository = require('../repositories/crud-repository');

const { Ticket } = require('../models');

class TicketRepository extends CrudRepository {

    constructor(){
        super(Ticket);
    }

    async getPendingTickets(){
        try {
            const response = await Ticket.findAll({
                where : {
                   status : 'PENDING' 
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = TicketRepository;
