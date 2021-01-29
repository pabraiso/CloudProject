export class DayData {
    public dates : String[];
    public cases : number[];
    public deaths : number[];
    public recovered : number[];

    public constructor(
        ) {
            this.cases=[];
            this.deaths=[];
            this.recovered=[];
            this.dates= [];
    
        }

}

