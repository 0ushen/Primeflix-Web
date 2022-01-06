import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { AppSettings, Settings } from 'src/app/services/color-option.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public sidenavMenuItems: Array<any>;

  public currencies = ['EUR'];
  public currency: any;
  public flags = [{ name: 'English', image: 'assets/images/flags/gb.svg' }];
  public flag: any;

  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  public settings: Settings;

  constructor(
    private cartService: CartService,
    public appSettings: AppSettings
  ) {
    this.settings = this.appSettings.settings;
    this.cartService
      .getItems()
      .subscribe(
        (shoppingCartItems) => (this.shoppingCartItems = shoppingCartItems)
      );
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }

  public changeCurrency(currency: any) {
    this.currency = currency;
  }

  public changeLang(flag: any) {
    this.flag = flag;
  }
}
