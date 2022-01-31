import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
products:Product[]=[];

displayedColumns: string[] = ['title', 'description', 'price','image'];
// public dataSource = new MatTableDataSource<Product>();
  constructor(private productservice:ProductService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct()
  {
    this.productservice.GetAllProduct().subscribe(
      (Response)=>{
        this.products=Response;
         console.log(Response);
       
      },
      (error)=>{
        console.log(error);
        }
    )
  }
  openDialog()
  {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open(ProductComponent, dialogConfig);
  }

}
