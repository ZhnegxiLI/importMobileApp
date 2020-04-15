import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-order-confirmation-succeess',
  templateUrl: 'order-confirmation-succeess.html',
})
export class OrderConfirmationSucceessPage {

  public OrderId : any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmationSucceessPage');
      this.OrderId =  this.navParams.get('OrderId');
      // todo change to message 
  }
  returnToAccueil(){
    this.navCtrl.setRoot('TabsPage');
  }

}
