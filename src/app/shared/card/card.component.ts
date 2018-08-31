import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() movieCard: any;
  @Input() showChevron: boolean;

  constructor(private _router: Router,
    private dataStore: DataService) {
    this.showChevron = false;
  }

  ngOnInit() {
  }

  navigateToPage(movie) {
    this.dataStore.storage = movie;
    localStorage.setItem('movieKey', movie.websafeKey);
    const navigationExtras: NavigationExtras = {
      queryParams: { 'movieKey': movie.websafeKey }
    };
    this._router.navigate(['/movie-detail'], navigationExtras);
  }

}
