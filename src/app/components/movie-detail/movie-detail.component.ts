import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { MovieDetailService } from './movie-detail.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movieKey: string;
  public movie: any;
  public params: any;
  public payment: any;
  public isPurchased: boolean;
  public offerActive: any = {};
  public walletBalance: any;
  public formDataPurchase: any;
  public selectedMovie: any;
  public movieBuy: any;

  public constructor(private route: ActivatedRoute,
    private dataStore: DataService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private movieDetailService: MovieDetailService) {
  }

  ngOnInit() {
    this.getMovieDetail();
    this.isPurchased = false;
  }
  getMovieDetail() {
    this.spinnerService.show();
    this.route.data
      .subscribe((data: { movieData: any }) => {
        this.spinnerService.hide();
        this.movieKey = data.movieData.movieKey;
        this.movie = data.movieData;
        this.selectedMovie = this.movie;
        this.movie.videotype = this.movie.purchaseCostHD;
        this.movie.tax = (0.18 * Number.parseFloat(this.movie.videotype)).toFixed(2);
      },
        err => {
          this.spinnerService.hide();
        },
        () => console.log('Movie Loaded'));
  }

  openCart() {
    this.movieBuy = true;
  }

  onVideoTypeChange(type) {
    this.movie.videotype = type;
    this.movie.tax = 0.18 * Number.parseFloat(this.movie.videotype);
  }

  onPurchased(purchased: boolean) {
    this.isPurchased = purchased;
  }


}
