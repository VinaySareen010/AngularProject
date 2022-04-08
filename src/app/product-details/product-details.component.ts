import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, rating } from '../product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
ratingDisplay!:number;
cartData=new FormGroup({
  id:new FormControl(''),
  userId:new FormControl(''),
  productId:new FormControl(''),
  count:new FormControl(''),
  price:new FormControl('')
})
productData!:any;
products!:Product[];
productRating:rating=new rating();

ProductDetail:Product=new Product();
  constructor(private productservice:ProductService,private shoppingCartService:ShoppingCartService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.getAllProduct()
    this.router.queryParams.subscribe(
      (res)=>{
        this.productData=res['Reference'];});
  }
  getAllProduct()
  {
    this.productservice.GetAllProduct().subscribe(
      (Response)=>{
        debugger;
        console.log(Response);
        this.products=Response;
        const localData:any=this.products.filter((x)=>{return x.id==this.products[this.productData].id});
        this.ratingDisplay=localData[0].ratingAvg;
        this.ProductDetail.id=this.products[this.productData].id;
        this.ProductDetail.title=this.products[this.productData].title;
        this.ProductDetail.description=this.products[this.productData].description;
        this.ProductDetail.price=this.products[this.productData].price;
        this.ProductDetail.image=this.products[this.productData].image;
        this.ProductDetail.ratingAvg=this.products[this.productData].ratingAvg;
      },
      (error)=>{
        console.log(error);
        }
    )
  }
  rateProduct(rating:number){
    debugger;
    this.productRating.productId=this.ProductDetail.id;
    this.productRating.ratingAvg=rating;
    this.productservice.rateProduct(this.productRating).subscribe(
      (response)=>{
      this.getAllProduct();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  addToCart()
  {
    var currentUser:any=sessionStorage.getItem('currentUser');
    var userDetail:any=JSON.parse(currentUser);
    const userId=userDetail.id;
    this.cartData.setValue({
      id:0,
      userId:userId,
      productId:this.ProductDetail.id,
      count:1,
      price:0
    })
    console.log(this.cartData.value);
    this.shoppingCartService.addToShoppingCart(this.cartData.value).subscribe(
      (response)=>{
       this.route.navigateByUrl("/shoppingCart");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}


