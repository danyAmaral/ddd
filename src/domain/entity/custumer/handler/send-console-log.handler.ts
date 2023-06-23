import EventHandlerInterface from "../../event/@shared/event-handler.interface";
import CustomerAdressChangedEvent from "../customer-adress-changed.event";

export default class SendConsoleLogHandler
  implements EventHandlerInterface<CustomerAdressChangedEvent>
{
  handle(event: CustomerAdressChangedEvent): void {
    console.log(`Endereço do cliente: ${event.customerId}, ${event.customerName} alterado para: ${event.newAdress}`);
  }
}
