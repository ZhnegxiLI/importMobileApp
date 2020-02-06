import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-registre',
  templateUrl: 'registre.html',
})
export class RegistrePage {
  registreForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
    this.registreForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
      tel:['', Validators.required],
      siret:['',Validators.required]
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrePage');

  }

}
