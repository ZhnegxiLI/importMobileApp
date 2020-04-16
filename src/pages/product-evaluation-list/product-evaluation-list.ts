import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';
import { ENV } from '@app/env';

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
  private host = ENV.SERVER_API_URL;
  
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
    var criteria = null;
    switch(this.type){
      case 'GetCommentByProductId':
        var productId = this.navParams.get('productId');
        criteria = {
          ProductId: productId,
          Begin: this.counter,
          Step: this.step
        }
        break;
      case 'GetCommentByUserId':
        var userId = localStorage.getItem('userId');
        criteria = {
          UserId: userId,
          Begin: this.counter,
          Step: this.step
        }
      default:
        criteria = {
          Begin: this.counter,
          Step: this.step
        }
        break;
    }
    this.rest.GetProductCommentListByCriteria(criteria) //TODO: change
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
       // super.showToast(this.toastCtrl, error.Msg);
      },
      ()=>{
        this.loading= false;
      }
    );
  }

  doInfinite(infiniteScroll) {
    if (this.network.type != 'none') {
      var criteria = null;
      this.counter = this.counter + 1;
      switch (this.type) {
        case 'ProductEvaluationListPage':
          var productId = this.navParams.get('productId');
          criteria = {
            ProductId: productId,
            Begin: this.counter,
            Step: this.step
          }
          break;
          case 'GetCommentByUserId':
            var userId = localStorage.getItem('userId');
            criteria = {
              UserId: userId,
              Begin: this.counter,
              Step: this.step
            }
          default:
            criteria = {
              Begin: this.counter,
              Step: this.step
            }
            break;
      }
      

      this.rest.GetProductCommentListByCriteria(criteria) //TODO: change
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
        //  super.showToast(this.toastCtrl, error.Msg);
        }
      );
     
    }
    else {
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! "); //TODO:translate
    }
  }

}
