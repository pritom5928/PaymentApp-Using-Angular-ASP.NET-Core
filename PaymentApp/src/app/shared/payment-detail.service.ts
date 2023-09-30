import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { PaymentDetail } from './payment-detail.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url : string = environment.apiBaseUrl + '/PaymentDetail';

  formData : PaymentDetail = new PaymentDetail();

  public list : PaymentDetail[] = [];

  formSubmitted : boolean = false;

  constructor(private http : HttpClient) { }

  refreshList(){
    this.http.get(this.url)
    .subscribe({
      next: res => {
        this.list = res as PaymentDetail[];
      },
      error: err => {
        console.log(err);
      }
    });
  }

  postPaymentDetails(){
    return this.http.post(this.url, this.formData);
  }

  putPaymentDetails(){
    return this.http.put(this.url + "/"+ this.formData.paymentDetailId, this.formData);
  }

  resetForm(form: NgForm){
    form.reset();
    this.formData = new PaymentDetail();
    this.formSubmitted = false;
  }

  deletePaymentDetails(id: number){
    return this.http.delete(this.url + "/"+id);
  }

}
