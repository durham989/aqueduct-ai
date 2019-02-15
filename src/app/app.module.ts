import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ToastrModule } from 'ngx-toastr';
import { ShareModule } from '@ngx-share/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Services
import { ScrollService } from './services/scroll.service';
import { DomService } from './services/dom.service';
import { ModalService } from './services/modal.service';
import { ConsultationService } from './services/consultation.service';
import { WhitepaperService } from './services/whitepaper.service';
import { SharingService } from './services/sharing.service';
import { BlogService } from './services/blog.service';
import { CacheInterceptor } from './services/cache-interceptor.service';

// Components
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';
import { DevModuleModule } from './+dev-module';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { WhitepaperComponent } from './whitepaper/whitepaper.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { IndividualBlogComponent } from './blog/individual-blog.component';
import { WaterUtilityComponent } from './landing-pages/water-utility.component';
import { WastewaterFacilityComponent } from './landing-pages/wastewater-facility.component';
import { FarmFishBlogPostComponent } from './blog/farm-fish-post.component';
import { OurProcessComponent } from './our-process/our-process.component';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
    NavbarComponent,
    ConsultationComponent,
    WhitepaperComponent,
    FooterComponent,
    BlogComponent,
    IndividualBlogComponent,
    WaterUtilityComponent,
    WastewaterFacilityComponent,
    FarmFishBlogPostComponent,
    OurProcessComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    AngularFontAwesomeModule,
    ScrollToModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    ToastrModule.forRoot(),
    ShareModule.forRoot(),

    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    ...environment.showDevModule ? [ DevModuleModule ] : [],
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    ScrollService,
    DomService,
    ModalService,
    ConsultationService,
    WhitepaperService,
    SharingService,
    BlogService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
})
export class AppModule {}
