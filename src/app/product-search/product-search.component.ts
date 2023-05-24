import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchProductResponse, Product } from '../products';

import { fromEvent, from } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})

export class ProductSearchComponent implements OnInit{
  public products: any;
  public pageOffset = 0;
  public productsFound = true;
  public productsLoading = false;
  public searched_products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let search_box = document.getElementById('search') as HTMLInputElement;
    let search_box_keyup$ = fromEvent(search_box, 'keyup');
    search_box_keyup$
      .pipe(
        map((search_value: any) => search_value.currentTarget.value),
        debounceTime(350)
      )
    .subscribe((search_value) => {
      this.SearchProducts(search_value);
    });
  }
  
  
  async SearchProducts(search_value: string) {
    if (search_value.length == 0) {
      this.searched_products = [];
      this.productsFound = true;
      return;
    }
    await this.LoadProducts();
    this.searched_products = [];
    this.pageOffset = 0;
    const search_value_array = search_value.toLowerCase().split(' ').filter(search_term => search_term.trim().length > 0);
    const search_source = from(this.products);
    const _ = search_source.pipe(
      filter((product: any) => search_value_array.some((search_substring: string) => product.title.toLowerCase().includes(search_substring))),
    ).subscribe((product) => {
      this.searched_products.push(product);
    });

    if (this.searched_products.length == 0) {
      this.productsFound = false;
    } else {
      this.productsFound = true;
    }
  }
  
  async LoadProducts() {
    let promise = new Promise((resolve, reject) => {
    if (this.products == null && !this.productsLoading) {
      this.productsLoading = true;
        this.http.get('/assets/products.json')
          .pipe(
            map((response: SearchProductResponse) => response)
          )
          .subscribe((response) => {
            this.products = response.content as [Product?];
            this.productsLoading = false;
            resolve(this.products);
          });
    } else {
      resolve(this.products);
    }
    });
    return promise;
  }

  openProduct(name: string) {
    window.open('https://www.google.com/search?q=' + name, '_blank');
  }
}


