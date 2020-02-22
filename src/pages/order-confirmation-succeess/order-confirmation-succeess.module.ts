import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmationSucceessPage } from './order-confirmation-succeess';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderConfirmationSucceessPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationSucceessPage),
    TranslateModule
  ],
})
export class OrderConfirmationSucceessPageModule {}
