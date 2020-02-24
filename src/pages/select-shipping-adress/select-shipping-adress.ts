import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectShippingAdressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-shipping-adress',
  templateUrl: 'select-shipping-adress.html',
})
export class SelectShippingAdressPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectShippingAdressPage');
  }
  addNewAddress(){
    this.navCtrl.push('AddAdressPage');
  }
}
