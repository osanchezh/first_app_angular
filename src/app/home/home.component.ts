import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import {Routes} from '@angular/router';
import {DetailsComponent} from '../details/details.component';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent,CommonModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
    <app-housing-location *ngFor="let housingLocation of filteredLocationList" 
    [housingLocation]="housingLocation"></app-housing-location>

    </section>
  `,
  styleUrls: ['./home.component.css'],
  styles: ``
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  /*constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }*/
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
