import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  isLinear:boolean = false;


  basicInfoForm: any;
  entrepriseForm: any;
  addressForm:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
  

    /* Registre forms */
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
      useSameAddress:['false'],
      phoneNumber:['',Validators.required],
      fax:['']
    });

  }

  get basicInfoFormCtrl() { return this.basicInfoForm.controls; }
  get entrepriseFormCtrl() { return this.entrepriseForm.controls; }
  get addressFormCtrl() { return this.addressForm.controls; }
}

