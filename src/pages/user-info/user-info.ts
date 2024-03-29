import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage extends BaseUI {

  public UserInfo: any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public network: Network, public rest: RestProvider, 
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, public translateService: TranslateService) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
    this.loadUserinfo();
  }

  
  ionViewDidEnter() {
    this.UserInfo = this.navParams.get('UserInfo')||  this.UserInfo;
    this.UserInfo.Email = localStorage.getItem('username');
  }


  loadUserinfo(){
    if (this.network.type != 'none') {
      var loading = super.showLoading(this.loadingCtrl, this.translateService.instant('Loading'));
      this.rest.GetUserById(localStorage.getItem('userId')) 
        .subscribe(
          f => {
            if (f!=null) {
                this.UserInfo = f;
            }
            else{
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error")); 
            } 
            loading.dismiss();
          },
          error => {
            loading.dismiss()
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error")); 
          });
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline")); 
    }
  }

  modifyPersonInfo(){
    console.log(this.UserInfo);
    this.navCtrl.push('ModifyUserInfoPage',{UserInfo: this.UserInfo});
  }

  
  myAvis(){
    this.navCtrl.push('ProductEvaluationListPage', {type:"GetCommentByUserId"}); // by userId
  }

  myFavorite(){
    this.navCtrl.push('NewproductPage',
    {
      Title: this.translateService.instant("Meslistes"), 
      PageType:'FavoriteList'
    });
  }

}
