import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import {RestProvider} from '../../providers/rest/rest'
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-modify-user-info',
  templateUrl: 'modify-user-info.html',
})
export class ModifyUserInfoPage extends BaseUI {
  public userForm: FormGroup;

  public facturationAdress: any = {};
  public defaultShippingAdress: any = {};
  public UserInfo: any = {};
  constructor(public navCtrl: NavController, 
    public formBuilder:FormBuilder, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public network: Network,
    public rest: RestProvider,
    public translateService: TranslateService
    ) {
      super();

    this.userForm = this.formBuilder.group({
      EntrepriseName: ['', Validators.required],
      Siret:['',Validators.required],
      PhoneNumber:['',Validators.required],
    });

  }


  ionViewDidEnter() {
    this.defaultShippingAdress = this.navParams.get('tempSelectedAdress')||  this.defaultShippingAdress;
    this.facturationAdress = this.navParams.get('facturationAdress') ||  this.facturationAdress;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyUserInfoPage');

    this.UserInfo = this.navParams.get('UserInfo');

    this.userForm.patchValue({
      EntrepriseName: this.UserInfo.EntrepriseName,
      Siret: this.UserInfo.Siret,
      PhoneNumber: this.UserInfo.PhoneNumber 
    });
    

    if(this.UserInfo.FacturationAdress!=null){
      this.facturationAdress = this.UserInfo.FacturationAdress;
    }

    if(this.UserInfo.ShippingAdress!=null && this.UserInfo.ShippingAdress.length>0){
      this.defaultShippingAdress = this.UserInfo.ShippingAdress.find(p=> p.IsDefaultAdress==true);

      this.defaultShippingAdress = this.defaultShippingAdress==null ? this.UserInfo.ShippingAdress[0]: this.defaultShippingAdress;
    }
  }


  modifyFacturationAdress(facturationAdress){
    //this.ChangeAddress = true;
    this.navCtrl.push('AddAdressPage',{
      type:'facturationAdress',
      adress:facturationAdress
    });
  }

  
  selectShippingAdress(){
    //this.ChangeAddress = true;
    this.navCtrl.push('SelectShippingAdressPage',{CurrentAddressId: this.defaultShippingAdress!=null?this.defaultShippingAdress.Id:null});
  }

  saveUserInfo(){
    
    /* Step1: make all ctrl in the group been touched */
    for(let i in this.userForm.controls){
      this.userForm.controls[i].markAsTouched();
    }
    /* Step2: Check all the field has been valided*/
    if (this.userForm.invalid) {
      return;
    }
    if (this.network.type != 'none') { 
      console.log(this.userForm.value);
      var criteria = this.userForm.value;
      criteria.UserId = localStorage.getItem('userId');
   

      var loading = super.showLoading(this.loadingCtrl,this.translateService.instant('Loading'));
      this.rest.UpdateUserInfo(criteria) // 填写url的参数
        .subscribe(
          f => {
            if(f!=null && f>0){
              this.navCtrl.getPrevious().data.UserInfo = this.userForm.value;
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_SaveSuccess"));
            }
            loading.dismiss()
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            loading.dismiss()

          });

    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }

  }
}
