import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,AfterViewInit {
  // pageEvent!:any;
  // pageLength!: number;
  // pageSize!: number;
  // pageSizeOptions = [2,5, 10, 25, 100];
products!:any[];
dataSource:any;
displayedColumns: string[] = ['title', 'description', 'price', 'subCategoryId'];
// dataSource = new MatTableDataSource<User>(this.products);
@ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public productService:ProductService) { }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
}
  ngOnInit(): void {
    this.getAllProduct();
    this.dataSource.paginator=this.paginator;
  }
  getAllProduct()
  {
    this.productService.GetAllProduct().subscribe(
      (Response)=>{
        this.products=Response;
        console.log(Response);
       
        // this.pageLength = this.products.length;
        
      },
      (error)=>{
        console.log(error);
        }
    )
  }

}
