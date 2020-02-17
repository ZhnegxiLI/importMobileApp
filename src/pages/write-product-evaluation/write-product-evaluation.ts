import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-write-product-evaluation',
  templateUrl: 'write-product-evaluation.html',
})
export class WriteProductEvaluationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductEvaluationListPage');
  }

}
