
import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';
import { User } from '../user.model';
import { New } from '../new';
import { FormsModule } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {


  user!: User;
  public admin :boolean =false;

  date: any;
  country!: String;
  description!: String;

  constructor(public covidService : CovidService) { }

  ngOnInit(): void {
  this.user = this.covidService.getUser();
  console.log(this.user.uid);
  this.covidService.getAdmins().subscribe((data: string | any[])=>{
    console.log(data.length);
    for(var i=0; i<=data.length; i++){
      console.log(data[i].uid);
      if(this.user.uid == data[i].uid){

        this.admin = true;
      }


    }
    console.log(this.admin);
    
  })
  }

  addNews(){
    if(this.admin){
    const currentNew: New = {
      date: new Date(this.date),
      country: this.country,
      description: this.description,
      uid: this.user.uid,
      displayName: this.user.displayName,
      email: this.user.email
    };
    this.covidService.addNew(currentNew);
    this.date = undefined;
    this.description = undefined!;
    this.country = undefined!;
  }
}

}