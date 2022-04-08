import { identifierModuleUrl } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../notification.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { SubCategory } from '../sub-category';
import { FormGroup,FormControl } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
image:string=""; //image show
newProduct:Product=new Product(); //for 2wayBinding
subCategory:SubCategory[]=[]; //for subcategory List Show
product=new FormGroup({     // useformGroup|
id:new FormControl(''),                     
title:new FormControl(''),
description:new FormControl(''),
price:new FormControl(''),
subCategoryId:new FormControl(''),
image:new FormControl(''),
ratingAvg:new FormControl('')
});
  constructor(private productservice:ProductService,private dialogConfig: MatDialogRef<ProductComponent>,@Inject(MAT_DIALOG_DATA) public data:Product
       ,private notifyService:NotificationService ){ }

  ngOnInit(): void {
    this.getSubCategories();       
    this.product.patchValue({                     //Set value in text box in case of edit
      id:this.data.id,
      title:this.data.title,
      description:this.data.description,
      price:this.data.price,
      subCategoryId:this.data.subCategoryId,
      image:this.data.image,
      ratingAvg:this.data.ratingAvg
    });
    this.image=this.data.image       //show image in edit case
    //ngModel TwoWay Binding
      // this.newProduct.id=this.data.id;
      // this.newProduct.title=this.data.title;
      // this.newProduct.description=this.data.description;
      // this.newProduct.price=this.data.price;
      // this.newProduct.subCategoryId=this.data.subCategoryId;
      // this.newProduct.image=this.data.image

    }
    getSubCategories()  //Get All CategoryList
    {
      this.productservice.getsubCategories().subscribe(
        (Response)=>{
           this.subCategory=Response;
           console.log(Response);
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  submit()   //Save and Update Product with if Condition
  {
   if(this.product.value.id==0)
   {
     this.saveProduct();
   }
   else{
     this.UpdateProduct();
   }
  }
  saveProduct()
  {
    console.warn(this.product.value);
    this.product.value.id=0;
    this.productservice.saveProduct(this.product.value).subscribe(
      (response)=>{ 
       this.notifyService.showSuccess("Product Saved Successfully");
       this.onNoClick();
      }
      );
  }
  UpdateProduct()     //Update Product Method
  {
    debugger;
    this.productservice.updateProduct(this.product.value).subscribe(
      (response)=>{
        this.notifyService.showSuccess("Product Updated Successfully");
        this.onNoClick();
      }
    )
  }
  onUploadChange(e:any)      //Chose and convert image in base64
  {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.image=reader.result as string;
        this.product.patchValue({
            image:reader.result
        });
  }
}
onNoClick() {                //after save and update Close dialog box
  this.dialogConfig.close();
}
}
