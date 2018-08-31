import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserAuthService } from '../../auth/userAuth.service';
import { TokenService } from '../../auth/token.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
// import {*} from 'jquery';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() selectedMovie: any;
  @Output() purchased = new EventEmitter<boolean>();
  public totalCost: number;
  public params: any;
  public payment: any;
  public user: any;
  public formDataPurchase: any;
  public walletBalance: any;
  public isOfferSection: boolean;
  public offers: any;
  public selectedOffer: any;
  public offerApplied: boolean;
  public offerCost: number;
  public offerCashback: number;
  public profile: any;
  public createProfile: boolean;
  alertMessage: string;
  purchaseAlertMessage: string;
  showAlert: boolean;

  private _tokenService: TokenService;
  constructor(
    private cartService: CartService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private _userAuthService: UserAuthService,
    private dataStore: DataService,
    private _router: Router) {
    this.offerCost = 0;
    this.offerCashback = 0;
    this.walletBalance = 0;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.showAlert = false;
    this.isOfferSection = false;
    this.queryOffers();
    this.getProfile();
    this.totalCost = Number.parseFloat(this.selectedMovie.videotype) + Number.parseFloat(this.selectedMovie.tax);
  }

  openVerticallyCentered(content) {
    // this.modalService.open(content, { centered: true });
  }

  viewOffers() {
    this.isOfferSection = true;
  }

  applyOffer() {
    this.showAlert = false;
    if (this.selectedOffer !== undefined || this.selectedOffer != null || this.selectedOffer !== {}) {
      const tempTotalCost = this.totalCost;
      this.offerCost = 0;
      this.offerCashback = 0;
      let offerCost = 0;
      if (tempTotalCost < this.selectedOffer.minPurchaseCost) {
        this.offerApplied = false;
        this.showAlert = true;
        this.alertMessage = 'Minunum purchase cost of Rs.' + this.selectedOffer.minPurchaseCost + ' required.';
        return;
      }

      if (tempTotalCost > 0) {
        // Percentage offer
        if (this.selectedOffer.percentage !== 0) {
          offerCost = (tempTotalCost * this.selectedOffer.percentage) / 100;
          if (this.selectedOffer.cashback !== 0) {
            // Calculate offer cost based on percentage
            this.offerCashback = (offerCost <= this.selectedOffer.cashback) ? offerCost : this.selectedOffer.cashback;
          } else {
            // Calculate offer cashback based on percentage
            this.offerCost = (offerCost <= this.selectedOffer.discount) ? offerCost : this.selectedOffer.discount;
          }
        } else {
          if (this.selectedOffer.cashback !== 0) {
            this.offerCashback = (tempTotalCost <= this.selectedOffer.cashback) ? tempTotalCost : this.selectedOffer.cashback;
          } else {
            this.offerCost = (tempTotalCost <= this.selectedOffer.discount) ? tempTotalCost : this.selectedOffer.discount;
          }
        }
        console.log(this.offerCost);
        // Apply the offer cost to cart
        if (this.offerCost !== 0) {
          this.totalCost -= this.offerCost;
        }
        this.offerApplied = true;
        // this.toastr.success('Success!', this.selectedOffer.code + ' Applied Successfully.');

      } else {
        this.offerCost = 0;
        this.offerCashback = 0;
        this.selectedOffer = {};
        this.showAlert = true;
        this.alertMessage = 'Offer can\'t be applied.';
      }
    }
    this.isOfferSection = false;
    this.showAlert = false;
  }

  removeOffer() {
    this.offerCost = 0;
    this.offerCashback = 0;
    this.selectedOffer = {};
    this.offerApplied = false;
    this.totalCost = Number.parseFloat(this.selectedMovie.videotype) + Number.parseFloat(this.selectedMovie.tax);
  }

  // Query Offers
  queryOffers() {
    if (this.dataStore.getStoredOffers()) {
      this.offers = this.dataStore.getStoredOffers();
    } else {
      this.cartService.queryOffers(4).subscribe(
        data => {
          this.spinnerService.hide();
          if (data.error) {
            const errorMessage = data.error.message || '';
            console.log('Offer Query Error:', errorMessage);
          } else {
            this.offers = data.items;
            this.dataStore.setStoredOffers(this.offers);
          }
        },
        err => {
          this.spinnerService.hide();
        },
        () => console.log('Query Offers')
      );
    }
  }

  selectOffer(offer) {
    this.selectedOffer = offer;
  }

  getProfile() {
    this.cartService.getProfile({}).subscribe(
      data => {
        if (data && data.authorized) {
          this.createProfile = false;
          // Succeeded to get the user profile.
          this.profile = data;
          this.dataStore.setUserProfile(this.profile);
          this.dataStore.setGalleryMovies(data.movieDownloadInfo);
          if (this.profile) {
            this.walletBalance = this.profile.cashback;
          }
        } else {
          this.createProfile = true;
        }
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
      },
      () => console.log('Get Profile')
    );

  }

  purchaseMovie() {
    this.showAlert = false;
    const purchaseMovieList = [];
    let coupon = '';
    if (this.selectedOffer !== undefined && this.selectedOffer != null && this.selectedOffer !== {}) {
      coupon = this.selectedOffer.code;
    }
    purchaseMovieList.push({ 'movieKey': this.selectedMovie.websafeKey, 'movieType': 1 });
    this.spinnerService.show();
    this.cartService.purchaseMovie(
      'movieList=' + this.selectedMovie.websafeKey + '&movieList=1&coupon=' + coupon + '&cashback=' + this.walletBalance
    ).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.error) {
          // The request has failed.
          const errorMessage = data.error.message || '';
          console.log('Failed to purchase movie! ' + errorMessage);
          this.showAlert = true;
          this.purchaseAlertMessage = 'Unable to make movie purchase.';
        } else {
          this.payment = data;
          this.showAlert = false;
          // this.makePaymentDemo();
          this.makePayment();
        }
      },
      err => {
        this.spinnerService.hide();
        this.showAlert = true;
        this.purchaseAlertMessage = 'Movie purchase interuppted.';
      },
      () => console.log('Movie Purchased')
    );
  }

  navigateCreateProfile() {
    this._router.navigate(['/profile']);
  }


  makePaymentDemo() {
    this.spinnerService.show();
    // Update wallet balance
    this.dataStore.getUserProfile().cashback = parseInt(this.dataStore.getUserProfile().cashback, 0) -
      this.walletBalance + this.offerCashback;
    this.params = {
      status: 'success',
      productinfo: this.payment.productInfo,
      amount: this.payment.orderAmount,
      TxId: this.payment.merchantTxnId,
      key: this.payment.merchantKey,
      firstname: this.profile.displayName,
      email: this.profile.mainEmail,
      hash: this.payment.hash,
      udf1: localStorage.getItem('token')
    };

    this.cartService.makePaymentTransaction(this.params).subscribe(
      data => {
        this.spinnerService.hide();
        this.toastr.success('Congrats!', 'Movie purchase successful.');
        // Clear gallery movies to download again
        // cookieService.galleryMovies = {};
        this.purchased.emit(true);
      },
      err => {
        this.spinnerService.hide();
        this.toastr.error('Error!', 'Movie purchase interuppted.');
      },
      () => console.log('Movie Purchased')
    );
  }

  makePayment() {
    this.spinnerService.show();
    this.dataStore.getUserProfile().cashback = parseInt(this.dataStore.getUserProfile().cashback, 0) -
      this.walletBalance + this.offerCashback;
    this.user = this._userAuthService.getLoggedInUser();
    this.formDataPurchase = {
      redirectUrl: 'https://test.payu.in/_payment',
      redirectMethod: 'POST',
      redirectData: {
        key: this.payment.merchantKey,
        txnid: this.payment.txnId,
        amount: this.payment.orderAmount,
        productinfo: this.payment.productInfo,
        service_provider: 'payu_paisa',
        hash: this.payment.hash,
        surl: this.payment.returnUrl,
        furl: this.payment.notifyUrl,
        firstname: this.profile.displayName,
        email: this.profile.mainEmail,
        phone: this.payment.mobileNumber,
        udf1: 'Bearer ' + localStorage.getItem('token')
      }
    };
    this.dataStore.setPaymentData(this.formDataPurchase);
    this._router.navigate(['/payment']);
  }
}
