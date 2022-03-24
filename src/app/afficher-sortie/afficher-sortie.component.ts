import { Component, OnInit } from '@angular/core';
import { SortieData} from "../../services/api/sortie.data";
import {ISortie} from "../../modele/interface/ISortie";


@Component({
  selector: 'app-afficher-sortie',
  templateUrl: './afficher-sortie.component.html',
  styleUrls: ['./afficher-sortie.component.css']
})
export class AfficherSortieComponent implements OnInit {


  public datas : ISortie[] = [];
  public selectedSortie ?: ISortie;

  constructor(private sd: SortieData) {

  }
  // injection dependance


  ngOnInit(): void {

   this.sd.getSortie('http://localhost/APISortie/public/api/sortie').
    subscribe(
      data => {
        console.log(data);
        // @ts-ignore
        for( let element : ISortie of data){
          this.datas.push(element);
        }


      });


  }

  onSelectSortie(data : ISortie){
    this.selectedSortie = data;
  }

}
