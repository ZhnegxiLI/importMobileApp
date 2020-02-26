import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-product-evaluation-list',
  templateUrl: 'product-evaluation-list.html',
})
export class ProductEvaluationListPage extends BaseUI{
  type:string;
  step: number = 10;
  counter: number = 0;
  productCommentList: any[] = [];
  loading:boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public network : Network,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductEvaluationListPage');
    this.type = this.navParams.get('type');
    this.loadProductComment();
  }
  loadProductComment(){
    switch(this.type){
      case 'GetCommentByProductId':
        var productId = this.navParams.get('productId');
        this.rest.GetProductCommentListByProductId(productId, this.counter, this.step) //TODO: change
        .subscribe(
          (f: any) => {
            if (f.Success) {
              console.log(f["Data"].ProductCommentListData)//todo: remove
                this.productCommentList = f["Data"].ProductCommentListData;
            } else {
              super.showToast(this.toastCtrl, f.Msg);
            }
          },
          error => {
            super.showToast(this.toastCtrl, error.Msg);
          },
          ()=>{
            this.loading= false;
          }
        );
        break;
      default:
        break;
    }
  }

  doInfinite(infiniteScroll) {
    if (this.network.type != 'none') {
      this.counter = this.counter + 1;
      switch (this.type) {
        case 'ProductEvaluationListPage':
          var productId = this.navParams.get('productId');
          this.rest.GetProductCommentListByProductId(productId, this.counter, this.step) //TODO: change
          .subscribe(
            (f: any) => {
              if (f.Success) {
                if (f["Data"].TotalCount <= this.step * this.counter) {
                  infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                }
                else {
                  this.productCommentList = this.productCommentList.concat(f["Data"].ProductCommentListData != null ? f["Data"].ProductCommentListData : []);
                  infiniteScroll.complete();
                }
              } else {
                super.showToast(this.toastCtrl, f.Msg);
              }
            },
            error => {
              super.showToast(this.toastCtrl, error.Msg);
            }
          );
          break;
        case 'NewProduct'://todo: change

          break;
        case 'BestSalesProduct':// todo change
        
          break;
      }
     
    }
    else {
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! "); //TODO:translate
    }
  }

}
