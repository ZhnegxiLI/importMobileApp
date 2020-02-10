import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-registre',
  templateUrl: 'registre.html',
})
export class RegistrePage {
  basicInfoForm: any;
  entrepriseForm: any;
  addressForm:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
    this.basicInfoForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required])],
      password: ['',Validators.compose([ Validators.required,Validators.pattern('(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}')])],
      confirmPassword: ['',Validators.required]
    });

    this.entrepriseForm = this.formBuilder.group({
      entrepriseName: ['',Validators.required],
      siret:['',Validators.required]
    });

    this.addressForm = this.formBuilder.group({
      firstLineAddress: ['',Validators.required],
      secondLineAddress:[''],
      city:['',Validators.required],
      country:['',Validators.required],
      zipCode:['',Validators.required]
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
}
