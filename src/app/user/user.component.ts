import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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
displayedColumns: string[] = ['title', 'description', 'price', 'subCategoryId','image'];
// dataSource = new MatTableDataSource<User>(this.products);
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  constructor(public productService:ProductService,private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
  ngOnInit(): void {
    this.getAllProduct();
    this.dataSource.paginator=this.paginator;
  }
  getAllProduct()
  {
    this.productService.GetAllProduct().subscribe(
      (response)=>{
        console.log(response);
        this.products=response;
       
       
        // this.pageLength = this.products.length;
        
      },
      (error)=>{
        console.log(error);
        }
    )
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
