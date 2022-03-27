import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../models/product";
import {first, Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  add(product: Product) {
    return this.http.post<Product>(`${environment.apiUrl}/products`, product)
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`, {responseType: 'text'})
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
  }
}
