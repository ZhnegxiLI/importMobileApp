import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the ProductEvaluationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-evaluation-list',
  templateUrl: 'product-evaluation-list.html',
})
export class ProductEvaluationListPage {
  global : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.global = navParams.get('global');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductEvaluationListPage');
  }

}
