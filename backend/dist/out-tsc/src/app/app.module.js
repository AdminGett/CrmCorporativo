import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [AppComponent, LoginComponent],
        imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
        providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map