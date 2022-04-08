import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductComponent } from '../product/product.component';
import Swal from 'sweetalert2';
import { NotificationService } from '../notification.service';
import { DeleteComponent } from '../delete/delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationExtras, Router } from '@angular/router';
import { NgxImgZoomService } from 'ngx-img-zoom';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnChanges{//,AfterViewInit ,OnDestroy

  
 products:Product[]=[];
 productRating:any;
 rating:any=4;
 id:any;
 starRating=[];
 productId!:number;
p: number = 1;
isLoading=false;
displayedColumns: string[] = ['title', 'description', 'price', 'subCategoryId'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private productservice:ProductService,private dialog:MatDialog,private notifyService:NotificationService,
    private router:Router) { 
     
    }
  // ngAfterViewInit() {
  //   this.dataSource = new MatTableDataSource(this.products);
  //   this.dataSource.paginator = this.paginator;
  //   this.obs = this.dataSource.connect();
  // }
  ngOnChanges(id: any): void {
    this.getAllRatingsByProductId(id)
  }
  ngOnInit(): void {
    this.getAllProduct();
    // this.getAllRatingsByProductId(this.id);
    // this.dataSource.paginator=this.paginator;
  }
  
  getAllProduct()
  {
    this.productservice.GetAllProduct().subscribe(
      (Response:any)=>{
        // this.productId=Response;
        this.products=Response; 
        console.log(this.products);
        
        console.log(Response.product);
      },
      (error)=>{
        console.log(error);
        }
    )
  }
  getProductDeatilsById(e: any, i: number)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          Reference: i,
      }
     };
      this.router.navigate(['/productDetail'],navigationExtras);
    }
  getAllRatingsByProductId(id:any){
    alert('RatingClicked');
    this.productservice.getProductRatingByProductID().subscribe(
      (Response)=>{
        debugger
         this.productRating=Response;
          this.productRating = this.productRating.filter((x:any) => { 
          return x.ProductId == id  });
         console.log(this.productRating );
        // const ratingData = _context.ProductUserReviewRelations.Include(r=>r.ProductRating).Where(p => p.ProductTableId == productId).ToList();
        //  var ratingSum = ratingData.Sum(d => d.ProductRating.Ratings);
        //  var TotalProductCount = ratingData.Count();
         
        //  var finalRating = ratingSum/ TotalProductCount;
        //  return finalRating
     
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
    openDialog2(id:number,title:string)
    {
      alert(id)
      let dialogRef = this.dialog.open(DeleteComponent, {
        // width: '800px',
        autoFocus: false,
        panelClass: 'trend-dialog',
        data:{
          id:id,
          title:title,
        }
      });
      dialogRef.afterClosed().subscribe(
        (result) => {this.getAllProduct(); 
      });
    }
    // openDialog2(e:any,i:number)
    // {
    //   let dialogRef = this.dialog.open(DeleteComponent, {
    //     // width: '800px',
    //     autoFocus: false,
    //     panelClass: 'trend-dialog',
    //     data:{
    //       id:this.products[i].id,
    //       title:this.products[i].title,
    //     }
    //   });
    //   dialogRef.afterClosed().subscribe(
    //     (result) => {this.getAllProduct(); 
    //   });
    // }
  openDialog(e:any,i?:number)
  {
    if(i==null)
    {
    const dialogRef = this.dialog.open(ProductComponent,
      {
        width: '500px',
       
        
        data:{
          id:0}
      });
      debugger;
      dialogRef.afterClosed().subscribe(
        (result) => {this.getAllProduct(); 
      });
    }
    else{
      
      const dialogRef = this.dialog.open(ProductComponent,
        {
          width: '500px',
          
          data:{
            id:this.products[i].id,
            title:this.products[i].title,
            description:this.products[i].description,
            price:this.products[i].price,
            subCategoryId:this.products[i].subCategoryId,
            image:this.products[i].image,
            ratingAvg:this.products[i].ratingAvg
          }
        });
        dialogRef.afterClosed().subscribe(
          (result) => {this.getAllProduct();     
          });
    }
  }
  
}
