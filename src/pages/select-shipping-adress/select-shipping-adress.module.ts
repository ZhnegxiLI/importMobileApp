import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectShippingAdressPage } from './select-shipping-adress';
import {MatRadioModule} from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SelectShippingAdressPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectShippingAdressPage),
    MatRadioModule,
    TranslateModule
  ],
})
export class SelectShippingAdressPageModule {}
