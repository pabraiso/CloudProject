import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CovidService } from '../covid.service';
import {CountryData} from '../country_data';
@Component({
  selector: 'app-table-countries',
  templateUrl: './table-countries.component.html',
  styleUrls: ['./table-countries.component.css']
})
export class TableCountriesComponent implements OnInit {

  public data : CountryData[];

  constructor(public covidService: CovidService) {
    this.data = [];

   }

  ngOnInit(): void {
    this.covidService.ask_data().subscribe((data)=>{
      let countries = data.Countries;
      let data_temp :CountryData[] =[];
      for(let i=0;i<countries.length;i++){
        const country = new CountryData(
          countries[i].Country,
          countries[i].NewConfirmed,
          countries[i].TotalConfirmed,
          countries[i].NewDeaths,
          countries[i].TotalDeaths,
          countries[i].NewRecovered,
          countries[i].TotalRecovered
        )
        data_temp.push(country);

      }
      this.data=data_temp;
    })
  }

}
