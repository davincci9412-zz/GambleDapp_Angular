//import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferComponent } from './offer.component';
import { OffersComponent } from './offers/offers.component';
import { MarketComponent } from './market/market.component';
import { SetOfferComponent } from './set-offer/set-offer.component';
import { JoinOfferComponent } from './join-offer/join-offer.component';
import { AcceptOfferComponent } from './accept-offer/accept-offer.component';
import { SettledOfferComponent } from './settled-offer/settled-offer.component';

const routes: Routes = [{
  path: '',
    children: [
      {
        path: '',
        component: OfferComponent,
      },
      {
        path: 'offers',
        component: OffersComponent,
      },
      {
        path: 'market',
        component: MarketComponent,
      },
	  {
        path: 'set-offer',
        component: SetOfferComponent,
      },
	  {
        path: 'join-offer',
        component: JoinOfferComponent,
      },
	  {
        path: 'accept-offer',
        component: AcceptOfferComponent,
      },
	  {
        path: 'settled-offer',
        component: SettledOfferComponent,
      },
    ],
}];
/*
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OfferRoutingModule {}
*/
export const OfferRoutingModule = RouterModule.forChild(routes);