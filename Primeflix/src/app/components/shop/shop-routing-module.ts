import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'src/app/guards/authorize.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

// Routes
const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'shop', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
