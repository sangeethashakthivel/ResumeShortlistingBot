import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  private apiUrl = 'http://localhost:8080/api/bot';

  constructor(private http: HttpClient) {}

  chat(message: string): Observable<string> {
    return this.http.post(this.apiUrl + '/chat', null, { params: { message }, responseType: 'text' });
  }
}
