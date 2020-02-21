import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { RegistreSuccedPage } from '../registre-succed/registre-succed';


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
    public navParams: NavParams,
    public formBuilder:FormBuilder, 
    public rest : RestProvider,  
    public network: Network,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
    ) {
    super();

    
    this.basicInfoForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required])],
      password: ['',Validators.compose([ Validators.required,Validators.pattern('(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}')])],
      confirmPassword: ['',Validators.required]
    });

    this.entrepriseForm = this.formBuilder.group({
      entrepriseName: ['',Validators.required],
      siret:['',Validators.required],
      phoneNumber : ['',Validators.required]
    });

    this.addressForm = this.formBuilder.group({
      firstLineAddress: ['',Validators.required],
      secondLineAddress:[''],
      city:['',Validators.required],
      country:['',Validators.required],
      zipCode:['',Validators.required],
      useSameAddress:['false']
    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrePage');

  }

  confirmPassword(){
   let password = this.basicInfoForm.get('password').value;
   let confirmPassword = this.basicInfoForm.get('confirmPassword').value;
   return password!==confirmPassword;
  }
  registre(){
    if (this.basicInfoForm.valid&&this.entrepriseForm.valid&&this.addressForm.valid && !this.confirmPassword()) {
      console.log('all is ok');

      var registreInfo = {
        Email: this.basicInfoForm.value['email'],
        Password: this.basicInfoForm.value['password'],
        Siret: this.entrepriseForm.value['siret'],
        EntrepriseName: this.entrepriseForm.value['entrepriseName'], 
        FirstLineAddress: this.addressForm.value['firstLineAddress'],
        SecondLineAddress : this.addressForm.value['secondLineAddress'], 
        Country: this.addressForm.value['country'],
        ZipCode: this.addressForm.value['zipCode'], 
        UseSameAddress: this.addressForm.value['useSameAddress'], 
        PhoneNumber : this.entrepriseForm.value['phoneNumber']
      }
      if (this.network.type != 'none') {
        var loading = this.showLoading(this.loadingCtrl,"En cours...")
        this.rest.Registre(registreInfo) // 填写url的参数
          .subscribe(
            f => {
              if (f.Success) {
                this.navCtrl.setRoot('RegistreSuccedPage',{email:this.basicInfoForm.value['email']});
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
        super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
      }

    } else {
      console.log('some information is not valide')
      // validate all form fields
    }
  }
}
