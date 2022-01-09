import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { AppSettings, Settings } from 'src/app/services/color-option.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: Observable<boolean>;

  public sidenavMenuItems: Array<any>;

  public currencies = ['EUR'];
  public currency: any;
  public flags = [{ name: 'English', image: 'assets/images/flags/gb.svg' }];
  public flag: any;

  public keyword: string = '';

  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  public settings: Settings;

  constructor(
    private cartService: CartService,
    private router: Router,
    public appSettings: AppSettings,
    public authorizeService: AuthorizeService
  ) {
    this.settings = this.appSettings.settings;
    this.cartService
      .getItems()
      .subscribe(
        (shoppingCartItems) => (this.shoppingCartItems = shoppingCartItems)
      );
  }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }

  public changeCurrency(currency: any) {
    this.currency = currency;
  }

  public changeLang(flag: any) {
    this.flag = flag;
  }

  public onSubmit(f: NgForm){
    this.router.navigate(['/shop'], { queryParams: { search: f.value.keyword } });
  }
}
