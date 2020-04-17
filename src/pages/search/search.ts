import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public SearchText: string;

  items: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.initializeItems();
  }
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');

    this.loadSearchTextList();
  }

  loadSearchTextList() {
    this.storage.get('SearchTextList').then(result => {
      if (result != null && JSON.parse(result) != null && JSON.parse(result).length > 0) {
        this.items = JSON.parse(result);
      }
      else {
        this.items = [];
      }
    })
  };

  search() {
    if (this.items.find(p => p == this.SearchText) == null) {
      this.items.splice(0, 0, this.SearchText);
      if(this.items.length>10){
        this.items.pop();
      }
      this.storage.set('SearchTextList', JSON.stringify(this.items));

      this.startSearch(this.SearchText);
    }
  }

  startSearch(item){
    this.navCtrl.push('NewproductPage',{PageType:'SimpleProductSearch', Title:item} );
  }

  clearSearchHistroy(){
    this.items = [];
    this.storage.remove('SearchTextList');
  }


}
