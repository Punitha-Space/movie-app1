import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ProfileService } from './profile.service';
import { DataService } from './../../services/data.service';
import { UserAuthService } from '../../auth/userAuth.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BlockingProxy } from '../../../../node_modules/blocking-proxy';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile: any;
  public age: any;
  public ageRange: any;
  public gender: any;
  public isEdit: boolean;
  public countries: any;
  public otp: any;
  public termsAgreement: boolean;
  myform: FormGroup;
  otpReceived: boolean;
  validOtp: boolean;
  otpValue: string;
  profileLoaded: boolean;
  authorized: boolean;

  constructor(private profileService: ProfileService,
    private _userAuthService: UserAuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private dataStore: DataService,
    private _http: HttpClient) {
    this.ageRange = ['6-17', '18-25', '26-35', '36-45', '46-55', '56-60', '61-75', '76+'];
    this.gender = ['Female', 'Male', 'Other'];
    this.isEdit = false;
    this.otpReceived = false;
    this.otp = false;
    this.validOtp = false;
    this.countries = [
      { name: 'இந்தியா', code: 'IN' },
      { name: 'ஆஸ்திரேலியா', code: 'AU' },
      { name: 'கனடா', code: 'CA' },
      { name: 'பின்லாந்து', code: 'FI' },
      { name: 'பிரான்ஸ்', code: 'FR' },
      { name: 'ஜெர்மனி', code: 'DE' },
      { name: 'ஹாங்காங்', code: 'HK' },
      { name: 'ஜப்பான்', code: 'JP' },
      { name: 'மலேஷியா', code: 'MY' },
      { name: 'மாலத்தீவு', code: 'MV' },
      { name: 'நெதர்லாந்து', code: 'NL' },
      { name: 'நியுசிலாந்து', code: 'NZ' },
      { name: 'சிங்கப்பூர்', code: 'SG' },
      { name: 'இலங்கை', code: 'LK' },
      { name: 'ஸ்வீடன்', code: 'SE' },
      { name: 'சுவிச்சர்லாந்து', code: 'CH' },
      { name: 'தைவான்', code: 'TW' },
      { name: 'தாய்லாந்து', code: 'TH' },
      { name: 'ஐக்கிய அரபு நாடுகள்', code: 'AE' },
      { name: 'இங்கிலாந்து', code: 'GB' },
      { name: 'அமெரிக்கா', code: 'US' }
    ];

    this.profileLoaded = false;
  }

  ngOnInit() {
    this.myform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      ageRange: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required)
    });
    this.getProfile();
    this.termsAgreement = false;
  }

  getProfile() {
    this.spinnerService.show();
    this.profileService.getProfile({}).subscribe(
      data => {
        this.spinnerService.hide();
        this.profileLoaded = true;
        // Succeeded to get the user profile.
        this.profile = data;
        if (this.profile) {
          this.dataStore.setUserProfile(this.profile);
          this.isEdit = false;
          this.authorized = this.profile.authorized;
        } else {
          this.isEdit = true;
          this.profile = {};
          this.authorized = false;
        }
      },
      err => {
        this.spinnerService.hide();
      },
      () => console.log('Get Profile')
    );

  }

  setFormValues() {
    (<FormControl>this.myform.controls['firstName']).setValue(this.profile.displayName);
    (<FormControl>this.myform.controls['lastName']).setValue(this.profile.lastName);
    (<FormControl>this.myform.controls['ageRange']).setValue(this.ageRange[this.profile.ageRange]);
    (<FormControl>this.myform.controls['gender']).setValue(this.gender[this.profile.gender]);
    (<FormControl>this.myform.controls['address']).setValue(this.profile.address);
    (<FormControl>this.myform.controls['city']).setValue(this.profile.city);
    (<FormControl>this.myform.controls['state']).setValue(this.profile.state);
    (<FormControl>this.myform.controls['pincode']).setValue(this.profile.pincode);
    (<FormControl>this.myform.controls['mobileNumber']).setValue(this.profile.mobileNumber);
  }

  resetForm(e: any) {
    e.preventDefault();
    (<FormControl>this.myform.controls['firstName']).reset('');
    (<FormControl>this.myform.controls['lastName']).reset('');
    (<FormControl>this.myform.controls['ageRange']).reset(this.ageRange[1]);
    (<FormControl>this.myform.controls['gender']).reset(this.gender[0]);
    (<FormControl>this.myform.controls['address']).reset('');
    (<FormControl>this.myform.controls['city']).reset('');
    (<FormControl>this.myform.controls['state']).reset('');
    (<FormControl>this.myform.controls['pincode']).reset('');
    (<FormControl>this.myform.controls['mobileNumber']).reset('');
    this.termsAgreement = false;
  }

  signOut() {
    this._userAuthService.signOut();
  }

  toggleEdit() {
    if (this.isEdit === true) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      this.setFormValues();
    }
    // this.geoIpLookup(function (countryCode) {
    //   for (let i = 0; i < this.countries.length; ++i) {
    //     if (this.countries[i].code === countryCode.toUpperCase()) {
    //       console.log('Country Code Supported: ' + countryCode);
    //       this.isEdit = true;
    //     }
    //     break;
    //   }
    // });
  }

  // geoIpLookup = function (callback) {
  //   this._http.get('https://ipinfo.io', function () { }, 'jsonp').subscribe(function (resp) {
  //     const countryCode = (resp && resp.country) ? resp.country : '';
  //     callback(countryCode);
  //   });
  // };

  getOTP() {
    this.spinnerService.show();
    this.profile.displayName = (<FormControl>this.myform.controls['firstName']).value;
    this.profile.lastName = (<FormControl>this.myform.controls['lastName']).value;
    this.profile.ageRange = this.ageRange.findIndex(age => age === (<FormControl>this.myform.controls['ageRange']).value);
    this.profile.gender = this.gender.findIndex(gender => gender === (<FormControl>this.myform.controls['gender']).value);
    this.profile.address = (<FormControl>this.myform.controls['address']).value;
    this.profile.city = (<FormControl>this.myform.controls['city']).value;
    this.profile.state = (<FormControl>this.myform.controls['state']).value;
    this.profile.pincode = (<FormControl>this.myform.controls['pincode']).value;
    this.profile.mobileNumber = (<FormControl>this.myform.controls['mobileNumber']).value;

    this.profileService.getProfileOTP(this.profile).subscribe(
      data => {
        this.spinnerService.hide();
        this.otp = data;
        if (this.otp.result) {
          this.otpReceived = true;
        }
      },
      err => {
        this.otpReceived = false;
        this.spinnerService.hide();
      },
      () => console.log('Get Profile OTP')
    );

  }

  validateOTp() {
    this.validOtp = false;
    if (this.otp && this.otp.result === true && this.otpValue === this.otp.reason) {
      this.validOtp = true;
    }
  }

  saveProfile() {
    this.profile.displayName = (<FormControl>this.myform.controls['firstName']).value;
    this.profile.lastName = (<FormControl>this.myform.controls['lastName']).value;
    this.profile.ageRange = this.ageRange.findIndex(age => age === (<FormControl>this.myform.controls['ageRange']).value);
    this.profile.gender = this.gender.findIndex(gender => gender === (<FormControl>this.myform.controls['gender']).value);
    this.profile.address = (<FormControl>this.myform.controls['address']).value;
    this.profile.city = (<FormControl>this.myform.controls['city']).value;
    this.profile.state = (<FormControl>this.myform.controls['state']).value;
    this.profile.pincode = (<FormControl>this.myform.controls['pincode']).value;
    this.profile.mobileNumber = (<FormControl>this.myform.controls['mobileNumber']).value;
    this.profile.otpCode = this.otpValue;
    this.spinnerService.show();
    this.profileService.saveProfile(this.profile).subscribe(
      data => {
        this.spinnerService.hide();
        this.toggleEdit();
        this.authorized = data.authorized;
        this.otpReceived = false;
      },
      err => {
        this.spinnerService.hide();
        this.otpReceived = false;
      },
      () => console.log('Save Profile')
    );

  }
}
