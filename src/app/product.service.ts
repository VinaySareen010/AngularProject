import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './product';
import { SubCategory } from './sub-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private httpclient:HttpClient) { }
 
  GetAllProduct():Observable<Product[]>
  {
    return this.httpclient.get<Product[]>("https://localhost:44370/api/Product/GetAllProducts")
  }
  saveProduct(newProduct:Product):Observable<Product>
  {
    return this.httpclient.post<Product>("https://localhost:44370/api/Product/AddProduct",newProduct);
  }
  updateProduct(editProduct:Product):Observable<Product>
  {
    return this.httpclient.put<Product>("https://localhost:44370/api/Product/UpdateProduct",editProduct);
  }
  deleteProduct(id:number):Observable<any>
  {
    return this.httpclient.delete<any>("https://localhost:44370/api/Product/DeleteProduct?id="+id);
  }
  getsubCategories():Observable<SubCategory[]>
  {
    return this.httpclient.get<SubCategory[]>("https://localhost:44370/api/SubCategory");
  }
}
