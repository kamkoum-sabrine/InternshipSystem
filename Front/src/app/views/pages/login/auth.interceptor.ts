import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // const authService = inject(AuthService); // Injection du service d'authentification
    // const token = authService.getToken();
    const authService = inject(AuthService);
    const token = localStorage.getItem('token');

    if (token) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedRequest);
    }

    return next(req);

    // const token = localStorage.getItem('token');

    // console.log("toooookeeen ", token)
    // if (token) {
    //     const clonedRequest = req.clone({
    //         setHeaders: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     return next(clonedRequest);
    // }

    // return next(req);
};
