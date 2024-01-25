import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      (addNewItem$)="addNewItem()"
      customClass="bg-light-red">
      <img src="assets/img/city.webp" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private readonly http: FakeHttpService,
    private readonly store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
    this.store.cities$.subscribe((t) => (this.cities = t));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }
}
