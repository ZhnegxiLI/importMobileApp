import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  private cartProductList: any[]=[];
  private checkAllProduct: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public event: Events,
    public utilis:UtilsProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
 async ionViewDidEnter(){
   this.cartProductList = JSON.parse(await this.utilis.getKey('cartProductList'));
  }
  itemCheckBoxChange(item:any){
    if(item.Selected==false){
      this.checkAllProduct = false;
    }
    this.SaveCart();
  }

  onUpdate(data) {
    if(typeof data.number === 'number' ){
      this.cartProductList.forEach(p => {
        if(p.ReferenceId == data.goods){
          p.Quantity = data.number;
        }
      });
      this.SaveCart();
    }
  }
  valide(){
    this.event.publish('user:created');
  }
  AllCheckBoxChange(){
    if(this.checkAllProduct==true){
      this.cartProductList.forEach(p => {
        p.Selected = true;
      });
    }
    else{
      this.cartProductList.forEach(p => {
        p.Selected = false;
      });
    }
  }

  /* Utils methods */
  SaveCart(){
    this.storage.set('cartProductList',JSON.stringify(this.cartProductList));
  }

  CalculAccount(){
    var totalAccount = 0;
    var selectedProduct = this.cartProductList.filter(p=>{
      return p.Selected == true;
    });
    selectedProduct.forEach(p => {
      totalAccount = totalAccount + (p.Quantity*p.Price);
    });
    return totalAccount;
  }

}
