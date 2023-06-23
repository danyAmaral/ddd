import Address from "../../../value-object/adress";
import EventInterface from "../event/@shared/event.interface";

export default class CustomerAdressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
  customerId: string;
  customerName: string;
  newAdress: Address;

  constructor(eventData: any, customerId: string, customerName: string, newAdress: Address) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
    this.customerId = customerId;
    this.customerName = customerName;
    this.newAdress = newAdress;
  }
}
