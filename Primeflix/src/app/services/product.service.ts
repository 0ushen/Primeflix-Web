import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import {
  ProductDto,
  ProductsClient,
} from '../web-api-client';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public currency: string = 'EUR';
  public catalogMode: boolean = false;
  public compareProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(
    public snackBar: MatSnackBar,
    private productsClient: ProductsClient
  ) {}

  private products(): Observable<ProductDto[]> {
    return this.productsClient.getAllProducts();
  }

  // Get Banners
  public getProducts(): Observable<ProductDto[]> {
    return this.products();
  }

  // Get Products By Id
  public getProduct(id: number): Observable<ProductDto> {
    return this.products().pipe(
      map((items) => {
        return items.find((item: ProductDto) => {
          return item.id === id;
        });
      })
    );
  }

  // Get Products By category
  public getProductByCategory(category: string): Observable<ProductDto[]> {
    return this.products().pipe(
      map((items) =>
        items.filter((item: ProductDto) => {
          if (category == 'all')
            return item;
          else
            return item.category === category;
        })
      )
    );
  }
}
