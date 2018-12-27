import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { ManifestService } from './manifest.service';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class HttpClientService {
  private _rootUrl: string;
  private _apiRootUrl: string;
  private _systemInfo: string;

  constructor(private httpClient: HttpClient, private manifestService: ManifestService) {
  }

  get(url: string, preferPreviousApiVersion: boolean = false, useRootUrl: boolean = false): Observable<any> {
    const rootUrlPromise = useRootUrl ? this._getRootUrl() : this._getApiRootUrl(preferPreviousApiVersion);

    return rootUrlPromise.pipe(
      mergeMap(rootUrl => this.httpClient.get(rootUrl + url).pipe(catchError(this._handleError)))
    );
  }

  post(url: string, data: any, preferPreviousApiVersion: boolean = false, useRootUrl: boolean = false,
    headerOptions?: any) {
    const rootUrlPromise = useRootUrl ? this._getRootUrl() : this._getApiRootUrl(preferPreviousApiVersion);
    return rootUrlPromise.pipe(
      mergeMap(rootUrl =>
        this.httpClient.post(rootUrl + url, data).
          pipe(catchError(this._handleError))
      )
    );
  }

  put(url: string, data: any, preferPreviousApiVersion: boolean = false, useRootUrl: boolean = false) {
    const rootUrlPromise = useRootUrl ? this._getRootUrl() : this._getApiRootUrl(preferPreviousApiVersion);

    return rootUrlPromise.pipe(
      mergeMap(rootUrl =>
        this.httpClient.put(rootUrl + url, data).pipe(catchError(this._handleError))
      )
    );
  }

  delete(url: string, preferPreviousApiVersion: boolean = false, useRootUrl: boolean = false) {
    const rootUrlPromise = useRootUrl ? this._getRootUrl() : this._getApiRootUrl(preferPreviousApiVersion);

    return rootUrlPromise.pipe(
      mergeMap(rootUrl => this.httpClient.delete(rootUrl + url).pipe(catchError(this._handleError)))
    );
  }

  getSystemInfo() {
    return this._systemInfo ? of(this._systemInfo) :
      this._getRootUrl().pipe(switchMap((rootUrl: string) => this.httpClient.get(`${rootUrl}api/system/info`).
        pipe(tap((systemInfo: any) => this._systemInfo = systemInfo))));
  }

  // Private methods

  private _handleError(err: HttpErrorResponse) {
    let error = null;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      error = {
        message: err.error,
        status: err.status,
        statusText: err.statusText
      };
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      error = {
        message: err.error instanceof Object ? err.error.message : err.error,
        status: err.status,
        statusText: err.statusText
      };
    }
    return new error;
  }

  /**
   * Get root url
   * @returns {Observable<string>}
   * @private
   */
  private _getRootUrl(): Observable<string> {
    return new Observable(observer => {
      if (this._apiRootUrl) {
        observer.next(this._apiRootUrl);
        observer.complete();
      } else {
        this.manifestService.getRootUrl().subscribe((rootUrl: string) => {
          this._rootUrl = rootUrl;
          observer.next(rootUrl);
          observer.complete();
        });
      }
    });
  }

  private _getApiRootUrl(preferPreviousVersion: boolean = false) {
    const rootUrlPromise = this._getRootUrl().
      pipe(switchMap((rootUrl) => this.getSystemInfo().pipe(map((systemInfo) => {
          const splitedVersion = systemInfo.version.split('.');
          const version = parseInt(splitedVersion[1], 10);
          return {rootUrl, version: (version - 1) <= 25 ? (version + 1) : version};
        }))
      ));
    return rootUrlPromise.pipe(
      map((urlInfo: {rootUrl: string, version: number}) => `${urlInfo.rootUrl}api/${preferPreviousVersion ?
        urlInfo.version ? ((urlInfo.version - 1) + '/') : '' : ''}`));
  }
}
