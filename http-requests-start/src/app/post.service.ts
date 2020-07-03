import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError} from 'rxjs';
import { Post } from './post.model';

@Injectable({providedIn:"root"})
export class postService{
    loadedPosts : Post[] = [];
    error = new Subject<string>();
    
constructor(private http: HttpClient) {}
onCreatePost(postData: { title: string; content: string }) {
    // enviando http request
    this.http
        .post<{name : string}>(
        'https://recetasproyecto.firebaseio.com/posts.json',
        postData
        )
        .subscribe(responseData => {
        console.log(responseData);
        }, err=>{this.error.next(err.message); } //haciendo un subscribe del error y copiando el mensaje del error
        );
        
    }

    onGetPosts(){ 
      let Parametroshttp = new HttpParams();// haciendo parametros para la url
      Parametroshttp = Parametroshttp.append("print", "Parametro");
      Parametroshttp = Parametroshttp.append("Personaliz", "valor");

      return this.http.get <{name : string}>('https://recetasproyecto.firebaseio.com/posts.json',{
        headers: new HttpHeaders({"ejemplo-Header-Personalizado":"este es un ejemplo"}) // creando un atributo del header
        ,params: Parametroshttp //pasando parametros para url
      })
      .pipe(map( responseData => {
        const arr = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            arr.push({...responseData[key],id: key});
          }
        }
        return arr;
      }
      ,catchError( errorRes=>{
        return throwError(errorRes); //haciendo un throw del error para enviarlo donde quiera
      })//por ejemplo, enviarlo a otro lado para estudiarlo
      ));}

        
        clearAllPosts(){
          return this.http.delete("https://recetasproyecto.firebaseio.com/posts.json");
        }
        
            // eliminando por id
            // clearPost(id : string){
            //     return this.http.delete('https://recetasproyecto.firebaseio.com/posts/'+ id);
            //     this.onGetPosts();
            // } 
      }