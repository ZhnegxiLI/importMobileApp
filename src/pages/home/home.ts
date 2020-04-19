import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public translate: TranslateService, public event : Events) {
    //translate.setDefaultLang('cn');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
  // translate.use('cn');
  }


  displaynewProductPage(){
    this.navCtrl.push('NewproductPage',
    {
      Title:'New products', // TODO: translate
      PageType:'NewProduct'
    });
  }
  displayBestSalesProductPage(){
    this.navCtrl.push('NewproductPage',
    {
      Title:'Best sales products', // TODO: translate
      PageType:'BestSalesProduct'
    });
  }

  myList(){
    this.navCtrl.push('NewproductPage',
    {
      Title:'Favorite product List', // TODO: translate
      PageType:'FavoriteList'
    });
  }
  advancedSearch(){
    this.navCtrl.push('AdvancedSearchPage');
  }
  search(){
    this.navCtrl.push('SearchPage');
  }

  displayCategoryListPage(){
    this.navCtrl.push("CategoryListPage");
  }

  displayAvis(){
    this.navCtrl.push('ProductEvaluationListPage');// show all
  }


  translation(){
    let modal = this.modalCtrl.create('TranslationPage');
    modal.onDidDismiss(()=>{
       
    });
    modal.present();
  }

}
