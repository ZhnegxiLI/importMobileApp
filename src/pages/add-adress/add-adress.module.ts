import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAdressPage } from './add-adress';
import { MatFormFieldModule,MatInputModule, MatIconModule, MatSelectModule} from '@angular/material'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddAdressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAdressPage),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    TranslateModule
  ],
})
export class AddAdressPageModule {}
