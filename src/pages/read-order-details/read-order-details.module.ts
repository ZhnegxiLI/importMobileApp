import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadOrderDetailsPage } from './read-order-details';

@NgModule({
  declarations: [
    ReadOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadOrderDetailsPage),
  ],
})
export class ReadOrderDetailsPageModule {}
