import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = "https://localhost:5001";


export interface IProductsClient {
  getProductsWithPagination(listId: number | undefined, pageNumber: number | undefined, pageSize: number | undefined): Observable<PaginatedListOfProductDto>;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsClient implements IProductsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient) {
      this.http = http;
      this.baseUrl = API_BASE_URL !== undefined && API_BASE_URL !== null ? API_BASE_URL : "";
  }

  getProductsWithPagination(listId: number | undefined, pageNumber: number | undefined, pageSize: number | undefined) : Observable<PaginatedListOfProductDto> {
      let url_ = this.baseUrl + "/api/Products?";
      if (listId === null)
          throw new Error("The parameter 'listId' cannot be null.");
      else if (listId !== undefined)
          url_ += "ListId=" + encodeURIComponent("" + listId) + "&";
      if (pageNumber === null)
          throw new Error("The parameter 'pageNumber' cannot be null.");
      else if (pageNumber !== undefined)
          url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
      if (pageSize === null)
          throw new Error("The parameter 'pageSize' cannot be null.");
      else if (pageSize !== undefined)
          url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Accept": "application/json"
          })
      };

      return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processGetProductsWithPagination(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processGetProductsWithPagination(<any>response_);
              } catch (e) {
                  return <Observable<PaginatedListOfProductDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<PaginatedListOfProductDto>><any>_observableThrow(response_);
      }));
  }

  protected processGetProductsWithPagination(response: HttpResponseBase): Observable<PaginatedListOfProductDto> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = PaginatedListOfProductDto.fromJS(resultData200);
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<PaginatedListOfProductDto>(<any>null);
  }
}

export class PaginatedListOfProductDto implements IPaginatedListOfProductDto {
  items?: ProductDto[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;

  constructor(data?: IPaginatedListOfProductDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          if (Array.isArray(_data["items"])) {
              this.items = [] as any;
              for (let item of _data["items"])
                  this.items!.push(ProductDto.fromJS(item));
          }
          this.pageNumber = _data["pageNumber"];
          this.totalPages = _data["totalPages"];
          this.totalCount = _data["totalCount"];
          this.hasPreviousPage = _data["hasPreviousPage"];
          this.hasNextPage = _data["hasNextPage"];
      }
  }

  static fromJS(data: any): PaginatedListOfProductDto {
      data = typeof data === 'object' ? data : {};
      let result = new PaginatedListOfProductDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      data["pageNumber"] = this.pageNumber;
      data["totalPages"] = this.totalPages;
      data["totalCount"] = this.totalCount;
      data["hasPreviousPage"] = this.hasPreviousPage;
      data["hasNextPage"] = this.hasNextPage;
      return data;
  }
}

export interface IPaginatedListOfProductDto {
  items?: ProductDto[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export class ProductDto implements IProductDto {
  id?: number;
  name?: string;
  price?: number;
  salePrice?: number;
  discount?: number;
  pictures?: Picture[];
  shortDetails?: string;
  description?: string;
  stock?: number;
  brand?: string;
  newPro?: boolean;
  sale?: boolean;
  category?: string;
  tags?: string[];
  colors?: string[];

  constructor(data?: IProductDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.name = _data["name"];
          this.price = _data["price"];
          this.salePrice = _data["salePrice"];
          this.discount = _data["discount"];
          if (Array.isArray(_data["pictures"])) {
              this.pictures = [] as any;
              for (let item of _data["pictures"])
                  this.pictures!.push(Picture.fromJS(item));
          }
          this.shortDetails = _data["shortDetails"];
          this.description = _data["description"];
          this.stock = _data["stock"];
          this.brand = _data["brand"];
          this.newPro = _data["newPro"];
          this.sale = _data["sale"];
          this.category = _data["category"];
          if (Array.isArray(_data["tags"])) {
              this.tags = [] as any;
              for (let item of _data["tags"])
                  this.tags!.push(item);
          }
          if (Array.isArray(_data["colors"])) {
              this.colors = [] as any;
              for (let item of _data["colors"])
                  this.colors!.push(item);
          }
      }
  }

  static fromJS(data: any): ProductDto {
      data = typeof data === 'object' ? data : {};
      let result = new ProductDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["name"] = this.name;
      data["price"] = this.price;
      data["salePrice"] = this.salePrice;
      data["discount"] = this.discount;
      if (Array.isArray(this.pictures)) {
          data["pictures"] = [];
          for (let item of this.pictures)
              data["pictures"].push(item.toJSON());
      }
      data["shortDetails"] = this.shortDetails;
      data["description"] = this.description;
      data["stock"] = this.stock;
      data["brand"] = this.brand;
      data["newPro"] = this.newPro;
      data["sale"] = this.sale;
      data["category"] = this.category;
      if (Array.isArray(this.tags)) {
          data["tags"] = [];
          for (let item of this.tags)
              data["tags"].push(item);
      }
      if (Array.isArray(this.colors)) {
          data["colors"] = [];
          for (let item of this.colors)
              data["colors"].push(item);
      }
      return data;
  }
}

export interface IProductDto {
  id?: number;
  name?: string;
  price?: number;
  salePrice?: number;
  discount?: number;
  pictures?: Picture[];
  shortDetails?: string;
  description?: string;
  stock?: number;
  brand?: string;
  newPro?: boolean;
  sale?: boolean;
  category?: string;
  tags?: string[];
  colors?: string[];
}

export class Picture implements IPicture {
  small?: string;
  big?: string;

  constructor(data?: IPicture) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.small = _data["small"];
          this.big = _data["big"];
      }
  }

  static fromJS(data: any): Picture {
      data = typeof data === 'object' ? data : {};
      let result = new Picture();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["small"] = this.small;
      data["big"] = this.big;
      return data;
  }
}

export interface IPicture {
  small?: string;
  big?: string;
}

export interface FileResponse {
  data: Blob;
  status: number;
  fileName?: string;
  headers?: { [name: string]: any };
}

export class SwaggerException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
      super();

      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
  }

  protected isSwaggerException = true;

  static isSwaggerException(obj: any): obj is SwaggerException {
      return obj.isSwaggerException === true;
  }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
      return _observableThrow(result);
  else
      return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
      if (!blob) {
          observer.next("");
          observer.complete();
      } else {
          let reader = new FileReader();
          reader.onload = event => {
              observer.next((<any>event.target).result);
              observer.complete();
          };
          reader.readAsText(blob);
      }
  });
}
