import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpManagerClass } from './http-manager.class';
import { Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CachingService } from '../services/caching.service';
import { HttpRequestOptions } from '../models/backend';

export abstract class HttpBaseClass extends HttpManagerClass {
    private cachingService: CachingService;

    constructor(protected http: HttpClient,
        protected injector: Injector) {
        super();
        this.cachingService = this.injector.get(CachingService);
    }

    get<T>(method: string, options = new HttpRequestOptions(), showLoader = true, host = environment.baseUrl, shouldCacheData = false, forceFetchData = false): Observable<any> {
        if (navigator.onLine) {
            if (this.cachingService.checkIfDataExistsInCache(this.getRequestUrlWithParam(host, method, options?.params)) && !forceFetchData) {
                return of(this.cachingService.getCachedObject(this.getRequestUrlWithParam(host, method, options?.params)));
            } else {
                return this.http.get<HttpResponse<T>>(this.getRequestUrl(host, method), this.overwriteDefaultOptions(options, showLoader)).pipe(tap(data => {
                    if (shouldCacheData) {
                        this.cachingService.cacheItem(this.getRequestUrlWithParam(host, method, options?.params), data);
                    }
                }));
            }
        }
        else return of(null);
    }

    post<T>(method: string,
        body?: any,
        options = new HttpRequestOptions(),
        showLoader = true,
        host = environment.baseUrl): Observable<any> {
        if (navigator.onLine) {
            return this.http.post<HttpResponse<T>>(
                this.getRequestUrl(host, method), body,
                this.overwriteDefaultOptions(options, showLoader)
            );
        }
        else return null;
    }

    put<T>(
        method: string,
        body?: any,
        options = new HttpRequestOptions(),
        showLoader = true,
        host = environment.baseUrl
    ): Observable<any> {
        if (navigator.onLine) {
            return this.http.put<HttpResponse<T>>(this.getRequestUrl(host, method), body, this.overwriteDefaultOptions(options, showLoader));
        }
        else return null;
    }

    delete<T>(
        method: string,
        body?: any,
        options = new HttpRequestOptions(),
        showLoader = true,
        host = environment.baseUrl
    ): Observable<any> {
        if (navigator.onLine) {
            return this.http.delete<HttpResponse<T>>(
                this.getRequestUrl(host, method), this.overwriteDefaultOptions(options, showLoader, body));
        }
        else return null;
    }
}
