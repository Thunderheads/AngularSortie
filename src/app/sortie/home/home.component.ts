import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pseudo : string;
  myDate: Date;
  constructor() { }

  ngOnInit(): void {
     this.pseudo = JSON.parse(sessionStorage.getItem('user')!).nom;
      this.utcTime();

  }

  utcTime(): void {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
  }
}
