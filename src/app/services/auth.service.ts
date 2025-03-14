import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURl: string = "http://localhost:"
  constructor(private http: HttpClient) { }

  register(data: User): Observable<any> {
    return this.http.post.
  }
}
