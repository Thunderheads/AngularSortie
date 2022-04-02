import { Component, OnInit } from '@angular/core';
import {ISortie} from "../../../../modele/interface/ISortie";
import {SortieData} from "../../../../services/api/sortie.data";
import {IUser} from "../../../../modele/interface/IUser";

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.css']
})
export class HomeTableComponent implements OnInit {

  public lstSorties : ISortie[] = [];
  public userID : number;
  public currentDate: Date;

  constructor(private sd: SortieData) {

  }

  ngOnInit(): void {
    this.userID = JSON.parse(sessionStorage.getItem('user')!).id
    this.sd.getSortie('http://localhost/APISortie/public/api/sortie').
    subscribe(
      data => {
        for( let element of data){
          this.lstSorties.push(element);
        }
      });
    this.utcTime();
  }

  private utcTime(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  public isParticipant(participants? : IUser[]){
    if(participants != undefined){
      for(let participant of participants){
        if(participant.id == this.userID){
          return true
        }
      }
    }
    return false
  }

  public isGreaterDate(dateToCompare : Date) : boolean{

    if(new Date(dateToCompare).getTime() > new Date(this.currentDate).getTime()){
      return true
    }
    return false
  }

}
