import { NgModule } from '@angular/core';
import { IonMeterComponent } from './ion-meter/ion-meter';

import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [IonMeterComponent],
	imports: [IonicModule, CommonModule],
	exports: [IonMeterComponent]
})
export class ComponentsModule {}
