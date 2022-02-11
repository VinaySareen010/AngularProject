import { Component, Input, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductComponent } from '../product/product.component';
import Swal from 'sweetalert2';
import { UserComponent } from '../user/user.component';
import { NotificationService } from '../notification.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
products:Product[]=[];
p: number = 1;

displayedColumns: string[] = ['title', 'description', 'price','image'];
// public dataSource = new MatTableDataSource<Product>();
  constructor(private productservice:ProductService,private dialog:MatDialog,private notifyService:NotificationService) { }

  ngOnInit(): void {
    
    this.getAllProduct();
  }
  getAllProduct()
  {
    this.productservice.GetAllProduct().subscribe(
      (Response)=>{
        this.products=Response;
      },
      (error)=>{
        console.log(error);
        }
    )
  }
  onDelete(e:any,i:number)
  {
    alert(i)
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
            this.productservice.deleteProduct(this.products[i].id).subscribe(
              (Response)=>{
                this.getAllProduct();
                Swal.fire(
                  'Deleted!',
                  'Product Deleted Successfully',
                  'success'
                )
              },
              (error)=>{
                console.log(error);
              }
            )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'No Product Deleted!!!',
            'error'
          )
        }
      })
    }
  
  openDialog(e:any,i?:number)
  {
    if(i==null)
    {
      
    const dialogRef = this.dialog.open(ProductComponent,
      {
        width: '550px',
        height:'500px',
        data:{
          id:0}
      });
      dialogRef.afterClosed().subscribe(
        (result) => {this.getAllProduct(); 
      });
    }
    else{
      
      const dialogRef = this.dialog.open(ProductComponent,
        {
          width: '500px',
          height:'500px',
          data:{
            id:this.products[i].id,
            title:this.products[i].title,
            description:this.products[i].description,
            price:this.products[i].price,
            subCategoryId:this.products[i].subCategoryId,
            image:this.products[i].image
          }
        });
        dialogRef.afterClosed().subscribe(
          (result) => {this.getAllProduct();     
          });
    }
  }
  
}
