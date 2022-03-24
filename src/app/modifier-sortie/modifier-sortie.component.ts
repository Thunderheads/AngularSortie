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

  public selectedSortie : ISortie;
  public sortieForm : FormGroup;
  public putId : any;

  constructor(
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private sd : SortieData
    ) { }

  ngOnInit(): void {
<<<<<<< HEAD
    // Récupération de la sortie correspondant à l'id passé en paramètre
    this.sd.getSortieDetail('http://localhost/APIsortie/public/api/sortie/' + this.route.snapshot.paramMap.get('id')).
    subscribe(
      data => {
        this.selectedSortie = data;
        console.log('selectedSortie ' , this.selectedSortie);
      });
=======
>>>>>>> 1a2e3ad (modifier-sortie)

    // Initialisation du formulaire
    this.initForm();

    // Récupération du paramètre id de l'URL et affichage de la sortie correspondante
    // dans le formulaire
    this.route.paramMap.subscribe(param => {
      this.putId = param.get('id');
      this.getAndDisplaySortie(this.putId);
    })
    }

  /**
   * Fonction en charge d'initialiser le formulaire de modification
   */
  public initForm() {
    this.sortieForm = this.formBuilder.group({
      nom : ['', [Validators.required, Validators.minLength(4) ]],
      dateHeureDebut : ['', Validators.required],
      duree : ['', Validators.required],
      dateLimiteInscription : ['', Validators.required],
      nbInscriptionsMax : ['', Validators.required],
      infosSortie : ['', Validators.required]
    })
  }

  /**
  * Fonction en charge de chercher une sortie par son id
  * et de l'afficher (appel à la fonction displaySortie)
  */
  public getAndDisplaySortie(id : number) : void {
    this.sd.getSortieDetail('http://localhost/api_sortie/public/api/sortie/' + id).
      subscribe(
        data => {
          this.selectedSortie = data;
          this.displaySortie(this.selectedSortie);
        });
  }

  /**
   * Fonction en charge d'afficher une sortie
   */

  public displaySortie(sortie : ISortie) :void {

    sortie = this.selectedSortie;

    this.sortieForm.patchValue({
      nom: sortie.nom,
      dateHeureDebut : sortie.dateHeureDebut,
      duree : sortie.duree,
      dateLimiteInscription : sortie.dateLimiteInscription,
      nbInscriptionsMax : sortie.nbInscriptionsMax,
      infosSortie : sortie.infosSortie
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
  }

}
