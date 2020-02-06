import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  @ViewChild('signupSlider') signupSlider;
  slideOneForm:any;
  slideTwoForm: any;
  submitAttempt:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {

    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      age: ['', ]
  });

  this.slideTwoForm = formBuilder.group({
      username: [''],
      privacy: ['', Validators.required],
      bio: ['']
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  next(){
    this.signupSlider.slideNext();
}

prev(){
    this.signupSlider.slidePrev();
}
  save(){

    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
        this.signupSlider.slideTo(0);
    } 
    else if(!this.slideTwoForm.valid){
        this.signupSlider.slideTo(1);
    }
    else {
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
    }

}

}
