import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ProductComponent } from './product.component';
import { SharedModule, PanelModule } from 'primeng/primeng';
import {CardModule} from 'primeng/card';
import {ProductService} from './product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	product_code:String;
  	product_name:String;
  	product_price:Number;
  	product_gst:Number;

  constructor( 
  	private productService:ProductService,
  	//private router: Router
  ){}

  ngOnInit() {
  	this.show_me();
  }
  show_me()
  {
  	console.log("qwerty");
  }
  addproduct()
  {
  	console.log("click");
  	event.preventDefault();
    let product_code = this.product_code;
    let product_name = this.product_name;
    let product_price = this.product_price;
    let product_gst = this.product_gst;

    let data={
      "product_code":product_code,
      "product_name":product_name,
      "product_price":product_price,
      "product_gst":product_gst
    }
    console.log(data);
    this.productService.addProduct(data).subscribe(response=> {
      console.log(response);
      let res = response;
      console.log("added");
    }); 
  }
}
