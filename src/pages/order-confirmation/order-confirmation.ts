import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';
import { ENV } from '@app/env';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage extends BaseUI {

  private host = ENV.SERVER_API_URL;

  public TaxRate: number = 0;
  public ShippingMessage: string = "France de port 1500€HT, 2000€HT pour le sud de la France et 2500€HT pour les étangers."; 
  orderProductList: any[] = [];
  facturationAdress: any = {};
  defaultShippingAdress: any = {};

  public SavedOrder: boolean = false;
  public ChangeAddress: boolean = false;

  public remark: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider,
    public storage: Storage,
    public network: Network,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    super();
  }
  ionViewWillEnter() {
  }
  async ionViewDidEnter() {
    console.log('ionViewDidLoad OrderConfirmationPage');
    this.defaultShippingAdress = this.navParams.get('tempSelectedAdress')||  this.defaultShippingAdress;

    var facturationAdressChanged = await this.utils.getKey('tempFacturationAdress');
    if(facturationAdressChanged!=null && facturationAdressChanged=='true'){
      var UserId = await this.utils.getKey('userId');
      this.rest.GetUserFacturationAdress(UserId).subscribe(f=>{
        if(f.Success && f.Data != null){
          this.facturationAdress = f.Data;
        }
      });
      this.storage.remove('tempFacturationAdress');
    }
  }
  /* Leave current page: confimation */
  async ionViewCanLeave() {
    var shouldLeave;
    if(!this.SavedOrder && !this.ChangeAddress){
       shouldLeave = await this.confirmLeave();
    }
    return shouldLeave || this.SavedOrder || this.ChangeAddress;
  }

  confirmLeave(): Promise<Boolean> {
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);
    const alert = this.alertCtrl.create({
      title: 'Confirm leave',
      message: 'Do you want to leave the page?',// todo translate
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => resolveLeaving(false)
        },
        {
          text: 'Yes',
          handler: () => resolveLeaving(true)
        }
      ]
    });
    alert.present();
    return canLeave
  }


  ionViewDidLoad() {
    if (this.network.type != 'none') {
      var loading = super.showLoading(this.loadingCtrl,'En cours'); // TODO: translate
      var UserId =  localStorage.getItem('userId'); //await this.utils.getKey('userId');

      // Get selected product in cart 
      var selectedReferenceIds = [];
      var selectedReferences = this.navParams.get('References');
    
      selectedReferences.map(p => selectedReferenceIds.push(p.ReferenceId));
  
      Observable.forkJoin( this.rest.GetReferenceItemsByCategoryLabels({ShortLabels:['InAppMessage','TaxRate']}), this.rest.GetProductInfoByReferenceIds(selectedReferenceIds), this.rest.GetUserFacturationAdress(UserId), this.rest.GetUserDefaultShippingAdress(UserId))
        .subscribe(
          ([ReferenceList,SelectedProductInfo, FacturationAdress, ShippingAdress]) => {
            if (SelectedProductInfo!=null && SelectedProductInfo.length>0 &&
              FacturationAdress.Success && ShippingAdress.Success) {
                /* Bind the product data */
                this.formatProductData(SelectedProductInfo, selectedReferences);
                /* Bind the facturation adress data */
                this.facturationAdress = FacturationAdress.Data;
                /* Bind the shipping adress data */
               
                if(ShippingAdress.Data!=null){
                 // this.shippingAdress = ShippingAdress.Data;
                  this.defaultShippingAdress = ShippingAdress.Data;
                }
               
                // if(this.shippingAdress.length>0&&this.shippingAdress[0]!=null){//todo: change by default
                //   this.defaultShippingAdress = this.shippingAdress[0];
                // }
            }
            if(ReferenceList!=null && ReferenceList.length>0){
              ReferenceList.map(p=>{
                if(p.Code == "ShippingMessage"){
                  this.ShippingMessage = p.Label;
                }
                else if (p.ReferenceCategoryLabel == "TaxRate"){
                  this.TaxRate = p.Value;
                }
              });
            }
          },
          error => {
            this.navCtrl.pop();
            super.showToast(this.toastCtrl,"Internal error please try again");// TODO: translate
          },
          ()=>loading.dismiss());

    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }

  modifyFacturationAdress(facturationAdress){
    this.ChangeAddress = true;
    this.navCtrl.push('AddAdressPage',{
      type:'facturationAdress',
      adress:facturationAdress
    });
  }


  formatProductData(SelectedProductInfo, selectedReferences){

    /* Bind the data */
    this.orderProductList = SelectedProductInfo;
    /* Attach the quantity */
    this.orderProductList.map(p => {
      var temp = selectedReferences.find(x => {return x.ReferenceId == p.ReferenceId;} );
      if(temp!=null){
        p.Quantity = temp.Quantity;
      }
    });
    console.log(this.orderProductList);
  }

  calculTotalPrice(){
    var total = 0;
    this.orderProductList.map(p=> total = total + p.Price*p.Quantity);
    return total;
  }

  selectShippingAdress(){
    this.ChangeAddress = true;
    this.navCtrl.push('SelectShippingAdressPage',{CurrentAddressId: this.defaultShippingAdress!=null?this.defaultShippingAdress.Id:null});
  }


  async validOrder(){
    var productInfo =[];
    this.orderProductList.map(p=>productInfo.push({
      ReferenceId: p.ReferenceId,
      Quantity : p.Quantity
    }));
    var shippingAdressId;
    if(this.defaultShippingAdress!=null&&this.defaultShippingAdress!={}&& this.defaultShippingAdress["Id"]!=null){
       shippingAdressId = this.defaultShippingAdress["Id"];
    }
    if(shippingAdressId==null){
      super.showToast(this.toastCtrl,'Please select a shipping adress');// TODO translate
      return;
    }
  
    var facturationAdressId = this.facturationAdress["Id"];
    var UserId = Number.parseInt(await this.utils.getKey('userId'));
    if(productInfo.length>0&& shippingAdressId!=null){
      if (this.network.type != 'none') {
        var loading = super.showLoading(this.loadingCtrl,"En cours...");// TODO: translation
        this.rest.SaveOrder(productInfo,shippingAdressId, facturationAdressId,UserId , this.remark) // 填写url的参数
          .subscribe(
            async f => {
              if (f.Success&&f.Data!=null) {
                /*Step1: Show the successful message */
                super.showToast(this.toastCtrl, "Votre commande est bien passé, nous allons vous contacter dans un meilleur délais"); // todo translate
                
                /*Step2: Remove the already pass product */
                var cartProductList = JSON.parse( await this.utils.getKey('cartProductList'));
                var newCartProductList = [];
                cartProductList.forEach(p => {
                  if(productInfo.findIndex(x=>x.ReferenceId==p.ReferenceId)==-1){
                    newCartProductList.push(p);
                  }
                });
                this.SavedOrder = true;
                this.storage.set('cartProductList',JSON.stringify(newCartProductList));
                //this.navCtrl.setRoot('OrderConfirmationSucceessPage',{OrderId: f.Data});
                this.navCtrl.pop();
                let modal = this.modalCtrl.create('OrderConfirmationSucceessPage',{
                  Email: f.DataExt!= null ? f.DataExt:'',
                  OrderId : f.Data
                });
                modal.onDidDismiss(()=>{
       
                });
                modal.present();
              } else {
                super.showToast(this.toastCtrl, f.Msg);
              }
            },
            error => {
              super.showToast(this.toastCtrl, error.Msg);
            },
            ()=>{
              loading.dismiss();
            });
      }
      else  {
        super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
      }
    }
    else {
      super.showToast(this.toastCtrl,"Internal error, cannot valid your order for the moment"); // TODO: translate
    }
   
  }




}
