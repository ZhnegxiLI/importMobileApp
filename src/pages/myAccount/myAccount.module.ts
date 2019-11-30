import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { myAccountPage } from './myaccount';

@NgModule({
  declarations: [
    myAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(myAccountPage),
  ],
})
export class MorePageModule {}
