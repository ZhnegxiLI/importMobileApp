import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import {RestProvider} from '../../providers/rest/rest'
import {UtilsProvider} from '../../providers/utils/utils'
import { BaseUI } from '../../app/common/baseui';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-add-adress',
  templateUrl: 'add-adress.html',
})
export class AddAdressPage extends BaseUI{
  submitted:boolean = false;
  adreeForm: FormGroup;
  type : string;
  constructor(public navCtrl: NavController,
     public translateService : TranslateService,
     public navParams: NavParams,
     public network : Network,
     public formBuilder:FormBuilder, 
     public rest: RestProvider,
     public toastCtrl: ToastController,
     public utils: UtilsProvider,
     public loadingCtrl : LoadingController,
     public storage : Storage) {
       super();

       this.adreeForm = this.formBuilder.group({
        Id:['0'],
        EntrepriseName: ['', Validators.required],
        ContactFirstName: ['',Validators.required],
        ContactLastName: ['',Validators.required],
        FirstLineAddress:['',Validators.required],
        SecondLineAddress:[''],
        City:['',Validators.required],
        CountryId:['',Validators.required],
        ZipCode: ['',Validators.required],
        ContactTelephone:['',Validators.required],
        ContactFax:['']
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdressPage');
    this.type = this.navParams.get('type');
    var adress =  this.navParams.get('adress');

    if(adress!=null){
      console.log(adress);
      
      this.adreeForm.setValue({
        Id:adress.Id,
        EntrepriseName:adress.EntrepriseName,
        ContactFirstName:adress.ContactFirstName,
        ContactLastName:adress.ContactLastName,
        FirstLineAddress:adress.FirstLineAddress,
        SecondLineAddress:adress.SecondLineAddress,
        City:adress.City,
        CountryId:adress.CountryId!=null ?adress.CountryId:1 ,
        ZipCode:adress.ZipCode,
        ContactTelephone:adress.ContactTelephone,
        ContactFax:adress.ContactFax
      });
    }
    else{
      this.loadUserInfo();
    }
  }


  async loadUserInfo(){
    if (this.network.type != 'none') { 
      console.log(this.adreeForm.value);

      var loading = super.showLoading(this.loadingCtrl,this.translateService.instant('Loading'));
      this.rest.GetUserById(await this.utils.getKey('userId')) // 填写url的参数
        .subscribe(
          result => {
            if (result!=null) {
              this.adreeForm.patchValue({
                EntrepriseName: result.EntrepriseName!=null?result.EntrepriseName:'',
                ContactTelephone:  result.PhoneNumber!=null?result.PhoneNumber:''
              });
            } else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error") );
            }
            loading.dismiss()
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error") );
            loading.dismiss()
          });

    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline") );
    }
  }

  async saveAdress(){
    this.submitted = true;

    /* Step1: make all ctrl in the group been touched */
    for(let i in this.adreeForm.controls){
      this.adreeForm.controls[i].markAsTouched();
    }
    /* Step2: Check all the field has been valided*/
    if (this.adreeForm.invalid) {
      return;
    }
    if (this.network.type != 'none') { 
      console.log(this.adreeForm.value);
      var criteria = {
        adress: this.adreeForm.value,
        userId : await this.utils.getKey('userId'), // todo change
        type : this.type
      }
      var loading = super.showLoading(this.loadingCtrl,this.translateService.instant('Loading'));
      this.rest.CreateOrUpdateAdress(criteria) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success&&f.Data!=null) {
              if(this.type){
                this.storage.set('tempFacturationAdress','true');

                this.navCtrl.getPrevious().data.type = this.type;
                this.navCtrl.getPrevious().data.facturationAdress = this.adreeForm.value;
              }
              loading.dismiss()
                this.navCtrl.pop();
            } else {
              loading.dismiss()
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error") );
            }
          },
          error => {
            loading.dismiss();
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error") );
          });

    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline") );
    }
  }

  get f() { return this.adreeForm.controls; }

}
