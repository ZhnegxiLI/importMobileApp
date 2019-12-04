import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WriteProductEvaluationPage} from '../write-product-evaluation/write-product-evaluation'



/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  isFavorite : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  favorite(){
    this.isFavorite = !this.isFavorite;
  }

  writeEvaluation(){
    this.navCtrl.push(WriteProductEvaluationPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
