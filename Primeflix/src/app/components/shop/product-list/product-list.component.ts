import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ColorFilter } from 'src/app/models/product.model';
import { FormGroup } from '@angular/forms';
import { ProductDto } from 'src/app/web-api-client';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  public sidenavOpen: boolean = true;
  public sortByOrder: string = '';
  public page: any;
  public tagsFilters: any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public filterForm: FormGroup;
  public colorFilters: ColorFilter[] = [];

  public items: ProductDto[] = [];
  public allItems: ProductDto[] = [];
  public products: ProductDto[] = [];
  public tags: any[] = [];
  public colors: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(() => {
      // const category = params['category'];
      const category = 'all';
      this.productService
        .getProductByCategory(category)
        .subscribe((products) => {
          this.allItems = products;
          this.products = products.slice(0.8);
          this.getTags(products);
          this.getColors(products);
        });
    });
  }

  ngOnInit() {}

  public getTags(products: any[]) {
    var uniqueBrands = [];
    var itemBrand = Array();
    products.map((product: { tags: any[] }) => {
      if (product.tags) {
        product.tags.map((tag: any) => {
          const index = uniqueBrands.indexOf(tag);
          if (index === -1) uniqueBrands.push(tag);
        });
      }
    });
    for (var i = 0; i < uniqueBrands.length; i++) {
      itemBrand.push({ brand: uniqueBrands[i] });
    }
    this.tags = itemBrand;
  }

  public getColors(products: any[]) {
    var uniqueColors = [];
    var itemColor = Array();
    products.map((product: { colors: any[] }) => {
      if (product.colors) {
        product.colors.map((color: any) => {
          const index = uniqueColors.indexOf(color);
          if (index === -1) uniqueColors.push(color);
        });
      }
    });
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] });
    }
    this.colors = itemColor;
  }

  public changeViewType(viewType: string, viewCol: number) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  // public updateTagFilters(tags: any[]) {
  //   this.tagsFilters = tags;
  // }

  public onChangeSorting(val: string) {
    this.sortByOrder = val;
  }

  public onChangeSearch(val: string) {
    this.allItems = this.products.filter((item: ProductDto) => {
      return item.name.toLocaleLowerCase().includes(val.toLocaleLowerCase());
    });
  }

  // public filterItems(): ProductDto[] {
  //   return this.items.filter((item: ProductDto) => {
  //     const Colors: boolean = this.colorFilters.reduce((prev, curr) => {
  //       if (item.colors) {
  //         if (item.colors.includes(curr.color)) {
  //           return prev && true;
  //         }
  //       }
  //     }, true);
  //     const Tags: boolean = this.tagsFilters.reduce((prev, curr) => {
  //       if (item.tags) {
  //         if (item.tags.includes(curr)) {
  //           return prev && true;
  //         }
  //       }
  //     }, true);
  //     return Colors && Tags; // return true
  //   });
  // }

  public onPageChanged(event: any) {
    this.page = event;
    this.allItems;
    window.scrollTo(0, 0);
  }

  // public updatePriceFilters(price: any) {
  //   this.allItems = this.products.filter((item: ProductDto) => {
  //     return item.price >= price.priceFrom && item.price <= price.priceTo;
  //   });
  //   console.log(this.products);
  // }

  // onBrendsChanged(newBrend: string) {
  //   console.log(newBrend);
  //   this.allItems =
  //     newBrend === 'all'
  //       ? this.products
  //       : this.products.filter((item) => item.brand === newBrend);
  //   console.log(this.allItems);
  // }
}
