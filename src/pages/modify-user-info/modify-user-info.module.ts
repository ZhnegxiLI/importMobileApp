import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyUserInfoPage } from './modify-user-info';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    ModifyUserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyUserInfoPage),
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class ModifyUserInfoPageModule {}
