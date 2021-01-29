import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartOptions, ChartType ,ChartDataSets,ChartColor} from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CovidService } from '../covid.service';

//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() home: boolean = true;
  @Input() name : string = "WorldWide";

  
  public pieChartLabels : Label[] =["Active Cases","Total Deaths", "Total Recovered"];
  public pieChartLegend =true;
  public pieChartType : ChartType = "pie";
  public pieChartOptions : ChartOptions = {
    responsive : true,
  }
  public pieChartData : ChartDataSets[] ;
  public pieChartColors : ChartColor[] =['#ffe945A1','#ff4545A1', '#45a8ffA1'];

  constructor(public covidService: CovidService,private router: Router) { 
    this.pieChartData=[];
  }

  ngOnInit(): void {

    console.log(this.name);
    console.log(this.home);

    if(this.home){

      this.covidService.ask_data_daily(1).subscribe((data)=>{
      
        // Initializing Pie Chart
    
    let totalCase : number[] = Object.values(data.cases);
    let totalDeath: number[] = Object.values(data.deaths);
    let totalRecovered : number[] = Object.values(data.recovered) ;
    let data_chart: number[][] = [totalCase,totalDeath,totalRecovered];

    this.pieChartData = [{data: data_chart, backgroundColor: this.pieChartColors}];
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
      this.covidService.ask_data().subscribe((data)=>{
        let countriesObj = data.Countries;
        let countryOgj = countriesObj.find((item: { Country: string; }) => item.Country === this.name);
        let totalCase : number[] = countryOgj.TotalConfirmed;
        let totalDeaths:number[]=countryOgj.TotalDeaths;
        let totalRecovered : number[]=countryOgj.TotalRecovered;
        let data_chart: number[][] = [totalCase,totalDeaths,totalRecovered];
        this.pieChartData = [{data: data_chart, backgroundColor: this.pieChartColors}];




    });

    


    }
  }
}