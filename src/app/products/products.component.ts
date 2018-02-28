import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './product.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [NgbDropdownConfig]
})
export class ProductsComponent implements OnInit {

  products = [];
  myCartProducts = [];
  productsLazyLoad = {
    totalCount: 0,
    skip: 0,
    limit: 10
  };
  isLoading = false;
  constructor(private productService: ProductService, private renderer: Renderer2, private el: ElementRef) {
    this.renderer.listen('window', 'scroll',  (event) => {
      if (!this.isLoading && this.products.length < this.productsLazyLoad.totalCount &&
        event.path[1].scrollY + event.path[1].innerHeight === event.path[0].documentElement.offsetHeight) {
        this.loadMoreProducts();
      }
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe((products) => {
      this.isLoading = false;
      this.products = products.slice(0, 10);
      this.productsLazyLoad = {
        totalCount: products.length,
        skip: 10,
        limit: 10
      };
    });
  }

  loadMoreProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe((products) => {
      this.isLoading = false;
      const newData = products.slice(this.productsLazyLoad.skip, (this.productsLazyLoad.skip + this.productsLazyLoad.limit));
      this.products = [...this.products, ...newData];
      this.productsLazyLoad = {
        totalCount: products.length,
        skip: this.productsLazyLoad.skip + this.productsLazyLoad.limit,
        limit: 10
      };
    });
  }

  addToCart(p) {
    this.myCartProducts.push(p);
    // alertify.log('Item Added to cart');
  }

  remoteCartProduct(index) {
    this.myCartProducts.splice(index, 1);
  }

  getTotalAmount() {
    let totalAmount = 0;
    _.each(this.myCartProducts, _p => {
      totalAmount = totalAmount += _p.price;
    });
    return totalAmount;
  }

}

export class NgbdDropdownConfig {
  constructor(config: NgbDropdownConfig) {
    config.autoClose = false;
  }
}
