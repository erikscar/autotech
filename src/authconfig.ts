import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + "/home",
    clientId: '411251684984-ucasoivfhugu3ulgmnk7fnj8bn9c5gca.apps.googleusercontent.com',
    strictDiscoveryDocumentValidation: false,
    scope: 'openid profile email',
  };    