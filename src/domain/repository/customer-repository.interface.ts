import Customer from "../entity/custumer/customer";
import RepositoryInterface from "./repository-interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
