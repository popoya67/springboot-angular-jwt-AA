import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { AuthGuard } from './service/auth.guard';

const appRoutes: Routes = [
  { path: 'main', component: MainComponent , canActivate : [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
