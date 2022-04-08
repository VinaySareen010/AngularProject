import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryAddress, ShoppingCart } from './shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private httpClient:HttpClient) { }
  addToShoppingCart(addToCart:ShoppingCart):Observable<ShoppingCart>
  {
     return this.httpClient.post<ShoppingCart>("https://localhost:44370/api/ShoppingCart/SaveItemInShoppingCart",addToCart);
  }
  getShoppingCartDetailsByUserId(userId:number):Observable<ShoppingCart[]>
  {
    return this.httpClient.get<ShoppingCart[]>("https://localhost:44370/api/ShoppingCart/GetShoppingCartDetailsByProductId?userId="+userId)
  }
  getUserAddressByUserId(userId:number):Observable<DeliveryAddress[]>
  {
    return this.httpClient.get<DeliveryAddress[]>("https://localhost:44370/api/ShoppingCart/GetAddressByUserId?userId="+userId)
  }
  saveAddress(addressForm:DeliveryAddress):Observable<DeliveryAddress>
  {
    return this.httpClient.post<DeliveryAddress>("https://localhost:44370/api/ShoppingCart/saveAddressByUserId",addressForm);
  }
}
