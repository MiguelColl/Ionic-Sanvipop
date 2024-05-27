import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './app/interceptors/base-url.interceptor';
import { authTokenInterceptor } from './app/interceptors/auth-token.interceptor';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { provideBingmapsKey } from './app/bingmaps/bingmaps.config';

defineCustomElements(window);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
    provideHttpClient(
      withInterceptors([baseUrlInterceptor, authTokenInterceptor])
    ),
    provideBingmapsKey(
      'AkNzLhYRWHdv2quBGyOrYORRt-WbpGZTN3lGc0osvU7e3rWMgpcSSYZh3vQFKYLb'
    ),
  ],
});
