import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* Environment */
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private _baseUrl = environment.URLSERVER;
  private _httpClient = inject(HttpClient);

  public getMethod<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this._httpClient.get<T>(`${this._baseUrl}/${endpoint}`, { params });
  }

  public postMethod<T>(endpoint: string, body: object): Observable<T> {
    return this._httpClient.post<T>(`${this._baseUrl}/${endpoint}`, body);
  }

  public putMethod<T>(endpoint: string, body: object, params?: HttpParams): Observable<T> {
    return this._httpClient.put<T>(`${this._baseUrl}/${endpoint}`, body, {
      params,
    });
  }

  public patchMethod<T>(endpoint: string, body?: object, params?: HttpParams): Observable<T> {
    return this._httpClient.patch<T>(`${this._baseUrl}/${endpoint}`, body, {
      params,
    });
  }

  public deleteMethod<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this._httpClient.delete<T>(`${this._baseUrl}/${endpoint}`, { params });
  }
}
