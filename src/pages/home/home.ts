import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, ToastController } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { ENV } from '@app/env';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  public host = ENV.SERVER_API_URL;

  public sldes: any[] = [];
  public logined: boolean = false;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public translate: TranslateService, public event : Events, public utils: UtilsProvider, public toastCtrl: ToastController, public rest: RestProvider) {
      super();

      this.rest.GetWbesiteslides(null).subscribe(result=>{
        if(result!=null && result.length>0){
          this.sldes = result;
        }
      });
  }

  async checkLogined() {

    this.logined =  await this.utils.checkIsLogined();

    if(this.logined==true){
      this.loadNotReadMessage();
    }
  }

  async ionViewDidEnter() {

    await this.checkLogined();
  }

  displaynewProductPage(){
    this.navCtrl.push('NewproductPage',
    {
      Title:this.translate.instant("NewProduit"), 
      PageType:'NewProduct'
    });
  }

  displayByLowerSales(){
    this.navCtrl.push('NewproductPage',
    {
      Title:this.translate.instant("Promotionproduit"), 
      PageType:'LowerPriceProduct'
    });
  }

  loadNotReadMessage(){

    this.rest.GetNoReadMessageCount({UserId:localStorage.getItem('userId')}).subscribe(result=>{
      if(result!=null){
        this.event.publish('message:new', result);
      }
    })
  }

  displayBestSalesProductPage(){
    this.navCtrl.push('NewproductPage',
    {
      Title: this.translate.instant("BestSalesProduit"), 
      PageType:'BestSalesProduct'
    });
  }

  myList(){
    if(this.logined){
      this.navCtrl.push('NewproductPage',
      {
        Title: this.translate.instant("Meslistes"), 
        PageType:'FavoriteList'
      });
    }
    else{
      super.showToast(this.toastCtrl,this.translate.instant("Msg_NotConnected")); 
    }
 
  }
  advancedSearch(){

    this.navCtrl.push('NewproductPage',
    {
      Title:this.translate.instant("home.AdvancedSearch"), 
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
