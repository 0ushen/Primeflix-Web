import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { from } from 'rxjs';

import { ShopRoutingModule } from './shop-routing-module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-details/product-zoom/product-zoom.component';
import { ProductComponent } from './product/product.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { AuthorizationModule } from '../authorization/authorization.module';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductListComponent,
    ProductZoomComponent,
    ProductComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    SwiperModule,
    AuthorizationModule
  ],
  exports: [
    ProductZoomComponent,
    ProductDialogComponent
  ],
  entryComponents:[
    ProductZoomComponent,
    ProductDialogComponent
  ],
})

export class ShopModule { }
