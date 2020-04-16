import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoPage } from './user-info';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInfoPage),
    TranslateModule
  ],
})
export class UserInfoPageModule {}
