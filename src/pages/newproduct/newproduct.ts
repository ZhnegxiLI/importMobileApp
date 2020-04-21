import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../../providers/utils/utils';
import { ENV } from '@app/env';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-newproduct',
  templateUrl: 'newproduct.html',
})
export class NewproductPage extends BaseUI {
  loading: boolean = true;
  SecondReferenceId: number = 0;
  Title: string = '';
  productList: any[] = [];
  step: number = 10;
  counter: number = 0;
  PageType: string;

  public advancedSearchCriteria: any= {
    SearchText: null,
    MainCategory: null,
    SecondCategory: null,
    PriceInterval: { lower: 0, upper: 200 },
    MinQuantity: 200,
    OrderBy: null
  };

  private host = ENV.SERVER_API_URL;
  private logined: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public network: Network,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public utilis: UtilsProvider,
    public modalCtrl: ModalController,
    public translate: TranslateService) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewproductPage');
    
    this.checkLogined();
  }

  ionViewDidEnter() {
    this.PageType = this.navParams.get('PageType');
    this.SecondReferenceId = this.navParams.get('ReferenceId');
    this.Title = this.navParams.get('Title');
    this.loadProductList();
  }

  productDetail(product) {
    this.navCtrl.push('ProductDetailPage', {
      productId: product.ProductId
    });
  }

  async checkLogined() {

    this.logined =  await this.utilis.checkIsLogined();
  }

  loadProductList() {
    if (this.network.type != 'none' && this.PageType != null) {
      switch (this.PageType) {
        case 'BySecondCategory':
          this.rest.GetProductListBySecondCategory(this.SecondReferenceId, this.counter, this.step) // 填写url的参数
            .subscribe(
              f => {
                if (f.Success && f.Data != null) {
                  this.productList = f.Data.ProductListData;
                } else {
                  super.showToast(this.toastCtrl, f.Msg);
                }
              },
              error => {
                this.loading = false
                super.showToast(this.toastCtrl, error.Msg);
              },
              () => this.loading = false);
          break;
        case 'NewProduct':
          this.rest.GetProductListByPublishDate(this.counter, this.step) // 填写url的参数
            .subscribe(
              f => {
                if (f.Success && f.Data != null) {
                  this.productList = f.Data.ProductListData;
                } else {
                  super.showToast(this.toastCtrl, f.Msg);
                }
              },
              error => {
                super.showToast(this.toastCtrl, error.Msg);
                this.loading = false;
              },
              () => this.loading = false);
          break;
        case 'BestSalesProduct':
          this.rest.GetProductListBySalesPerformance(this.counter, this.step) // 填写url的参数
            .subscribe(
              f => {
                if (f.Success && f.Data != null) {
                  this.productList = f.Data.ProductListData;
                } else {
                  super.showToast(this.toastCtrl, f.Msg);
                }
              },
              error => {
                super.showToast(this.toastCtrl, error.Msg);
              },
              () => this.loading = false);
          break;

        case 'FavoriteList':
          this.rest.GetFavoriteListByUserId({
            UserId: localStorage.getItem('userId'),
            Lang: this.translate.defaultLang,
            Begin: this.counter,
            Step: this.step
          }) // 填写url的参数
            .subscribe(
              result => {
                if (result != null && result.TotalCount != null && result.List != null) {
                  this.productList = result.List;
                } else {
                  //super.showToast(this.toastCtrl, f.Msg);
                }
                this.loading = false
              },
              error => {
                //super.showToast(this.toastCtrl, error.Msg);
                this.loading = false
              });
          break;

        case 'SimpleProductSearch':
          this.rest.SimpleProductSearch({
            SearchText: this.navParams.get('SearchText'),
            Lang: this.translate.defaultLang,
            Begin: this.counter,
            Step: this.step
          }) // 填写url的参数
            .subscribe(
              result => {
                if (result != null && result.TotalCount != null && result.List != null) {
                  this.productList = result.List;
                } else {
                  //super.showToast(this.toastCtrl, f.Msg);
                }
                this.loading = false
              },
              error => {
                //super.showToast(this.toastCtrl, error.Msg);
                this.loading = false
              });
          break;

          case 'LowerPriceProduct':
            this.rest.GetProductByPrice({
              Lang: this.translate.defaultLang,
              Step: this.step,
              Begin: this.counter
            }) // 填写url的参数
              .subscribe(
                result => {
                  if (result != null && result.TotalCount != null && result.List != null) {
                    this.productList = result.List;
                  } else {
                    //super.showToast(this.toastCtrl, f.Msg);
                  }
                  this.loading = false
                },
                error => {
                  //super.showToast(this.toastCtrl, error.Msg);
                  this.loading = false
                });
            break;
        case 'AdvancedProductSearch':
          this.loading = true;
          if(this.advancedSearchCriteria != null){
            var criteria = this.advancedSearchCriteria;
            criteria.Begin = this.counter;
            criteria.Step = this.step;
            criteria.Lang = this.translate.defaultLang;
            criteria.PriceIntervalLower = this.advancedSearchCriteria.PriceInterval.lower;
            criteria.PriceIntervalUpper = this.advancedSearchCriteria.PriceInterval.upper;
            this.rest.AdvancedProductSearchClient(criteria) // 填写url的参数
              .subscribe(
                result => {
                  if (result != null && result.TotalCount != null && result.List != null) {
                    this.productList = result.List;
                  } else {
                    //super.showToast(this.toastCtrl, f.Msg);
                  }
                  this.loading = false
                },
                error => {
                  //super.showToast(this.toastCtrl, error.Msg);
                  this.loading = false
                });
          }
          else{
            this.loading = false;
          }
          break;
      }
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");//TODO: translate
    }
  }

  doInfinite(infiniteScroll) {
    if (this.network.type != 'none') {
      this.counter = this.counter + 1;
      switch (this.PageType) {
        case 'BySecondCategory':
          this.rest.GetProductListBySecondCategory(this.SecondReferenceId, this.counter, this.step) //TODO: change
            .subscribe(
              (f: any) => {
                if (f.Success) {
                  if (f["Data"].TotalCount <= this.step * this.counter) {
                    infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                  }
                  else {
                    this.productList = this.productList.concat(f["Data"].ProductListData != null ? f["Data"].ProductListData : []);
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
        case 'NewProduct':
          this.rest.GetProductListByPublishDate(this.counter, this.step) //TODO: change
            .subscribe(
              (f: any) => {
                if (f.Success) {
                  if (f["Data"].TotalCount <= this.step * this.counter) {
                    infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                  }
                  else {
                    this.productList = this.productList.concat(f["Data"].ProductListData != null ? f["Data"].ProductListData : []);
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
        case 'BestSalesProduct':
          this.rest.GetProductListBySalesPerformance(this.counter, this.step) //TODO: change
            .subscribe(
              (f: any) => {
                if (f.Success) {
                  if (f["Data"].TotalCount <= this.step * this.counter) {
                    infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                  }
                  else {
                    this.productList = this.productList.concat(f["Data"].ProductListData != null ? f["Data"].ProductListData : []);
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
        case 'FavoriteList':
          this.rest.GetFavoriteListByUserId({
            UserId: localStorage.getItem('userId'),
            Lang: this.translate.defaultLang,
            Begin: this.counter,
            Step: this.step
          }) //TODO: change
            .subscribe(
              (result: any) => {
                if (result != null && result.TotalCount != null && result.List != null) {
                  if (result.TotalCount <= this.step * this.counter) {
                    infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                  }
                  else {
                    this.productList = this.productList.concat(result.List != null ? result.List : []);
                    infiniteScroll.complete();
                  }
                } else {
                  //super.showToast(this.toastCtrl, f.Msg);
                }
              },
              error => {
                super.showToast(this.toastCtrl, error.Msg);
              }
            );
          break;

          case 'LowerPriceProduct':
            this.rest.GetProductByPrice({
              Lang: this.translate.defaultLang,
              Step: this.step,
              Begin: this.counter
            }) //TODO: change
              .subscribe(
                (result: any) => {
                  if (result != null && result.TotalCount != null && result.List != null) {
                    if (result.TotalCount <= this.step * this.counter) {
                      infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                    }
                    else {
                      this.productList = this.productList.concat(result.List != null ? result.List : []);
                      infiniteScroll.complete();
                    }
                  } else {
                    //super.showToast(this.toastCtrl, f.Msg);
                  }
                },
                error => {
                  super.showToast(this.toastCtrl, error.Msg);
                }
              );
            break;
          
        case 'SimpleProductSearch':
          this.rest.SimpleProductSearch({
            SearchText: this.navParams.get('SearchText'),
            Lang: this.translate.defaultLang,
            Begin: this.counter,
            Step: this.step
          }) //TODO: change
            .subscribe(
              (result: any) => {
                if (result != null && result.TotalCount != null && result.List != null) {
                  if (result.TotalCount <= this.step * this.counter) {
                    infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                  }
                  else {
                    this.productList = this.productList.concat(result.List != null ? result.List : []);
                    infiniteScroll.complete();
                  }
                } else {
                  //super.showToast(this.toastCtrl, f.Msg);
                }
              },
              error => {
                super.showToast(this.toastCtrl, error.Msg);
              }
            );
          break;

          
        case 'AdvancedProductSearch':
          if(this.advancedSearchCriteria!=null){
            var criteria = this.advancedSearchCriteria;
            criteria.Begin = this.counter;
            criteria.Step = this.step;
            criteria.Lang = this.translate.defaultLang;
            this.rest.AdvancedProductSearchClient(criteria) //TODO: change
              .subscribe(
                (result: any) => {
                  if (result != null && result.TotalCount != null && result.List != null) {
                    if (result.TotalCount <= this.step * this.counter) {
                      infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                    }
                    else {
                      this.productList = this.productList.concat(result.List != null ? result.List : []);
                      infiniteScroll.complete();
                    }
                  } else {
                    //super.showToast(this.toastCtrl, f.Msg);
                  }
                },
                error => {
                  super.showToast(this.toastCtrl, error.Msg);
                }
              );
          }
          break;
          
      }

    }
    else {
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! ");
    }
  }

  advancedSearchPage(){
    let searchCriteriaModal = this.modalCtrl.create('AdvancedSearchPage',{criteria: this.advancedSearchCriteria});
    searchCriteriaModal.present();
    searchCriteriaModal.onDidDismiss(result=>{
      if(result!=null){
        this.advancedSearchCriteria = result;
        this.loadProductList();
      }
    });
  }

  async addInCart(event: Event, item: any) {
    event.stopPropagation();
    var cartProductList = JSON.parse(await this.utilis.getKey('cartProductList'));
    if (cartProductList == null) {
      cartProductList = [];
    }
    var temp = cartProductList.find(p => p.ReferenceId == item.ReferenceId);
    if (temp == null) {
      if (item.Quantity == null) {
        item.Quantity = 0;
      }
      cartProductList.push(item);
    }
    cartProductList.forEach(p => {
      if (p.ReferenceId == item.ReferenceId) {
        p.Quantity = p.Quantity + 1;
      }
      if (p.Selected == null) {
        p.Selected = false;
      }
    });


    this.storage.set('cartProductList', JSON.stringify(cartProductList));

    super.showToast(this.toastCtrl, 'add successfully!')
  }

}
