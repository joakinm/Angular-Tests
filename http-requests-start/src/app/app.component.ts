import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { postService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts : Post[] = [];
  isFetching = false;
  i  : number;
  error = null;
  private errorSub: Subscription;

  constructor( private postServ : postService) {}

  ngOnInit() {
    this.errorSub = this.postServ.error.subscribe( err => (this.error = err));
  }//guardando subscripcion para en ondestroy desuscribirse
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postServ.onCreatePost(postData);
  }

  onFetchPosts() {
    // enviando http request
    this.onGetPosts(); 
  }

  onClearPosts() {
    // eliminando por id
    // this.postServ.clearPost(this.loadedPosts[this.i].id);

    this.postServ.clearAllPosts().subscribe(
      () => { this.loadedPosts = [];}
      );
  }

  private onGetPosts(){
    this.isFetching = true;  
    this.postServ.onGetPosts().subscribe(posts => 
      { this.loadedPosts = posts;},
        error => {this.error = error.message});
    this.isFetching = false;
  }
  
  onCerrarError(){
    this.isFetching = false;
    this.error = null;
  }
}
