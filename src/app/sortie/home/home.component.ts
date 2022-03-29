import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pseudo : string;
  constructor() { }

  ngOnInit(): void {
     this.pseudo = JSON.parse(sessionStorage.getItem('user')!).nom
  }

}
