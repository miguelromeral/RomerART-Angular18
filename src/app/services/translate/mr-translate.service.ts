import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITranslateResponse } from '@models/responses/translate-response.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MrTranslateService {
  private apiKey = environment.translation.apiKey;
  private endpoint = environment.translation.url;
  private location = environment.translation.region;

  public httpHeaders = new HttpHeaders({
    'Ocp-Apim-Subscription-Key': this.apiKey,
    'Ocp-Apim-Subscription-Region': this.location,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  translate(text: string, to: string): Observable<ITranslateResponse[]> {
    // Construir la ruta de la API con los parámetros de idioma
    const route = `/translate?api-version=3.0&to=${to}`;
    const url = this.endpoint + route;

    // Construir el cuerpo de la solicitud
    const body = [{ Text: text }];
    const requestBody = JSON.stringify(body);

    // Realizar la solicitud POST y retornar el Observable
    return this.http.post<ITranslateResponse[]>(url, requestBody, {
      headers: this.httpHeaders,
    });
  }
}
