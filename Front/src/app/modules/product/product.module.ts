import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CreateProductModule } from './pages/create-product/create-product.module';
import { ModifyProductModule } from './pages/modify-product/modify-product.module';
import { ProductsModule } from './pages/products/products.module';
import { ProductCarModule } from './pages/product-car/product-car.module';
import { UserProductsModule } from './pages/user-products/user-products.module';
import { ProductService } from './services/product.service';
import { DbService } from './services/db.service';


@NgModule({
  declarations: [],
  imports: [
    UserProductsModule,
    ModifyProductModule,
    ProductCarModule,
    ProductsModule,
    CreateProductModule,
    CommonModule,
    ProductRoutingModule
  ],
  providers: [ProductService, DbService]
})
export class ProductModule { 
  constructor() {
    console.log("Called Product Module");
  }
}