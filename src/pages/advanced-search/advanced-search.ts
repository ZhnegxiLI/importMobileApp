import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html',
})
export class AdvancedSearchPage extends BaseUI {

  public criteria: any = {
    SearchText: null,
    MainCategory: null,
    SecondCategory: null,
    PriceInterval: { lower: 0, upper: 200 },
    MinQuantity: 200,
    OrderBy: null
  };
  public ReferenceList : any[] = [];
  public MainCategoryList : any[] = [];

  public OrderByList: any[] = [
    'Price_Increase',
    'Price_Decrease',
    'PublishDate_Recent',
    'Porpularity_More'
  ];

  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public translateService: TranslateService, public navParams: NavParams, public rest:RestProvider, public network: Network, public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvancedSearchPage');
    this.criteria = this.navParams.get('criteria') || this.criteria;
    this.loadMainCategoryAndSecondCategory();
  }

  translateOrderByItem(item){
    return this.translateService.instant('advanced-search.'+item);
  }
  loadMainCategoryAndSecondCategory(){
    if (this.network.type != 'none') {
      this.rest.GetReferenceItemsByCategoryLabels({ShortLabels:['MainCategory','SecondCategory'],Lang:this.translateService.defaultLang}).subscribe(result=>{
        if(result!=null && result.length>0){
          this.ReferenceList = result;
          this.MainCategoryList = result.filter(f=>f.ReferenceCategoryLabel=="MainCategory");
        }
      },
      error=>{
        super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
      });
    }
    else{
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getSecondCategoryList () {
    if(this.criteria.MainCategory!=null){
      return this.ReferenceList.filter(p=>p.ParentId == this.criteria.MainCategory);
    }
    else{
      return [];
    }
  }

  search(){
    this.viewCtrl.dismiss(this.criteria);
  }

}
