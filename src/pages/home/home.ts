import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, ToastController } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { BaseUI } from '../../app/common/baseui';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  public logined: boolean = false;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public translate: TranslateService, public event : Events, public utils: UtilsProvider, public toastCtrl: ToastController) {
      super();
  }

  async checkLogined() {

    this.logined =  await this.utils.checkIsLogined();
  }

  displaynewProductPage(){
    this.navCtrl.push('NewproductPage',
    {
      Title:'New products', // TODO: translate
      PageType:'NewProduct'
    });
  }

  displayByLowerSales(){
    this.navCtrl.push('NewproductPage',
    {
      Title:'New products', // TODO: translate
      PageType:'LowerPriceProduct'
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
    if(this.logined){
      this.navCtrl.push('NewproductPage',
      {
        Title:'Favorite product List', // TODO: translate
        PageType:'FavoriteList'
      });
    }
    else{
      super.showToast(this.toastCtrl,"You have not yet connected, connecte to process the futher action");
    }
 
  }
  advancedSearch(){

    this.navCtrl.push('NewproductPage',
    {
      Title:'Advanced product search', // TODO: translate
      PageType:'AdvancedProductSearch'
    });
    //this.navCtrl.push('AdvancedSearchPage');
  }
  search(){
    this.navCtrl.push('SearchPage');
  }

  contactUs(){
    this.navCtrl.push('ContactUsPage');
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
