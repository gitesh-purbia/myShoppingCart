import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Products } from './product';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message.service';

@Injectable()
export class ProductService {

  private productsUrl = 'assets/product.json';

  products = [];
  constructor(private http: HttpClient, private messageService: MessageService) {

  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl).pipe(
      tap(products => this.log(`Fetched Products`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
