import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductDto } from 'src/app/web-api-client';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass'],
})
export class ProductDialogComponent implements OnInit {
  public products: ProductDto[] = [];
  public counter: number = 1;
  public variantImage: any = '';
  public selectedColor: any = '';
  public selectedSize: any = '';

  constructor(
    private router: Router,
    public productsService: ProductService,
    private cartService: CartService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: ProductDto
  ) {}

  ngOnInit() {
    this.productsService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  public addToCart(product: ProductDto, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }

  public close(): void {
    this.dialogRef.close();
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  public buyNow() {
    this.router.navigate(['/home/product', this.product.id]);
    this.close();
  }
}
