import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from './../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public paymentDetailService : PaymentDetailService){
    
  }

  ngOnInit(): void {
    this.paymentDetailService.refreshList();
  }

  populateForm(selectedRecord : PaymentDetail){
    this.paymentDetailService.formData = selectedRecord;
  }

}
