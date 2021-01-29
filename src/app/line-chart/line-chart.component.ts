import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CovidService } from '../covid.service';
import {DayData} from '../day-data';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  
  @Input() home: boolean = true;
  @Input() name : string = "WorldWide";

  public lineColor : any = [
    {
      backgroundColor: '#ffe945A1',
      borderColor : '#ffe945A1'
    },
    {
      backgroundColor: '#45a8ffA1' ,
      borderColor : '#45a8ffA1'
    },
    {
      backgroundColor: '#ff4545A1',
      borderColor : '#ff4545A1'
    }
  ];
  public lineLegend = true;
  public lineLabel : Label[];
  public lineType : ChartType ='line';
  public lineData : ChartDataSets[];
  public lineOptions: ChartOptions = {
    responsive: true,
}



  constructor(public covidService: CovidService,private router : Router) { 
    this.lineLabel=[];
    this.lineData=[];
  }

  ngOnInit(): void {
    if(this.home){

      this.covidService.ask_data_historic().subscribe((data)=>{
        const keysc = Object.keys(data["cases"]);
        const valuesc :number[] = Object.values(data["cases"]);
        const valuesd :number[] = Object.values(data["deaths"]);
        const valuesr :number[] = Object.values(data["recovered"]);
        for(var i=0; i<keysc.length; i++){
          this.lineLabel.push(keysc[i]);
        }
  
        this.lineData =[{data :valuesc, label :"Cases", backgroundColor : "#ffe945A1"},
        {data:valuesd, label : "Deaths", backgroundColor : "#45a8ffA1"},
      {data : valuesr, label : "Recovered",backgroundColor:"#ff4545A1" }]
          
        }) 

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

        for (let i = 0; i < data.length; i++){
          let date_split = (data[i].Date).split("T");
          let date = date_split[0];
          this.lineLabel.push(date);

          deaths.push(data[i].Deaths);
          cases.push(data[i].Confirmed);
          recovered.push(data[i].Recovered);
        }

        this.lineData = [
          {data: deaths, label: 'Deaths'},
          {data: cases, label: 'New Cases'},
          {data: recovered, label: 'Recovered'}
        ];
    });

    }
  }}
