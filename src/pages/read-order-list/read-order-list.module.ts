import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadOrderListPage } from './read-order-list';

@NgModule({
  declarations: [
    ReadOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadOrderListPage),
  ],
})
export class ReadOrderListPageModule {}
