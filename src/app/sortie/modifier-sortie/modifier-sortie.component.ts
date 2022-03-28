import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SortieData } from 'src/services/api/sortie.data';
import { ISortie } from 'src/modele/ISortie';
import { catchError } from 'rxjs';

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
    private sd : SortieData,
    private router : Router
    ) { }

  ngOnInit(): void {

    // Récupération du paramètre id de l'URL
    this.route.paramMap.subscribe(param => {
      this.putId = param.get('id');
      this.initFormWithSortie(this.putId);
    })

    }

  /**
  * Fonction en charge de chercher une sortie par son id
  * et d'initialiser un formulaire pré-rempli de ces valeurs
  */
  public initFormWithSortie(id : number) : void {
    this.sd.getSortieDetail('http://localhost/APIsortie/public/api/sortie/' + id).
      subscribe(
        //TODO: alléger la fonction
        data => {
          this.selectedSortie = data;
          this.initForm();
        });
  }

  /**
   * Fonction en charge d'initialiser le formulaire de modification avec la sortie sélectionnée
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
   * Fonction en charge de modifier une sortie en base de données
   */
     public onUpdate() : void {
      console.log('sortieForm values ' , this.sortieForm.value);
      const url = "http://localhost/APIsortie/public/api/sortie/" + this.selectedSortie?.id
      this.sd.updateSortie(url, this.sortieForm.value).subscribe({
        next : data => {
          console.log("je suis dans le next"),
          this.putId = data.id,
          this.router.navigate(['sortie/afficher'])
        }
      })
  }

  /**
   * Fonction en charge de supprimer une sortie en base de données
   */
     public onDelete() : void {
      const url = "http://localhost/APIsortie/public/api/sortie/?id=" + this.selectedSortie?.id
      this.sd.deleteSortie(url).subscribe({
        next : () => this.router.navigate(['/sortie/afficher'])
        }
      );
  }

}
