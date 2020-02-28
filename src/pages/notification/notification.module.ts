import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { MatButtonModule, MatSelectModule,MatFormFieldModule,MatInputModule,MatStepperModule,MatIconModule } from '@angular/material'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
})
export class NotificationPageModule {}
