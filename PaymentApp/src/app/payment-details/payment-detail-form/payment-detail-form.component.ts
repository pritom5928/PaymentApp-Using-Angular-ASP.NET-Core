import { Component } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import {NgForm} from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent {
  constructor(public paymentDetailService : PaymentDetailService){

  }

  onSubmit(form : NgForm){
    this.paymentDetailService.formSubmitted = true;
    if(form.valid)
    {
      this.paymentDetailService.postPaymentDetails()
      .subscribe({
        next: res => {
          this.paymentDetailService.list = res as PaymentDetail[];
          this.paymentDetailService.resetForm(form);
          Swal.fire({
            title: 'Inserted successfully',
            icon: 'success',
            timer: 1000,
            showConfirmButton:false
          });
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
