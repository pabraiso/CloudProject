import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user!: User;

  constructor(public covidService: CovidService ) { }

  ngOnInit(): void {
    this.user = this.covidService.getUser();
  }
}
