import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSiemaModule } from 'ngx-siema';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RegisterComponent } from './components/register/register.component';
import { SupportComponent } from './components/support/support.component';
import { LegalComponent } from './components/legal/legal.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthServiceConfig, SocialLoginModule } from 'angular5-social-login';
import { getAuthServiceConfigs } from './socialLoginConfig';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SliderComponent } from './shared/slider/slider.component';
import { CardComponent } from './shared/card/card.component';
import { HomeService } from './components/home/home.service';
import { ProfileService } from './components/profile/profile.service';
import { TokenService } from './auth/token.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ImageCarouselComponent } from './shared/image-carousel/image-carousel.component';
import { UserAuthService } from './auth/userAuth.service';
import { AuthGuard } from './_guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RestService } from './services/rest.service';
import { Config } from './app.config';
import { DataService } from './services/data.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastMessagesComponent } from './shared/toast/toast-messages.component';
import { MovieDetailService } from './components/movie-detail/movie-detail.service';
import { CartService } from './components/cart/cart.service';
import { GalleryService } from './components/gallery/gallery.service';
import { PaymentComponent } from './components/payment/payment.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesService } from './services/movies.service';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    CartComponent,
    GalleryComponent,
    RegisterComponent,
    SupportComponent,
    LegalComponent,
    MovieDetailComponent,
    MoviesComponent,
    FooterComponent,
    HeaderComponent,
    SliderComponent,
    CardComponent,
    ImageCarouselComponent,
    PageNotFoundComponent,
    PaymentComponent,
    ToastMessagesComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    Ng2CarouselamosModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot(),
    NgxSiemaModule.forRoot(),
    Ng2TelInputModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    HomeService,
    MovieDetailService,
    CartService,
    GalleryService,
    ProfileService,
    TokenService,
    UserAuthService,
    AuthGuard,
    RestService,
    Config,
    DataService,
    MoviesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
