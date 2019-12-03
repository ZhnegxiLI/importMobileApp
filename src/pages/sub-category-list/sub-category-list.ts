import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SubCategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-category-list',
  templateUrl: 'sub-category-list.html',
})
export class SubCategoryListPage {
  pageName : string;

  subMenu = {
    'VAISSELLES' : [
      'Assiette',
      'Verre',
      'Bonbonniere' ,
      'Boitre de conversation', 
      'Mug' , 
      'Ramequin' , 
     ' Carafe',
      'Pichet egouttoir a vaisselle', 
      'Bol', 
      'Saladier', 
      'Bol', 
      'Gobelet', 
      'Dessous de plat', 
      'Plateau' , 
      'Planche a decouper', 
      'Serviette papier', 
      'Bouilloir', 
      'Détergent' ,
      'Coupe a fruit'
    ],
    'CADEAU' : [
      '1',
      '2'
    ],
    'DECORATION' : [
      '1',
      '2'
    ],
    'BAZAR' : [
      '1',
      '2'
    ],
    'ARTICLES DE MENAGE' : [
      '1',
      '2'
    ],
    'FLEURS ARTIFICIELLES' : [
      '1',
      '2'
    ],
    'MEILLEUR VENTE' : [
      '1',
      '2'
    ]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageName = navParams.get('pageName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCategoryListPage');
  }

}
