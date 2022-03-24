import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SortieData } from 'src/services/api/sortie.data';
import { ISortie } from 'src/modele/ISortie';

@Component({
  selector: 'app-modifier-sortie',
  templateUrl: './modifier-sortie.component.html',
  styleUrls: ['./modifier-sortie.component.css']
})
export class ModifierSortieComponent implements OnInit {

  public selectedSortie : ISortie;
  public sortieForm : FormGroup;
  public putId : any;

  constructor(
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private sd : SortieData
    ) { }

  ngOnInit(): void {

    // Récupération du paramètre id de l'URL
    this.route.paramMap.subscribe(param => {
      this.putId = param.get('id');
      this.initFormWithSortie(this.putId);
    })

    }

  /**
   * Fonction en charge d'initialiser le formulaire de modification
   */
  public initForm() : void {
    this.sortieForm = this.formBuilder.group({
      nom : [this.selectedSortie.nom, [Validators.required, Validators.minLength(4) ]],
      dateHeureDebut : [this.selectedSortie.dateHeureDebut, Validators.required],
      duree : [this.selectedSortie.duree, Validators.required],
      dateLimiteInscription : [this.selectedSortie.dateLimiteInscription, Validators.required],
      nbInscriptionsMax : [this.selectedSortie.nbInscriptionsMax, Validators.required],
      infosSortie : [this.selectedSortie.infosSortie, Validators.required]
    })
  }

  /**
  * Fonction en charge de chercher une sortie par son id
  * et d'initialiser un formulaire pré-rempli de ces valeurs
  */
  public initFormWithSortie(id : number) : void {
    this.sd.getSortieDetail('http://localhost/api_sortie/public/api/sortie/' + id).
      subscribe(
        //TODO: alléger la fonction
        data => {
          this.selectedSortie = data;
          this.initForm();
        });
  }

  /**
   * Fonction en charge de modifier une sortie en base de données
   */
     public onUpdate() : void {
      console.log('sortieForm values ' , this.sortieForm.value);
      const url = "http://localhost/APIsortie/public/api/sortie/" + this.selectedSortie?.id
      this.sd.updateSortie(url, this.sortieForm.value).subscribe(data =>
        this.putId = data.id)
  }

}
