import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {SubCategoryListPage} from '../sub-category-list/sub-category-list';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage extends BaseUI{

  categoryList:any[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest:RestProvider,
    public network:Network,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController) {
    super();
  }

  secondMenu(ReferenceId : number,RefereceLabel:string){
    this.navCtrl.push('SubCategoryListPage', {ReferenceId : ReferenceId, RefereceLabel:RefereceLabel});
  }
  
  ionViewDidLoad() {
   this.loadMainCategoryList();
  }
  
  loadMainCategoryList(){
    if (this.network.type != 'none') {
      this.rest.GetProductMainCategory() // 填写url的参数
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
          });
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }

}
