import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Config } from '../../app.config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';
import { DataService } from '../../services/data.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public movies: any;
  public genres: any;
  public latest: any;
  public trending: any;
  public hero: any;

  options: NgxSiemaOptions = {
    selector: '.siema',
    duration: 200,
    easing: 'ease-out',
    draggable: true,
    loop: true,
    onInit: () => {
      // runs immediately after first initialization
    },
    onChange: () => {
      // runs after slide change
    }
  };

  constructor(
    private _homeService: HomeService,
    public config: Config,
    private spinnerService: Ng4LoadingSpinnerService,
    private ngxSiemaService: NgxSiemaService,
    private dataStore: DataService,
    private _router: Router,
  ) {
    this.config.configureScreen.showGenre = false;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.loadMovies();
    this.loadTrendingMovies();
  }

  loadMovies() {
    this._homeService.getMovies({ queryLimit: 0 }).subscribe(
      data => {
        this.spinnerService.hide();
        this.movies = data;
        this.latest = this.movies.items;
        this.loadHeroSlider();
      },
      err => {
        this.spinnerService.hide();
      },
      () => console.log('Movies Loaded')
    );
  }

  loadTrendingMovies() {
    this._homeService.getTrendingMovies(12).subscribe(
      data => {
        this.spinnerService.hide();
        this.trending = data.items;
      },
      err => {
        this.spinnerService.hide();
      },
      () => console.log('Trending Movies Loaded')
    );
  }

  /**
   * load slider
   */
  loadHeroSlider() {
    this.hero = this.movies.items.slice(0, 3);
  }
  next() {
    this.ngxSiemaService.next(1)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
  prev() {
    // Use the prev function only for ngx-siema instance with selector '.siema'
    this.ngxSiemaService.prev(1, '.siema')
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  getMovieDetails(movie) {
    this.dataStore.storage = movie;
    localStorage.setItem('movieKey', movie.websafeKey);
    const navigationExtras: NavigationExtras = {
      queryParams: { 'movieKey': movie.websafeKey }
    };
    this._router.navigate(['/movie-detail'], navigationExtras);
  }

}
