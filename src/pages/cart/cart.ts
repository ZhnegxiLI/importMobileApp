import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';
import { ENV } from '@app/env';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage extends BaseUI {

  public logined: boolean = false;
  private cartProductList: any[] = [];
  private checkAllProduct: boolean = false;
  private host = ENV.SERVER_API_URL;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public event: Events,
    public utils: UtilsProvider,
    public storage: Storage,
    public network: Network,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.checkLogined();
  }

  async checkLogined() {

    this.logined = await this.utils.checkIsLogined();
  }

  async ionViewDidEnter() {
    this.cartProductList = JSON.parse(await this.utils.getKey('cartProductList'));

    console.log(this.cartProductList);

    // Renew quantity check if quantiy < min quantity
    if (this.cartProductList != null && this.cartProductList.length > 0) {
      this.cartProductList.map(f => {
        if (f.Quantity < f.MinQuantity) {
          f.Quantity = f.MinQuantity;
        }
      });
    }
  }

  itemCheckBoxChange(item: any) {
    if (item.Selected == false) {
      this.checkAllProduct = false;
    }
    this.SaveCart();
  }

  checkQuantityWithMinQuantity(minQuantity, Quantity) {
    if (minQuantity != null && Quantity != null) {
      if (Quantity > minQuantity) {
        return Quantity;
      }
      else {
        return minQuantity;
      }
    }
    return 0;
  }

  onUpdate(data) {
    if (typeof data.number === 'number') {
      this.cartProductList.forEach(p => {
        if (p.ReferenceId == data.goods) {
          p.Quantity = data.number;
        }
      });
      this.SaveCart();
    }
  }

  async valideCart() {
    if (this.logined) {
      /* Step1 : Get all the selected product */
      var selectedProduct = this.GetSelectedProduct();

      /* Step2: Get the real info for the product */
      var selectedReferenceIds = [];
      selectedProduct.map(p => selectedReferenceIds.push({ ReferenceId: p.ReferenceId, Quantity: p.Quantity }));
      this.navCtrl.push('OrderConfirmationPage', { References: selectedReferenceIds });
    }
    else{
      super.showToast(this.toastCtrl,"You have not yet connected, connecte to process the futher action");
    }
  }

  AllCheckBoxChange() {
    if (this.checkAllProduct == true) {
      this.cartProductList.forEach(p => {
        p.Selected = true;
      });
    }
    else {
      this.cartProductList.forEach(p => {
        p.Selected = false;
      });
    }
  }
  removeItem(item) {
    this.cartProductList = this.cartProductList.filter(p => p.ReferenceId != item.ReferenceId);
    this.SaveCart();
  }

  /* Utils methods */
  SaveCart() {
    this.storage.set('cartProductList', JSON.stringify(this.cartProductList));
  }

  GetSelectedProduct() {
    if (this.cartProductList != null && this.cartProductList.length > 0) {
      return this.cartProductList.filter(p => {
        return p.Selected == true;
      });
    }
    else {
      return [];
    }
  }

  CalculAccount() {
    var totalAccount = 0;
    var selectedProduct = this.GetSelectedProduct();
    selectedProduct.forEach(p => {
      totalAccount = totalAccount + (p.Quantity * p.Price);
    });
    return totalAccount;
  }
  checkProductListIsAvailable() {

    return this.cartProductList != null && this.cartProductList.length > 0;
  }

  checkSelectedProductListIsEmpty() {
    var selectedProductList = this.GetSelectedProduct();

    return this.GetSelectedProduct().length > 0
  }

}
