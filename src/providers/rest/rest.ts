
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timeout, catchError, mergeMap } from 'rxjs/operators'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ENV } from '@app/env';
import { Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { TranslateService } from '@ngx-translate/core';

import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from "@angular/common/http"; // Update new httpclient

import 'rxjs/add/operator/catch';
import 'rxjs/Rx';



@Injectable()
export class RestProvider {
  token:string;
  constructor( public http1: HttpClient,//
    public http: Http,
    public storage: Storage,
    public event: Events,
    public utils: UtilsProvider,
    public translate: TranslateService
  ) {
     this.loadToken();
  }

  async loadToken(){
    this.token  ='Bearer ' + await this.utils.getKey('token');
  }
  private host = ENV.SERVER_API_URL;
  private waitingTime = ENV.HTTP_WAITING_TIME;

  // private apiUrlLogin = this.host + "api/Auth/Login"; 



  /*
  * With auth services 
  */
  private apiUrlRefreshToken = this.host + "api/Token/Auth";

  private apiUrlUpdateUserInfo = this.host + "api/User/UpdateUserInfo";

  private apiUrlRegistre = this.host + "api/Account/Register";
  private apiUrlLogin = this.host + "api/Auth/Login";
  private apiUrlSendPasswordResetLink = this.host + "api/Account/SendPasswordResetLink";
  
  private apiUrlGetProductMainCategory = this.host + "api/Product/GetProductMainCategory";
  private apiUrlGetProductSecondCategory = this.host + "api/Product/GetProductSecondCategory";


  private apiUrlGetProductListBySecondCategory = this.host + "api/Product/GetProductListBySecondCategory";
  private apiUrlGetProductListBySecondCategoryWithAuth = this.host + "api/Product/GetProductListBySecondCategoryWithAuth";
  private apiUrlGetProductInfoByReferenceIds = this.host + "api/Product/GetProductInfoByReferenceIds";
  private apiUrlGetProductListByPublishDate = this.host + "api/Product/GetProductListByPublishDate";
  private apiUrlGetProductListBySalesPerformance = this.host + "api/Product/GetProductListBySalesPerformance";
  private apiUrlGetProductById = this.host + "api/Product/GetProductById";

  private apiUrlSaveProductComment = this.host + "api/Product/SaveProductComment";
  private apiUrlGetProductCommentListByCriteria = this.host + "api/Product/GetProductCommentListByCriteria";

  
  private apiUrlGetUserShippingAdress = this.host + "api/Adress/GetUserShippingAdress";
  private apiUrlGetUserFacturationAdress = this.host + "api/Adress/GetUserFacturationAdress";
  private apiUrlGetUserDefaultShippingAdress = this.host + "api/Adress/GetUserDefaultShippingAdress";
  private apiUrlCreateOrUpdateAdress = this.host +"api/Adress/CreateOrUpdateAdress";

  private apiUrlSaveOrder = this.host + "api/Order/SaveOrder";
  private apiUrlGetOrdersListByUserId = this.host + "api/Order/GetOrdersListByUserId";
  private apiUrlGetOrdersListByOrderId = this.host + "api/Order/GetOrdersListByOrderId";
  

  private apiUrlGetReferenceItemsByCategoryLabels = this.host + "api/Reference/GetReferenceItemsByCategoryLabels";
  /* Auth zoom start */

  private apiUrlCheckUserIsAlreadyExistAsync = this.host + "api/User/CheckUserIsAlreadyExistAsync";
  private apiUrlGetUserById = this.host + "api/User/GetUserById";


  private apiUrlSaveMessage = this.host + "api/Message/SaveMessage";

  private apiUrlGetFavoriteListByUserId = this.host +"api/Product/GetFavoriteListByUserId";

  
  private apiUrlAddIntoProductFavoriteList = this.host +"api/Product/AddIntoProductFavoriteList";

  private apiUrlSimpleProductSearch = this.host + "api/Product/SimpleProductSearch";

  private apiUrlAdvancedProductSearchClient = this.host + "api/Product/AdvancedProductSearchClient";

  private apiUrlGetProductByPrice = this.host + "api/Product/GetProductByPrice";
  
  UpdateUserInfo(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlUpdateUserInfo, criteria);
  }

  GetProductByPrice(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlGetProductByPrice,{params});
  }

  AdvancedProductSearchClient(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlAdvancedProductSearchClient, criteria);
  }

  SimpleProductSearch(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlSimpleProductSearch, {params});
  }


  GetFavoriteListByUserId(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlGetFavoriteListByUserId,{params})
  }

  AddIntoProductFavoriteList(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlAddIntoProductFavoriteList,{params})
  }


  getNewRefreshToken1(LoginInfo: any):Observable<any> {

    LoginInfo.GrantType = "refresh_token"
    LoginInfo.RefreshToken = localStorage.getItem('refreshToken');
    LoginInfo.UserName = localStorage.getItem('username');

    // todo add object
    return this.postUrlReturnWithOutAuth(this.apiUrlRefreshToken,LoginInfo);
  }

  getNewRefreshToken(LoginInfo: any):Observable<any> {

    LoginInfo.GrantType = "password"
    LoginInfo.UserName = LoginInfo.Email;

    // todo add object
    return this.postUrlReturnWithOutAuth(this.apiUrlRefreshToken,LoginInfo);
  }
  logout(){
    //todo
  }


  GetReferenceItemsByCategoryLabels(criteria): Observable<any> {
    criteria.Lang = this.translate.defaultLang;
    return this.postUrlReturnWithOutAuth(this.apiUrlGetReferenceItemsByCategoryLabels, criteria);
  }

  Registre(RegistrerInfo: object): Observable<any> {
    return this.postUrlReturnWithOutAuth(this.apiUrlRegistre, RegistrerInfo);
  }
  Login(LoginInfo: object): Observable<any> {
    return this.postUrlReturnWithOutAuth(this.apiUrlLogin, LoginInfo);
  }

  SendPasswordResetLink(Email:string) : Observable<any>{
    return this.getUrlReturnWithOutAuth(this.apiUrlSendPasswordResetLink + '?username='+Email);
  }
  /* Auth zoom end */

  /* Product zoom start */
  GetProductMainCategory(): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductMainCategory + "?Lang=" + lang);
  }
  GetProductSecondCategory(MainCategoryReferenceId: number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductSecondCategory + "?MainCategoryReferenceId=" + MainCategoryReferenceId + "&Lang=" + lang);
  }

  GetProductListByPublishDate(Begin: number, Step:number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturn1(this.apiUrlGetProductListByPublishDate,{Lang: lang, Begin: Begin, Step:Step});// todo change
  }

  GetProductListBySalesPerformance(Begin: number, Step:number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductListBySalesPerformance + 
       "?Lang=" + lang+"&Begin="+Begin+"&Step="+Step);
  }


  GetProductListBySecondCategory(SecondCategoryReferenceId: number, Begin: number, Step:number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductListBySecondCategory + 
      "?SecondCategoryReferenceId=" + SecondCategoryReferenceId + "&Lang=" + lang+"&Begin="+Begin+"&Step="+Step);
  }

  GetProductListBySecondCategoryWithAuth(SecondCategoryReferenceId: number, Begin: number, Step:number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturn(this.apiUrlGetProductListBySecondCategoryWithAuth + 
      "?SecondCategoryReferenceId=" + SecondCategoryReferenceId + "&Lang=" + lang+"&Begin="+Begin+"&Step="+Step);
  }

  GetProductInfoByReferenceIds(ReferenceIds): Observable<any> {
    var lang = this.translate.defaultLang; // TODO : change to with auth 
    return this.postUrlReturnWithOutAuth(this.apiUrlGetProductInfoByReferenceIds, { ReferenceIds: ReferenceIds, Lang: lang });
  }


  GetProductById(Id:number):  Observable<any> {
    var lang = this.translate.defaultLang; // TODO : change to with auth 
    var userId = localStorage.getItem('userId') || 0;
    return this.getUrlReturn(this.apiUrlGetProductById + "?ProductId=" + Id + "&Lang=" + lang + "&UserId="+ userId);
  }
  /* Product zoom end */


  /* Product comment zoom start */
  SaveProductComment(criteria): Observable<any>{
    // TODO : change to with auth 
    return this.postUrlReturnWithOutAuth(this.apiUrlSaveProductComment, criteria);
  }

  GetProductCommentListByCriteria(criteria:any): Observable<any>{
    // TODO : change to with auth 
    var lang = this.translate.defaultLang;

    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlGetProductCommentListByCriteria,{params});
  }

   /* Product comment zoom end */

   /* Order zoom start */
  SaveOrder(References:any[] ,ShippingAdressId:number, FacturationAdressId:number, UserId:number, ClientRemark: string): Observable<any> {
   // TODO : change to with auth 
    return this.postUrlReturnWithOutAuth(this.apiUrlSaveOrder, 
      { References: References, ShippingAdressId: ShippingAdressId, FacturationAdressId:FacturationAdressId,
        UserId: UserId, ClientRemark: ClientRemark});
  }
  GetOrdersListByUserId(UserId: number, OrderStatus: string ): Observable<any>{
    var lang = this.translate.defaultLang;
    return this.getUrlReturn(this.apiUrlGetOrdersListByUserId + 
      "?UserId="+UserId+"&StatusCode="+OrderStatus +"&Lang="+lang);
  }
  
  GetOrdersListByOrderId(OrderId: number): Observable<any>{
    var lang = this.translate.defaultLang;
    return this.getUrlReturn1(this.apiUrlGetOrdersListByOrderId,{OrderId: OrderId , Lang: lang});
  }
   /* Order zoom end */
  


  /* Adress zoom start */
  GetUserFacturationAdress(UserId): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetUserFacturationAdress + "?UserId="+UserId);
  }

  GetUserDefaultShippingAdress(UserId): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetUserDefaultShippingAdress + "?UserId="+UserId);
  }

  GetUserShippingAdress(UserId): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetUserShippingAdress + "?UserId="+UserId);
  }

  CreateOrUpdateAdress(criteria): Observable<any> {
    return this.postUrlReturnWithOutAuth(this.apiUrlCreateOrUpdateAdress,criteria);
  }
  /* Adress zoom end */


  SaveMessage (criteria): Observable<any>{
    return this.postUrlReturnWithOutAuth(this.apiUrlSaveMessage,criteria);
  }
 

  CheckUserIsAlreadyExistAsync(Username): Observable<any>  {
    return this.getUrlReturnWithOutAuth(this.apiUrlCheckUserIsAlreadyExistAsync+'?Username='+Username);
    
  }
  GetUserById(UserId): Observable<any>  {
    return this.getUrlReturnWithOutAuth(this.apiUrlGetUserById+'?UserId='+UserId);
  }

  // TODO: Login page remove all 
  private getUrlReturnWithOutAuth(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        timeout(20000),
        //       catchError(e => {
        //         return of({'error':'timeout'});
        //       })
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getToken(): Observable<any> {
    return Observable.fromPromise(this.storage.get('token').then(token => {
      //maybe some processing logic like JSON.parse(token)
      return token;
    }));
  }

  private  getUrlReturn1(url: string, criteria:any): Observable<any> {
    const headers = new HttpHeaders().set("Authorization",this.token).set("Content-Type","application/json");
    const params = new HttpParams({ fromObject: criteria });
    return this.http1.get(url,{headers:headers,params:params}).pipe(timeout(this.waitingTime)).catch(this.handleError); 
  }

  private  getUrlReturn(url: string): Observable<any> {
    const headers = new HttpHeaders().set("Authorization",this.token).set("Content-Type","application/json");
    //const params = new HttpParams({ fromObject: criteria });
    return this.http1.get(url,{headers:headers}).pipe(timeout(this.waitingTime),catchError(this.handleError));//.catch(this.handleError); 
  }

  private postUrlReturn(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders().set("Authorization",this.token).set("Content-Type","application/json");
    return this.http1.post(url,body,{headers:headers}).pipe(timeout(this.waitingTime)).catch(this.handleError); 
  }

  private postUrlReturnWithOutAuth(url: string, body: any): Observable<any> {
    return this.http.post(url, body)
      .pipe(
        timeout(20000),
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }



  private handleError(error: Response | any) {
    let errMsg: string;

    //TODO change
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      // Font-end error
      if (error.name != null && error.name == "TimeoutError") {
        //超时信息
        return Observable.throw({ Msg: "Network timeout, please check your network connection", Success: false });
      }
      console.error('Error: ', error.error.message);
    } else {
      // Back-end error
      // console.error(error.error);
      // if(error.status =='401'){
      //   // token invalide 
      // }else{
      //   return Observable.throw(error.error);
      // }

      return Observable.throw(error._body);
    }
  }
}
