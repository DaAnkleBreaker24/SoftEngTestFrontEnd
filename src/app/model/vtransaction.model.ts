export interface IVTransation{
  name?: string;
  amount?: number;
  currency?: string;
  reference?: string;
}

export class VTransaction implements IVTransation{

  constructor(  public name: string,public amount: number,public currency: string,public reference: string) {}
}
