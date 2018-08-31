import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public formDataPurchase: any;
  constructor(public dataStore: DataService) { }

  ngOnInit() {
    this.dataStore.currentPaymentData.subscribe(data => this.formDataPurchase = data);
    console.log(this.formDataPurchase);
    $(document).ready(function () {
      $('#paymentForm').submit();
    });

  }

}
