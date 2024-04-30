import { Component, OnInit } from '@angular/core';

import { CheckoutService } from '../checkout.service';


import { BillingCard } from '../card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: BillingCard[] = [];

  displayedColumns: string[] = ['card_brand', 'last_4', 'exp', 'cardholder_name', 'card_type', 'created_at', 'id']

  constructor(
    private _checkoutService: CheckoutService,
  ) {}

  ngOnInit() {

    this._checkoutService.getCustomerCards({ id: `${ window.sessionStorage.getItem('customer_id')}` }).subscribe((result: any) => {
      this.cards = result.cards;
      console.log(result);
    });
  }

  disableCard(id: string) {
    this._checkoutService.disableCard({ id: id }).subscribe((result: any) => {
      console.log(result);
    });
  }

}
