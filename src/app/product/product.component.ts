import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
newProduct:Product=new Product();

  constructor(private productservice:ProductService) { }

  ngOnInit(): void {
  }
  saveProduct()
  {
   alert(this.newProduct.title);
   alert(this.newProduct.price);
   this.newProduct.id=0;
   this.productservice.saveProduct(this.newProduct).subscribe(
     (response)=>{

     },
     (error)=>{
       console.log(error);
     }
     );
  }

}
