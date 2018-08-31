import { Component, OnInit } from '@angular/core';
import { GalleryService } from './gallery.service';
import { Config } from '../../app.config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  private movies: any;
  private downloadedMovies: any;
  public moviesExist: boolean;
  constructor(private _galleryService: GalleryService,
    private config: Config,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.moviesExist = false;
  }

  ngOnInit() {
    this.loadGallery();
  }

  loadGallery() {
    this.spinnerService.show();
    this._galleryService.getPurchasedMovies().subscribe(
      data => {
        this.spinnerService.hide();
        this.movies = data;
        if (this.movies && this.movies.items && this.movies.items.length) {
          this.downloadedMovies = this.movies.items;
          this.moviesExist = true;
        }
      },
      err => {
        this.spinnerService.hide();
      },
      () => console.log('Gallery Loaded')
    );
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
