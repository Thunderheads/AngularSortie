import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortieData } from 'src/services/api/sortie.data';
import { ISortie } from 'src/modele/ISortie';

@Component({
  selector: 'app-detail-sortie',
  templateUrl: './detail-sortie.component.html',
  styleUrls: ['./detail-sortie.component.css']
})
export class DetailSortieComponent implements OnInit {

  @Input() selectedSortie ?: ISortie;

  constructor(
    private route : ActivatedRoute,
    private sd : SortieData
  ) { }

  ngOnInit(): void {

    const id  = this.route.snapshot.paramMap.get('id');

    this.sd.getSortieDetail('http://localhost/APIsortie/public/api/sortie/' + id).
    subscribe(
      data => {
        console.log('data ', data);
        // @ts-ignore
        this.selectedSortie = data;
      });

  }

}
