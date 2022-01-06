import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shopping-widgets-two',
  templateUrl: './shopping-widgets-two.component.html',
  styleUrls: ['./shopping-widgets-two.component.sass'],
})
export class ShoppingWidgetsTwoComponent implements OnInit {
  products: Product[];
  indexProduct: number;

  public sidenavMenuItems: Array<any>;

  @Input() shoppingCartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    public productService: ProductService
  ) {}

  ngOnInit() {}

  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
}
