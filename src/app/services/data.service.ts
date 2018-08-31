import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

    public storage: any;
    private storedOffers: any;
    private userProfile: any;
    private galleryMovies: any;
    private paymentData = new BehaviorSubject({});
    currentPaymentData = this.paymentData.asObservable();

    public constructor() { }

    getStoredOffers() {
        return this.storedOffers;
    }

    setStoredOffers(offers) {
        this.storedOffers = offers;
    }

    getUserProfile() {
        return this.userProfile;
    }

    setUserProfile(profile) {
        this.userProfile = profile;
    }

    getGalleryMovies() {
        return this.galleryMovies;
    }

    setGalleryMovies(gallery) {
        this.galleryMovies = gallery;
    }

    setPaymentData(newPaymentData: string) {
        this.paymentData.next(newPaymentData);
    }
}
