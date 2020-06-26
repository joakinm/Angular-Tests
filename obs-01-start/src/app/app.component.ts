import { Component, OnInit, OnDestroy } from '@angular/core';
import { userService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userServ : userService) {}
  activated = false;
  ngOnInit() {this.userServ.activatedEventEmitter.subscribe(
    didactivated => {
      this.activated = didactivated;
    })};
  ngOnDestroy(){
    this.userServ.activatedEventEmitter.unsubscribe(); 
  }
}
