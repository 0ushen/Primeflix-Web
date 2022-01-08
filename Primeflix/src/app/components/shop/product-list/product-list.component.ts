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
  public stock: string = 'all';
  public category: string = 'all';
  public search: string = '';
  public page: any;
  public tagsFilters: any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public filterForm: FormGroup;
  public colorFilters: ColorFilter[] = [];

  public items: ProductDto[] = [];
  public allItems: ProductDto[] = [];
  public products: ProductDto[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search = params['search'];
      this.productService
        .getProductByCategory("all")
        .subscribe((products) => {
          this.products = products.slice(0.8);
          this.reEvaluateSearch();
        });
    });
  }

  public getCategories() {
    let categories = this.products.map(x => x.category);
    let set = new Set<string>(categories);

    return set;
  }

  public changeViewType(viewType: string, viewCol: number) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public onChangeSorting(val: string) {
    this.sortByOrder = val;
    this.reEvaluateSearch();
  }

  public onChangeInStock(val: string) {
    this.stock = val;
    this.reEvaluateSearch();
  }

  public onChangeCategory(val: string) {
    this.category = val;
    this.reEvaluateSearch();
  }

  public onChangeSearch(val: string) {
    this.allItems = this.products.filter((item: ProductDto) => {
      return item.name.toLocaleLowerCase().includes(val.toLocaleLowerCase());
    });
    this.search = val;
    this.reEvaluateSearch();
  }

  public onPageChanged(event: any) {
    this.page = event;
    this.allItems;
    window.scrollTo(0, 0);
  }

  public reEvaluateSearch(){
    this.allItems = this.products.filter((item: ProductDto) => {
      let searchValid = this.matchKeyWord(item, this.search);
      let stockValid = this.isInStock(item, this.stock);
      let categoryValid = this.isInCategory(item, this.category);

      return searchValid
      && stockValid
      && categoryValid
    });
  }

  private isInCategory(item: ProductDto, category: string) {
    if(!category || category == "all")
      return true;

    return item.category == category;
  }

  private isInStock(item: ProductDto, stock: string) {
    switch(stock){
      case "in-stock":
        return item.stock > 0;
      case "all":
      default:
        return true;
    }
  }

  private matchKeyWord(item: ProductDto, keyword: string){
    if(!keyword)
      return true;

    return item.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  }
}
