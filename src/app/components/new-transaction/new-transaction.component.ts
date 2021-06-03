import {
  Component,
  EventEmitter,
  ViewChild,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  Input,
  TemplateRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VTransaction } from 'src/app/model/vtransaction.model';
import CustomerJson from '../../content/json/customer.json';
import { Customer } from '../../model/customer.model';
import { Transaction } from '../../model/transaction.model';
import {numericValidator,characterValidator} from '../../Shared/generic-validator';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent  {
  @Output() tOut: EventEmitter<Transaction> = new EventEmitter<Transaction>();
  @Input()
  ref!: VTransaction;

  constructor(private fb: FormBuilder) {}




  transactionForm = this.fb.group({
    type: ['1'],
    reference: [''],
    customerNumber: [''],
    customerName: [''],
    customerAddress: [''],
    customerPhoneNumber: ['',numericValidator],
    transferAmount: ['',numericValidator],
    currency: [''],
    benefeciaryBank: ['',characterValidator],
    bankAccount: [''],
    paymentDetails: ['',characterValidator],
    cardDetails: [''],
    region: [''],
  });
  checkClient() {
    const customerNum = this.transactionForm.get('customerNumber')!.value;
    const exCustInfo =
      CustomerJson.responseXML.getCustomerInfoResponse.getCustomerInfoResult
        .CUST_INFO;
    const exCustNo = exCustInfo.CUST_NO;
    const exCustName = exCustInfo.SHORT_NAME;
    const exCustAddr =
      exCustInfo.ADDRESS_LINE2 +
      ' ' +
      exCustInfo.ADDRESS_LINE3 +
      ' ' +
      exCustInfo.STREET_ADDR +
      ' ' +
      exCustInfo.TOWN_COUNTRY +
      ' ' +
      exCustInfo.COUNTRY;
    const exCustPhone =
      exCustInfo.CONTACT_INFO_V7.CONTACT_INFO_V7.PHONE_LIST_V7
        .PHONE_LIST_ITEM_V7.PHONE;
    if (customerNum === exCustNo) {
      this.transactionForm.controls['customerName'].setValue(exCustName);
      this.transactionForm.controls['customerAddress'].setValue(exCustAddr);
      this.transactionForm.controls['customerPhoneNumber'].setValue(
        exCustPhone
      );
      this.transactionForm.controls['type'].setValue('2');
    }
  }
  onSubmit() {
    const customer = new Customer(
      Number(this.transactionForm.get('customerNumber')!.value),
      this.transactionForm.get('customerName')!.value,
      this.transactionForm.get('customerAddress')!.value,
      Number(this.transactionForm.get('customerPhoneNumber')!.value)
    );
    const transaction = new Transaction(
      this.transactionForm.get('reference')!.value,
      Number(this.transactionForm.get('transferAmount')!.value),
      this.transactionForm.get('currency')!.value,
      this.transactionForm.get('benefeciaryBank')!.value,
      this.transactionForm.get('bankAccount')!.value,
      this.transactionForm.get('paymentDetails')!.value,
      this.transactionForm.get('cardDetails')!.value,
      this.transactionForm.get('region')!.value,
      customer
    );
    this.tOut.emit(transaction);
    alert('Transaction successfully transmitted');
  }
}
