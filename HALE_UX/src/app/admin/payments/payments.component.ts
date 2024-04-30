import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {  MatTable, MatTableDataSource } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { PaymentsLinks } from './payments-links';
import {  MatSort } from '@angular/material/sort';
import { PaymentsService } from './payments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent  implements OnInit {
  PaymentLinks?: PaymentsLinks[];
  displayedColumns: string[] = ['id', 'long_url', 'support_email'];
  clickedRows = new Set<PaymentsLinks[]>();
  columnsToDisplay: string[] = new Array(); 
  dataSource = new MatTableDataSource<PaymentsLinks>(this.PaymentLinks);
 

  pageLength: number = 15;
  pageSize: number = 20;
  pageSizeOptions: number[] = [15, 30, 60, 120, 240, 480, 960];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<PaymentsLinks[]>;
  @ViewChild(MatSort) sort?: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex )
  }


  constructor(
    private _formBuilder: FormBuilder,
    private _paymentsService: PaymentsService,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    for(let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }
  }


  getCheckoutPaymentLinks(): void {
    this._paymentsService.getcheckoutPaymentLinks().subscribe((response: any) => {
      this.PaymentLinks = response.SQResponse.payment_links;

      console.log(this.PaymentLinks);
    })

  }


  requestPaymentForm = this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    amount: ['', Validators.required]

  });

  ngOnRequestPayment(): void{

    const dataset = {
      quick_pay: {
        location_id: window.localStorage.getItem('Active_Loc'),
        name: this.requestPaymentForm.value.name,
        price_money: {
          amount: this.requestPaymentForm.value.amount,
          currency: 'USD'
        }
      },
      idempotency_key: window.crypto.randomUUID(),
      checkout_options: {
        allow_tipping: false,
        accepted_payment_methods: {
          cash_app_pay: true,
          google_pay: true
        },
        merchant_support_email: this.requestPaymentForm.value.email,
        redirect_url: 'https://halehealthservices.vercel.app/'
      }
    }

    this._paymentsService.newcheckoutPaymentLink(dataset).subscribe((response: any) => {
      console.log(response);

      this._matSnackBar.open(`${ JSON.stringify(response)}`, 'Dismiss');
    });

  }

  resetForm(): void {
    this.requestPaymentForm.reset();
  }

}
