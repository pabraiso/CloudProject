import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';
import {SummaryData} from '../summary-data';
import {ChartsModule} from 'ng2-charts';
import { New } from '../new';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public summary_data : SummaryData ;
  public home :boolean =true;
  public name:string = "WorldWide";
  public news : New[];

  constructor(public covidService: CovidService,) { 
    this.summary_data = new SummaryData();
    this.news=[];
  }

  ngOnInit(): void {
    this.covidService.ask_data().subscribe((data)=>{
      this.summary_data.TotalConfirmed = data.Global.TotalConfirmed;
      this.summary_data.NewConfirmed = data.Global.NewConfirmed;
      this.summary_data.NewDeath =data.Global.NewDeaths;
      this.summary_data.TotalDeath=data.Global.TotalDeaths;
      this.summary_data.NewRecovered=data.Global.NewRecovered;
      this.summary_data.TotalRecovered=data.Global.TotalRecovered;
      
      this.summary_data.ActiveCase=this.summary_data.TotalConfirmed-this.summary_data.TotalDeath-this.summary_data.TotalRecovered;
      this.summary_data.DeathRate=Math.round(this.summary_data.TotalDeath/this.summary_data.TotalConfirmed*10000)/100;
      this.summary_data.RecoveryRate=Math.round(this.summary_data.TotalRecovered/this.summary_data.TotalConfirmed*10000)/100;


    });
    this.covidService.getNews().subscribe((data)=>{
      let tmp_news = []
      for(let i=0; i<data.length; i++){
        var new_i = data[i] as New;
        if(new_i.country == "Worldwide"){
          tmp_news.push(new_i);
        }}
      this.news = tmp_news;
    });


    

  }

}
