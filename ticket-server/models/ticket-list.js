const Ticket = require('./ticket');

class TicketList{
  constructor(){
    this.lastNumber = 0;
    this.pending = [];
    this.assigned = [];
  }

  get nexNumber(){
    this.lastNumber ++;
    return this.lastNumber;
  }

  get last13(){
    return this.assigned.slice(0,13);
  }

  createdTicket(){
    const newTicket= new Ticket(this.nexNumber);
    this.pending.push(newTicket);
    return newTicket;
  }

  assignTicket(agent, desktop){
    if(this.pending.length === 0){
      return null;
    }
    const nextTicket = this.pending.shift();
    nextTicket.agent = agent;
    nextTicket.desktop = desktop;
    this.assigned.unshift(nextTicket);
    return nextTicket;
  }
}

module.exports = TicketList;