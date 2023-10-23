import { enableProdMode, importProvidersFrom } from '@angular/core';

import { REDUCER_PROVIDER, getInitialState, reducerToken } from '@AppStore';
import { environment } from '@Environment';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { MultiTranslateLoader } from './app/shared/loaders/multi-translate.loader';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: MultiTranslateLoader,
                deps: [HttpClient],
            },
        }), EffectsModule.forRoot([]), StoreModule.forRoot(reducerToken, { initialState: getInitialState }), StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        })),
        REDUCER_PROVIDER,
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch((err: unknown) => console.error(err));
