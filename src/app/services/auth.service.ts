import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { authConfig } from '../../authconfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = "http://localhost:5153/api/auth"

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    this.oauthService.configure(authConfig)
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
   }

   googleLogin() {
    this.oauthService.initLoginFlow();
   }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data)
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data)
  } 

   googlePostLogin(): Observable<any> {
    const accessToken = this.oauthService.getIdToken();

     return this.http.post(`${this.apiUrl}/google-login`, { credential : accessToken })
   }
  
}
