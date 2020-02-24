import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAdressPage } from './add-adress';
import { MatFormFieldModule,MatInputModule, MatIconModule, MatSelectModule} from '@angular/material'

@NgModule({
  declarations: [
    AddAdressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAdressPage),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
})
export class AddAdressPageModule {}
