import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../components/home/home.service';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../../services/data.service';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  images: Array<string>;
  movies: any;
  genres: any;

  constructor(private _router: Router,
    private _homeService: HomeService,
    private dataStore: DataService) {
  }

  ngOnInit() {
    this._homeService.getMovies({ queryLimit: 3 }).subscribe(
      data => {
        this.movies = data;
        console.log(this.movies);
      },
      err => console.error(err),
      () => console.log('Movies Loaded')
    );
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


