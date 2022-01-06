import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  public sidenavMenuItems: Array<any>;
  public currencies = ['USD', 'EUR'];
  public currency: any;
  public flags = [
    { name: 'English', image: 'assets/images/flags/gb.svg' },
  ];
  public flag: any;
  public banners = [];
  public url: any;

  products: Product[];
  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  wishlistItems: Product[] = [];

  constructor(public router: Router, private cartService: CartService) {
    this.cartService
      .getItems()
      .subscribe(
        (shoppingCartItems) => (this.shoppingCartItems = shoppingCartItems)
      );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }

  ngAfterViewInit() {}

  public changeLang(flag: any) {
    this.flag = flag;
  }
}
