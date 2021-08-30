const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    // Created ticket list

    this.ticketList = new TicketList();
    this.socketEvents();
  }
  socketEvents() {
    // On Conecction
    this.io.on('connection', (socket) => {

      // Listen Event
      socket.on('ticket', (_, callback) => {
        const newTicket = this.ticketList.createdTicket();
        callback(newTicket);
      })
      socket.on('next-ticket', ({agent, desktop}, callback) => {
        const Ticket = this.ticketList.assignTicket(agent, desktop);
        callback(Ticket);

        this.io.emit('ticket-assigned',this.ticketList.last13);
      })
    });
  }
}

module.exports = Sockets;