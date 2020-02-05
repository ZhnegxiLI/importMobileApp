import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

    onUpdate(data) {
    console.log(data);
  }
  valide(){
    this.event.publish('user:created');
  }

}
