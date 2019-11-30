import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewproductPage} from '../newproduct/newproduct';
import {SearchPage} from '../search/search'
import { CategoryListPage} from '../category-list/category-list'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  displaynewProductPage(){
    this.navCtrl.push(NewproductPage);
  }

  search(){
    this.navCtrl.push(SearchPage);
  }

  displayCategoryListPage(){
    this.navCtrl.push(CategoryListPage);
  }

}
