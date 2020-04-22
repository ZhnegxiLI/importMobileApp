import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {SubCategoryListPage} from '../sub-category-list/sub-category-list';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage extends BaseUI{
  public loading : boolean = true;
  categoryList:any[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest:RestProvider,
    public network:Network,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public translateService: TranslateService) {
    super();
  }

  secondMenu(ReferenceId : number,RefereceLabel:string){
    this.navCtrl.push('SubCategoryListPage', {ReferenceId : ReferenceId, RefereceLabel:RefereceLabel});
  }
  
  ionViewDidLoad() {
  
  }

  ionViewDidEnter(){
    this.loadMainCategoryList();
  }
  　　
  loadMainCategoryList(){
    if (this.network.type != 'none') {
      this.rest.GetProductMainCategory() // 填写url的参数
        .subscribe(
          f => {
            if (f.Success&&f.Data!=null) {
                this.categoryList =f.Data;
            } else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }
            this.loading=false
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            this.loading=false
          });

    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

}
