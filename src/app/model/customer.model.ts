export interface ICustomer{
  custNo?: number;
  name?: string;
  address?: string;
  phone?:number;
}

export class Customer implements ICustomer{

  constructor(public custNo: number, public name: string, public address:string, public  phone?:number) {}
}
