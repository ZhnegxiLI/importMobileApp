import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderConfirmationSucceessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirmation-succeess',
  templateUrl: 'order-confirmation-succeess.html',
})
export class OrderConfirmationSucceessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmationSucceessPage');
  }
  returnToAccueil(){
    this.navCtrl.setRoot('TabsPage');
  }

}
