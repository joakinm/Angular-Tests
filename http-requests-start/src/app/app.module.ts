import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { authPruebaService } from './prueba.auth.services';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS,
              useClass: authPruebaService,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
