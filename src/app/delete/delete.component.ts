import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
id:number=0;
title:string="";
  constructor(private productservice: ProductService, private dialogConfig: MatDialogRef<DeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: Product) { }

  ngOnInit(): void {
  this.id=this.data.id,
    this.title=this.data.title
  }
  onDelete() {

    this.productservice.deleteProduct(this.id).subscribe(     
      (Response) => {
        this.onNoClick();
      },
      (error) => {
        console.log(error);
      }   
    );
  }
  onNoClick() {                   //after save and update Close dialog box
    this.dialogConfig.close();
  }
}
