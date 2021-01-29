export class SummaryData {
    public NewConfirmed : number;
    public TotalConfirmed : number;
    public NewDeath : number;
    public TotalDeath : number;
    public NewRecovered : number;
    public TotalRecovered : number;
    public ActiveCase : number;
    public RecoveryRate:number;
    public DeathRate : number;


    public constructor(
    ) {
        this.TotalConfirmed=0;
        this.NewConfirmed =0;
        this.NewDeath =0;
        this.TotalDeath=0;
        this.NewRecovered=0;
        this.TotalRecovered=0;
        this.ActiveCase=0;
        this.DeathRate=0;
        this.RecoveryRate=0;


    }
}
