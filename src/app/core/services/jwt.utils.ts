import { Injectable } from '@angular/core';


/**
 * @version 1.0.0
 * @description JWTUtils for encode, decode and verify JWT
 */
@Injectable()
export class JWTUtils {
  
    /**
     * @description decoding valid JWT
     * @param token 
     */
    public decodeJwt(token: string) {
      let decodedToken = this.parseJwt(token);
        return decodedToken;
    }

    public parseJwt(token) {
        if (token != null || token != undefined) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        return null;
    }
    
}