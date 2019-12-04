import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SubCategoryListPage} from '../sub-category-list/sub-category-list';

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  secondMenu(pageName : string){
    this.navCtrl.push(SubCategoryListPage, {pageName : pageName});
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
  }

}
