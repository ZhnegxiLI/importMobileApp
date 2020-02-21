import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { MatButtonModule, MatSelectModule,MatFormFieldModule,MatInputModule } from '@angular/material'

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    MatFormFieldModule,
    MatInputModule
  ],
})
export class NotificationPageModule {}
