import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EndpointsModule } from './endpoints/endpoints.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LayoutModule } from './layout/layout.module';
import { FridgeService } from './services/fridge.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'

export function jwtOptionsFactory(fridgeService:FridgeService) {
  return {
    tokenGetter: () => {
      return fridgeService.getAccessToken();
    },
    allowedDomains:['localhost:7199'],
    disallowedRoutes:["https://localhost:7199/api/login", "https://localhost:7199/api/refreshToken"]
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    EndpointsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps:[FridgeService]
      }
    })
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}, 
              {provide:LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
