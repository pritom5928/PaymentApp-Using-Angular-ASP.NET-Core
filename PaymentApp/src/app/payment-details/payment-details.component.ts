import Swal from 'sweetalert2';
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
    this.paymentDetailService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number){
    this.showDeleteConfirmation(id);
  }

  showDeleteConfirmation(id : number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentDetailService.deletePaymentDetails(id)
            .subscribe({
              next: res => {
                this.paymentDetailService.list = res as PaymentDetail[];
                 Swal.fire({
                   title: 'Deleted successfully',
                   icon: 'success',
                   timer: 1000,
                   showConfirmButton:false
                });
              },
              error: err => {
                   console.log(err);
              }
           });

          this.paymentDetailService.formData = new PaymentDetail();
       }
    });
  }
}
