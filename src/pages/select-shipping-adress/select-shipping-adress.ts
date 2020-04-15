import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils'
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-select-shipping-adress',
  templateUrl: 'select-shipping-adress.html',
})
export class SelectShippingAdressPage extends BaseUI{
  selectedAdressId:number;
  adressList:any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public network: Network,
    public toastCtrl : ToastController,
    public rest : RestProvider,
    public utils : UtilsProvider,
    public loadingCtrl: LoadingController,
    public storage : Storage) {
      super();
  }


  async ionViewDidLoad() {
    console.log('ionViewDidLoad SelectShippingAdressPage');
    if (this.network.type != 'none') {
      var loading = super.showLoading(this.loadingCtrl,'En cours...');// TODO translate
      var userId = await this.utils.getKey('userId');
      this.rest.GetUserShippingAdress(userId) // 填写url的参数
      .subscribe(
        f => {
          if (f.Success&&f.Data!=null) {
              this.adressList = f.Data;
              if(this.navParams.get('CurrentAddressId')!=null && this.navParams.get('CurrentAddressId')>0){
                this.selectedAdressId = this.navParams.get('CurrentAddressId');
              }
              console.log(f.Data); // todo remove
          } else {
            super.showToast(this.toastCtrl, f.Msg);
          }

          loading.dismiss();
        },
        error => {
          loading.dismiss();
          super.showToast(this.toastCtrl, error.Msg);
        });
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }

  addNewAddress(){
    this.navCtrl.push('AddAdressPage',{type:'shippingAdress'});
  }
  modifyAdress(adress){
    this.navCtrl.push('AddAdressPage',{type:'shippingAdress',adress:adress});
  }

  saveShippingAdress(){
    var selectedShippingAdress = this.getSelectedAdress();
    //this.storage.set('tempSelectedAdress',JSON.stringify(selectedShippingAdress));
    this.navCtrl.getPrevious().data.tempSelectedAdress = selectedShippingAdress;// Important! :  pass data to previous page
    this.navCtrl.pop();
  }
  getSelectedAdress(){
    return this.adressList.find(p=>p.Id == this.selectedAdressId);
  }
}
