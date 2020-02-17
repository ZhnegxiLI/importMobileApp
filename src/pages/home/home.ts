import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {NewproductPage} from '../newproduct/newproduct';
import {SearchPage} from '../search/search'
import { CategoryListPage} from '../category-list/category-list'
import {ProductEvaluationListPage} from '../product-evaluation-list/product-evaluation-list'
import {TranslateService} from '@ngx-translate/core';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentLang: string ='cn';
  constructor(public navCtrl: NavController,public translate: TranslateService, public event : Events) {
    //translate.setDefaultLang('cn');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
  // translate.use('cn');
  }


  displaynewProductPage(){
    this.navCtrl.push('NewproductPage');
  }

  search(){
    this.navCtrl.push('SearchPage');
  }

  displayCategoryListPage(){
    this.navCtrl.push("CategoryListPage");
  }

  displayAvis(){
    this.navCtrl.push('ProductEvaluationListPage', {global:true});
  }

}
