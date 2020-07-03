import { HttpInterceptor, HttpRequest,HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';


export class authPruebaService implements HttpInterceptor{
    intercept(req: HttpRequest<any>,next: HttpHandler){
        console.log("los requests pasan por auth");
        const requestModificada = req.clone({headers: req.headers.append("autorizacion","valor1")})
        return next.handle(requestModificada).pipe(tap(
            event=>{
                if(event.type === HttpEventType.Response)
                {
                    console.log("llego la rta, data del body:");
                    console.log(event.body);
                }
            }));
    }
}