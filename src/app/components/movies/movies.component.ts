import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { DataService } from '../../services/data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public allMovies: any;
  public nextToken: any;

  constructor(
    private _movies: MoviesService,
    private dataStore: DataService,
    private _router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {

  }

  ngOnInit() {
    this.spinnerService.show();
    this.loadMovies();
  }

  loadMovies() {
    this._movies.fetchMovies({ queryLimit: 0 }).subscribe(
      data => {
        this.allMovies = data.items;
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
      },
      () => console.log('Movies Loaded')
    );
  }

  gotoMoviePage(movie) {
    this.dataStore.storage = movie;
    localStorage.setItem('movieKey', movie.websafeKey);
    const navigationExtras: NavigationExtras = {
      queryParams: { 'movieKey': movie.websafeKey }
    };
    this._router.navigate(['/movie-detail'], navigationExtras);
  }

}