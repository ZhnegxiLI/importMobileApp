import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectShippingAdressPage } from './select-shipping-adress';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    SelectShippingAdressPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectShippingAdressPage),
    MatRadioModule
  ],
})
export class SelectShippingAdressPageModule {}
