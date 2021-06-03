import  { Customer } from './customer.model';

export interface ITransaction{
  amount?: number;
  currency?: string;
  bank?: string;
  accnNo?:string;
  paymentDetails?:string;
  cardNo?:string;
  region?:string;
  reference?:string;
  customer?: Customer;

}

export class Transaction implements ITransaction{

  constructor( public reference:string, public amount: number,public currency: string,public bank: string,public accnNo:string,public paymentDetails:string,public cardNo:string,public region:string,public customer: Customer) {}
}
