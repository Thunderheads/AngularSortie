import { Component, OnInit } from '@angular/core';
import {Sortie} from "../../modele/Sortie";
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Lieu} from "../../modele/Lieu";
import {Campus} from "../../modele/Campus";
import {Etat} from "../../modele/Etat";
import {Ville} from "../../modele/Ville";
import {SortieData} from "../../services/api/sortie.data";
import {ILieu} from "../../modele/interface/ILieu";
import {LieuData} from "../../services/api/lieu.data";
import {CampusData} from "../../services/api/campus.data";
import {ICampus} from "../../modele/interface/ICampus";
import {ErreurMessage} from "../../services/erreur/erreurMessage";







@Component({
  selector: 'app-creer-sortie',
  templateUrl: './creer-sortie.component.html',
  styleUrls: ['./creer-sortie.component.css']
})

export class CreerSortieComponent implements OnInit {

  //methode reactive
  // attribut pour sauvegarder les messages d'erreurs

  public registerForm : FormGroup;
  public postId : any;
  public lstLieux : ILieu[] = [];
  public lstCampus : ICampus[] = [];
  public errorMsg : string;


  public sortie : Sortie = new Sortie();
  constructor(private formBuilder : FormBuilder,
              private sd: SortieData,
              private lieuData :LieuData,
              private campusData : CampusData,
              private errorMessages :ErreurMessage) {
      // creation des differentes instances des objets
      this.sortie.lieu = new Lieu();
      this.sortie.lieu.ville = new Ville();
      this.sortie.etat = new Etat();
      this.sortie.campus = new Campus();
  }





  // fonction qui fait quelque chose au lancement de la page
  ngOnInit(): void {
    //methode reactive
    //on constitue un form group qui lui meme est consituté de plusieurs forms controles

    this.registerForm = this.formBuilder.group({

      //premiere valuer = valeur par défaut, pour mettre plusieurs validators, utiliser un array
      nom : ['mon nom de groupe', [Validators.required, Validators.minLength(4) ]],
      //dateGroup : this.formBuilder.group({
      dateHeureDebut :  ['02-08-1997',this.errorMessages.compareDate()],
      dateLimiteInscription : ['1970-01-01',this.errorMessages.compareDate()],
      //}),
      nbInscriptionsMax : '9',
      duree : '45',
      codePostal : '',
      infosSortie : 'coucou pas d\'infos,',

      rue : '',
      latitude: '',
      //longitude: '',
      ville : '',
      campus : '',
      lieu : '',
    })
    //this.defaultValueForm();
    //abonnement a l'observateur
    // ! - Non-null assertion operator

    // Controles du formulaire
    this.errorMsg = this.errorMessages.formControlName(this.registerForm.get('nom')!);

    this.getLieux();
    this.getCampus();
  }

  // generer des valeurs par défaut
  public defaultValueForm(){
    //tout les valeurs doivent etre renseignées avec setValue sinon utiliser patchValue
    this.registerForm.setValue({
      nom : 'banana',
      //campus : "",
      ville : '',
      lieu : 'Choisir un lieu',
      nbInscriptionsMax : 9,
      rue : "che poa",
      duree : 60,
      codePostal : 35000,
      infosSortie : "sortie cool",
      latitude: "",
      //longitude: "",

    })
  }

  /**
   * Fonction en charge d'ajouter une sortie en base de données
   */
  public onSave(){
    console.log(this.registerForm.value);
    const url = "http://localhost/APISortie/public/api/sortie/";
    this.sd.createSortie(url, this.registerForm.value).subscribe(data =>
      this.postId = data.id)
    console.log(this.postId)
    ;
  }

  /**
   * fonction en charge de mettre a jour les informations des champs quand un lieu est choisit
   *
   */
  public setValues(){
    //permet de recuperer ma valeur du lieu
    console.log(this.registerForm.get('lieu')?.value)
    let url = "http://localhost/APISortie/public/api/lieu/";
    this.lieuData.getLieu(url+=this.registerForm.get('lieu')?.value).subscribe(
      data =>{
        console.log(data)
        this.registerForm.patchValue({ville : data.ville.nom})
        this.registerForm.patchValue({rue : data.rue})
        this.registerForm.patchValue({codePostal : data.ville.codePostal})
        this.registerForm.patchValue({latitude : data.latitude})
      }

    )
    console.log('coucou');

  }

  /**
   * Fonction en charge de recupérer la liste des lieux
   */
  public getLieux(){

    const url = "http://localhost/APISortie/public/api/lieux/";

    this.lieuData.getLieux(url).subscribe(
      data =>{
        for( let element of data){
          this.lstLieux.push(element);
        }
      }

    )
  }


  public getCampus() {
    const url = "http://localhost/APISortie/public/api/campus"
    this.campusData.getCampus(url).subscribe(
      data => {
        for (let element of data) {
          this.lstCampus.push(element);
        }

      }
    )
  }

}
