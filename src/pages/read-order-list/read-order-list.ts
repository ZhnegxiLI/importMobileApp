import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReadOrderDetailsPage } from '../read-order-details/read-order-details'

@IonicPage()
@Component({
  selector: 'page-read-order-list',
  templateUrl: 'read-order-list.html',
})
export class ReadOrderListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadOrderListPage');
  }
  commandeDetail(){
    this.navCtrl.push('ReadOrderDetailsPage');
  }

}
