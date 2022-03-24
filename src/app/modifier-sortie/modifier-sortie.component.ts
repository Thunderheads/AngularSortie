import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SortieData } from 'src/api/sortie.data';
import { ISortie } from 'src/modele/ISortie';

@Component({
  selector: 'app-modifier-sortie',
  templateUrl: './modifier-sortie.component.html',
  styleUrls: ['./modifier-sortie.component.css']
})
export class ModifierSortieComponent implements OnInit {

  @Input() selectedSortie ?: ISortie;
  public sortieForm : FormGroup;
  public putId : any;

  constructor(
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private sd : SortieData
    ) { }

  ngOnInit(): void {
    // Récupération de la sortie correspondant à l'id passé en paramètre
    this.sd.getSortieDetail('http://localhost/APIsortie/public/api/sortie/' + this.route.snapshot.paramMap.get('id')).
    subscribe(
      data => {
        this.selectedSortie = data;
        console.log('selectedSortie ' , this.selectedSortie);
      });

      // Alimentation du formulaire
      this.sortieForm = this.formBuilder.group({
        nom : new FormControl(this.selectedSortie?.nom, Validators.required),
        dateHeureDebut : new FormControl(this.selectedSortie?.dateHeureDebut, Validators.required),
        duree : new FormControl(this.selectedSortie?.duree, Validators.required),
        dateLimiteInscription : new FormControl(this.selectedSortie?.dateLimiteInscription, Validators.required),
        nbInscriptionsMax : new FormControl(this.selectedSortie?.nbInscriptionsMax, Validators.required),
        infosSortie : new FormControl(this.selectedSortie?.infosSortie, Validators.required)
      })
    }

  /**
   * Fonction en charge de modifier une sortie en base de données
   */
   public onUpdate(){
      console.log('sortieForm values ' , this.sortieForm.value);
      const url = "http://localhost/APIsortie/public/api/sortie/" + this.selectedSortie?.id
      this.sd.updateSortie(url, this.sortieForm.value).subscribe(data =>
        this.putId = data.id)
      console.log(this.putId);

  }

}
