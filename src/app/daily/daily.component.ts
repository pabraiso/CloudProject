import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CovidService } from '../covid.service';
import {DayData} from '../day-data';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  @Input() home: boolean = true;
  @Input() name : string = "WorldWide";

  
  public day_data : DayData;
  public barChartData : ChartDataSets[];
  public barChartLabels :Label[];
  public barChartLegend = true;
  public barChartType : ChartType = "bar";
  public barChartOptions :ChartOptions ={
    responsive: true,
  }
  




  constructor(public covidService: CovidService,private router:Router) { 
    this.day_data = new DayData();
    this.barChartData = [];
    this.barChartLabels =[];


  }

  ngOnInit(): void {
    if(this.home){
      this.covidService.ask_data_daily(8).subscribe((data)=>{
        const keysc = Object.keys(data["cases"]);
        const valuesc :number[] = Object.values(data["cases"]);
        const valuesd :number[] = Object.values(data["deaths"]);
        const valuesr :number[] = Object.values(data["recovered"]);
  
        for(var i=0; i<keysc.length-1; i++){
          this.barChartLabels.push(keysc[i+1]);
          this.day_data.cases[i]= valuesc[i+1]-valuesc[i];
          this.day_data.deaths[i]= valuesd[i+1]-valuesd[i];
          this.day_data.recovered[i]= valuesr[i+1]-valuesr[i];
  
        }
  
        this.barChartData =[{data :this.day_data.cases, label :"Cases", backgroundColor : "#ffe945A1"},
      {data:this.day_data.deaths, label : "Deaths", backgroundColor : "#45a8ffA1"},
    {data : this.day_data.recovered, label : "Recovered",backgroundColor:"#ff4545A1" }]
        
      });

    }

    else{
      let url = this.router.url;
      let url_array = url.split("/");
      
      let split_directory = url_array[url_array.length-1];
      let name_spaces = split_directory.split("%20");
      let tmp_name ="";
      for(var i =0; i<name_spaces.length;i++){
        tmp_name += name_spaces[i];
      }
      this.name = tmp_name;

      this.covidService.ask_data_country_historic(this.name).subscribe((data)=>{
        let deaths : number[] = [];
        let cases : number[] = [];
        let recovered : number[] = [];
        let length : number = data.length;

        for (let i = 0; i < 7; i++){
          let date_split = (data[length-i-1].Date).split("T");
          let date = date_split[0];
          this.barChartLabels.push(date);}
        for(let i = 1; i<8;i++){
          deaths.push(data[length-i-1].Deaths-data[length-i-2].Deaths);
          cases.push(data[length-i-1].Confirmed-data[length-i-2].Comfirmed);
          let a : number = data[length-i-1].Confirmed;
          let b : number = data[length-i-2].Comfirmed;
          let c : number = a-b;
          console.log(typeof(c));
          console.log(c);
          console.log(data[length-i-1].Confirmed.type);
          console.log(data[length-i-2].Confirmed);
          recovered.push(data[length-i-1].Recovered-data[length-i-2].Recovered);
        }

        this.barChartData = [
          {data: deaths, label: 'Daily Deaths'},
          {data: cases, label: 'Daily Cases'},
          {data: recovered, label: 'Daily Recovered'}
        ];
    });
    }
 


  }

}


