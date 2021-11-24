import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { from } from 'rxjs';

import { ShopRoutingModule } from './shop-routing-module';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ],
  entryComponents:[
  ],
})

export class ShopModule { }
