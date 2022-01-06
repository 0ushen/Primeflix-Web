import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthorizeService } from '../services/authorize.service';
import { ClientUrl, IdentityServerUrl } from '../constants/authorize.constants';
import { API_BASE_URL } from '../web-api-client';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(private authorize: AuthorizeService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authorize.getAccessToken()
                         .pipe(mergeMap(token => this.processRequestWithToken(token, req, next)));
  }

  // Checks if there is an access_token available in the authorize service
  // and adds it to the request in case it's targeted at the same origin as the
  // single page application.
  private processRequestWithToken(token: string, req: HttpRequest<any>, next: HttpHandler) {
    if (!!token && this.isAuthorizedUrl(req)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }

  private isAuthorizedUrl(req: any) {
    // It's an absolute url with the same origin or with the api server origin.
    if (req.url.startsWith(`${API_BASE_URL}/`) || req.url.startsWith(`${ClientUrl}/`)) {
      return true;
    }

    // It's a protocol relative url with the same origin.
    if (req.url.startsWith(`//${API_BASE_URL}/`) || req.url.startsWith(`//${ClientUrl}/`)) {
      return true;
    }

    // It's a relative url like /api/Products
    if (/^\/[^\/].*/.test(req.url)) {
      return true;
    }

    // It's an absolute or protocol relative url that
    // doesn't have the same origin.
    return false;
  }
}
