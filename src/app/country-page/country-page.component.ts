import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CountryData } from '../country_data';
import { CovidService } from '../covid.service'
import { Params, ActivatedRoute } from '@angular/router';;
import {SummaryData} from '../summary-data';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { New } from '../new';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {
  public home :boolean =false;
  public country_data : SummaryData;
  public name :string ;
  public news : New[];



  constructor(public covidService : CovidService,private router: Router) {
    this.country_data = new SummaryData();
    this.name = "WorldWide";
    this.news = [];
   }
  ngOnInit(): void {
    let url = this.router.url;
    let url_array = url.split("/");
    
    let split_directory = url_array[url_array.length-1];
    let name_spaces = split_directory.split("%20");
    let tmp_name ="";
    for(var i =0; i<name_spaces.length;i++){
      tmp_name += name_spaces[i];
    }
    this.name = tmp_name;
    this.covidService.data_upload(this.name);
    
    this.covidService.ask_cloud_country(this.name).subscribe((data:any)=>{
      this.country_data.TotalConfirmed = data.TotalConfirmed;
      this.country_data.NewConfirmed = data.NewConfirmed;
      this.country_data.NewDeath =data.NewDeaths;
      this.country_data.TotalDeath=data.totalDeaths;
      this.country_data.NewRecovered=data.NewRecovered;
      this.country_data.TotalRecovered=data.TotalRecovered;
      
      this.country_data.ActiveCase=data.ActiveCases;
      this.country_data.DeathRate=data.DeathRate;
      this.country_data.RecoveryRate=data.RecoveryRate;
      
    })
    this.covidService.getNews().subscribe((data)=>{
      let tmp_news = []
      for(let i=0; i<data.length; i++){
        var new_i = data[i] as New;
        if(new_i.country == this.name){
          tmp_news.push(new_i);
        }}
      this.news = tmp_news;
    });

  }



}