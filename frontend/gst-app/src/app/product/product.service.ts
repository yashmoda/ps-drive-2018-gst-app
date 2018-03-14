import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {HttpClientModule,HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpModule } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {
  private serverURL ='http://localhost:8000/';

  constructor(private http:HttpClient) { }

  addProduct(data){
  	let url = this.serverURL + 'add_product';
  	let headers =  {headers: new  HttpHeaders({ 'Content-Type':  'application/json'})};
    return this.http.post(url,data,headers)
    //.map(this.extractData)
    //.catch(this.handleError);
  }
}