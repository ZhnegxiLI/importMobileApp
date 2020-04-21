import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { RegistreSuccedPage } from '../registre-succed/registre-succed';
import { distinctUntilChanged, debounceTime, switchMap, map, first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-registre',
  templateUrl: 'registre.html',
})
export class RegistrePage extends BaseUI{
  basicInfoForm: any;
  entrepriseForm: any;
  addressForm:any;

  constructor(public navCtrl: NavController, 
    public translateService : TranslateService,
    public navParams: NavParams,
    public formBuilder:FormBuilder, 
    public rest : RestProvider,  
    public network: Network,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
    ) {
    super();

    
    this.basicInfoForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.email]), this.userNameUniqueValidator()],
      password: ['',Validators.compose([ Validators.required,Validators.minLength(8)])],
      confirmPassword: ['',Validators.required]
    });

    this.entrepriseForm = this.formBuilder.group({
      entrepriseName: ['',Validators.required],
      siret:['',Validators.required],
      phoneNumber : ['',Validators.required]
    });

    this.addressForm = this.formBuilder.group({
      Id:['0'],
      FirstLineAddress: ['',Validators.required],
      SecondLineAddress:[''],
      City:['',Validators.required],
      CountryId:['',Validators.required],
      ZipCode:['',Validators.required],
      ContactTelephone:['',Validators.required],
      ContactFax:[''],
      ContactFirstName: ['',Validators.required],
      ContactLastName: ['',Validators.required]
    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrePage');

  }

  confirmPassword(){
   let password = this.basicInfoForm.get('password').value;
   let confirmPassword = this.basicInfoForm.get('confirmPassword').value;
   return password!=confirmPassword;
  }



  userNameUniqueValidator() {
    return (control: FormControl): any => {
      //进入管道进行串行操作
      //valueChanges表示字段值变更才触发操作
      return control.valueChanges.pipe(
        //同valueChanges，不写也可
        distinctUntilChanged(),
        //防抖时间，单位毫秒
        debounceTime(1000),
        //调用服务，参数可写可不写，如果写的话变成如下形式
        //switchMap((val) => this.registerService.isUserNameExist(val))
        switchMap(() => this.rest.CheckUserIsAlreadyExistAsync(control.value)),
        //对返回值进行处理，null表示正确，对象表示错误
        map(res => res == true ? {duplicate:true} : null),
        //每次验证的结果是唯一的，截断流
        first()
        );
      }
  }

  isAlreadyExists(): boolean {
    return this.basicInfoForm.get('email').hasError('duplicate');
  }

  registre(){
    if (this.basicInfoForm.valid&&this.entrepriseForm.valid&&this.addressForm.valid && !this.confirmPassword()) {

      var registreInfo = {
        Email: this.basicInfoForm.value['email'],
        Password: this.basicInfoForm.value['password'],
        Siret: this.entrepriseForm.value['siret'],
        EntrepriseName: this.entrepriseForm.value['entrepriseName'],  
        PhoneNumber: this.entrepriseForm.value['phoneNumber'],  
        FacturationAdress: this.addressForm.value,
        ShipmentAdress: this.addressForm.value
      }
      if (this.network.type != 'none') {
        var loading = this.showLoading(this.loadingCtrl,this.translateService.instant('Loading'));
        this.rest.Registre(registreInfo) // 填写url的参数
          .subscribe(
            f => {
              if (f.Success) {
                this.navCtrl.setRoot('RegistreSuccedPage',{email:f.DataExt, page: 'RegistrePage'});
              } else {
                super.showToast(this.toastCtrl, f.Msg);
              }
              loading.dismiss();
            },
            error => {
              super.showToast(this.toastCtrl, error.Msg);
              loading.dismiss();
            });
      }
      else {
        super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement "); // todo translate
      }
    } else {
      console.log('some information is not valide')
      // validate all form fields
    }
  }


  get basicInfoFormCtrl() { return this.basicInfoForm.controls; }
  get entrepriseFormCtrl() { return this.entrepriseForm.controls; }
  get addressFormCtrl() { return this.addressForm.controls; }
}
