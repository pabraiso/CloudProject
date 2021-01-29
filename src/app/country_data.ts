export class CountryData {
    public country : string;
    public NewConfirmed : number;
    public TotalConfirmed : number;
    public NewDeath : number;
    public TotalDeath : number;
    public NewRecovered : number;
    public TotalRecovered : number;
    public ActiveCase :number;
    public DeathRate : number;
    public RecoveryRate : number;



    public constructor(  country : string,
        NewConfirmed : number,
        TotalConfirmed : number,
        NewDeath : number,
        TotalDeath : number,
        NewRecovered : number,
        TotalRecovered : number,
    ) {
        this.TotalConfirmed=TotalConfirmed;
        this.NewConfirmed =NewConfirmed;
        this.NewDeath =NewDeath;
        this.TotalDeath=TotalDeath;
        this.NewRecovered=NewRecovered;
        this.TotalRecovered=TotalRecovered;

        this.country = country;
        this.ActiveCase = TotalConfirmed - TotalDeath - TotalRecovered;
        this.DeathRate = Math.round(this.TotalDeath/this.TotalConfirmed*10000)/100;
        this.RecoveryRate = Math.round(this.TotalRecovered/this.TotalConfirmed*10000)/100;


    }}
