import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';
import { NewproductPage } from '../newproduct/newproduct';

@IonicPage()
@Component({
  selector: 'page-sub-category-list',
  templateUrl: 'sub-category-list.html',
})
export class SubCategoryListPage extends BaseUI {
  loading:boolean = true;
  MainReferenceLabel : string = "";
  MainReferenceId:number = 0;
  categoryList: any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest:RestProvider,
    public network:Network, public loadingCtrl:LoadingController,
    public toastCtrl:ToastController) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCategoryListPage');
  }

  ionViewDidEnter(){
    this.MainReferenceId = this.navParams.get('ReferenceId');
    this.MainReferenceLabel = this.navParams.get('RefereceLabel');
    this.loadSecondProductCategory();
  }

  loadSecondProductCategory(){
    if (this.network.type != 'none') {
      this.rest.GetProductSecondCategory(this.MainReferenceId) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success&&f.Data!=null) {
                this.categoryList = f.Data;
            } else {
              super.showToast(this.toastCtrl, f.Msg);
            }
          },
          error => {
            super.showToast(this.toastCtrl, error.Msg);
          },()=>this.loading=false);
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement "); // todo translate
    }
  }

  productMenu(ReferenceId:number,RefereceLabel:string ){
    this.navCtrl.push('NewproductPage', 
    {
      ReferenceId : ReferenceId, 
      Title:RefereceLabel,
      PageType : 'BySecondCategory'
    });
  }

}
