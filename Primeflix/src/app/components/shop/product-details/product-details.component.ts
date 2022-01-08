import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { PaginatedListOfProductDto, ProductDto } from 'src/app/web-api-client';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass'],
})
export class ProductDetailsComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public config: SwiperConfigInterface = {};
  public product: ProductDto = new ProductDto();
  public products: ProductDto[] = [];
  public image: any;
  public zoomImage: any;
  public counter: number = 1;

  index: number;
  bigProductImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    public productsService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private cartService: CartService
  ) {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.productsService
        .getProduct(id)
        .subscribe((product) => (this.product = product));
    });
  }

  ngOnInit() {
    this.productsService
      .getProducts()
      .subscribe((products) => (this.products = products));

    this.getRelatedProducts();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1,
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },
      },
    };
  }

  public openProductDialog(product: any, bigProductImageIndex: any) {
    let dialogRef = this.dialog.open(ProductZoomComponent, {
      data: { product, index: bigProductImageIndex },
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

  public selectImage(index: number) {
    this.bigProductImageIndex = index;
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  getRelatedProducts() {
    this.productsService
      .getProducts()
      .subscribe((products: ProductDto[]) => {
        this.products = products;
      });
  }

  public addToCart(product: ProductDto, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }

  public buyNow(product: ProductDto, quantity) {
    if (quantity > 0) this.cartService.addToCart(product, parseInt(quantity));
    this.router.navigate(['/pages/checkout']);
  }

  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = (offsetX / image.offsetWidth) * 100;
      y = (offsetY / image.offsetHeight) * 100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = 'block';
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave() {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog',
    });
  }
}
