import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { User } from './user.model';
import { Router } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import { New } from './new';
import { CountryData } from './country_data';
@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private user!:User;
  private data! : JSON;

  constructor(private afAuth : AngularFireAuth, 
    private router:Router, 
    private firestore: AngularFirestore,
    private http: HttpClient
    ) { }


  async signInWithGoogle(){

  const credentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  this.user = {
    uid : credentials.user!.uid,
    displayName : credentials.user!.displayName,
    email : credentials.user!.email

  };
  localStorage.setItem("user", JSON.stringify(this.user));
  this.update_data();
  this.router.navigate(["HomePage"]);
  }
private update_data(){
  this.firestore.collection("users").doc(this.user.uid!).set({
    uid:this.user.uid,  
    displayName:this.user.displayName,
    email:this.user.email
  },{merge:true});
}

getUser(){
  if(this.user==null && this.userIn()){
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  return this.user;
}

userIn() : boolean{
  return JSON.parse(localStorage.getItem("user")!)!=null;
}

signOut(){
  this.afAuth.signOut();
  localStorage.removeItem("user");
  this.user!=null;
  this.router.navigate(["signIn"]);

}
ask_data(){ 
  return this.http.get<any>("https://api.covid19api.com/summary");
}

ask_data_daily(i : number){

  return this.http.get<any>("https://corona.lmao.ninja/v2/historical/all?lastdays="+String(i));
}
data_upload(country : string){
  this.http.get<any>("https://api.covid19api.com/summary").subscribe((data)=>{
    let countriesObj = data.Countries;
    let countryOgj = countriesObj.find((item: { Country: string; }) => item.Country === country);

    let country_data:CountryData = new CountryData(country
      ,countryOgj.NewConfirmed
      , countryOgj.TotalConfirmed
      , countryOgj.NewDeaths
      , countryOgj.TotalDeaths
      , countryOgj.NewRecovered
      , countryOgj.TotalRecovered);
      this.firestore.collection("countries").doc(country).set({
        NewConfirmed : country_data.NewConfirmed,
        TotalConfirmed : country_data.TotalConfirmed,
        NewDeaths : country_data.NewDeath,
        totalDeaths : country_data.TotalDeath,
        NewRecovered : country_data.NewRecovered,
        TotalRecovered : country_data.TotalRecovered,
        ActiveCases : country_data.ActiveCase,
        DeathRate : country_data.DeathRate,
        RecoveryRate: country_data.RecoveryRate,
      },{merge:true});

    


  })


}
ask_cloud_country(country: string){
  return this.firestore.collection("countries").doc(country).valueChanges();
}

ask_data_historic(){
  var initial = new Date('04/13/2020');
  var current = new Date();
  var difference = current.getTime() - initial.getTime();
  var days = Math.round(difference / (1000 * 3600 * 24));

  return this.http.get<any>("https://corona.lmao.ninja/v2/historical/all?lastdays="+days.toString());

}

ask_data_country_historic(country: string){
  return this.http.get<any>("https://api.covid19api.com/total/dayone/country/"+country);
}

addNew(News: New){
  this.firestore.collection("news").add(News);
}
getNews(){
  return this.firestore.collection("news", ref => ref.orderBy('date', 'desc')).valueChanges();
}
getAdmins(){
  return this.firestore.collection("admins").valueChanges();
}

}

