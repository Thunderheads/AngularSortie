import {Component, OnChanges, OnInit} from '@angular/core';
import {Sortie} from "../../../modele/Sortie";
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Lieu} from "../../../modele/Lieu";
import {Campus} from "../../../modele/Campus";
import {Etat} from "../../../modele/Etat";
import {Ville} from "../../../modele/Ville";
import {SortieData} from "../../../services/api/sortie.data";
import {ILieu} from "../../../modele/interface/ILieu";
import {LieuData} from "../../../services/api/lieu.data";
import {CampusData} from "../../../services/api/campus.data";
import {ICampus} from "../../../modele/interface/ICampus";
import {ErreurMessage} from "../../../services/erreur/erreurMessage";
import {debounceTime} from "rxjs";







@Component({
  selector: 'app-creer-sortie',
  templateUrl: './creer-sortie.component.html',
  styleUrls: ['./creer-sortie.component.css']
})

export class CreerSortieComponent implements OnInit {

  //methode reactive
  // attribut pour sauvegarder les messages d'erreurs

  public isDone = {
    isCorrect : true,
    isCreate : false,
  }
  public registerForm : FormGroup;
  public postId : number;
  public lstLieux : ILieu[] = [];
  public lstCampus : ICampus[] = [];
  public errorMsg = {
    nom : "",
    dateDebut : "",
    dateLimiteInscription : "",
    nbInscriptionsMax : "",

    duree : "",
    codePostal :  "",
    infosSortie : "",
    rue : "",
    latitude: "",
    ville : "",
    campus : "",
    lieu : "",
  }


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
      //format accepté par datedebut 1997-08-02T16:00
      dateHeureDebut :  ['',this.errorMessages.compareDate()],
      dateLimiteInscription : ['2050-01-01',this.errorMessages.compareDate()],
      //}),
      nbInscriptionsMax : ['9',[Validators.min(1), Validators.max(1000),  Validators.required]],
      duree : ['45',[Validators.required]],
      //utilisation d'une regex pour le code postal.
      codePostal : ['',[Validators.required , Validators.pattern('(?:0[1-9]|[1-8]\\d|9[0-8])\\d{3}')]],
      infosSortie : ['coucou pas d\'infos,',[Validators.required]],

      rue : ['',[Validators.required]],
      latitude: '',
      //longitude: '',
      ville : ['',[Validators.required]],
      campus : ['0',[]],
      // on passe la value de l'option a selectionner
      lieu : ['0',[]],


    })
    //this.defaultValueForm();
    //abonnement a l'observateur
    // ! - Non-null assertion operator

    // Controles du formulaire


    this.getLieux();
    this.getCampus();

    //input name
    this.registerForm.get('nom')!.valueChanges.pipe(
      //permet de définir un temps avant de lancer la suite
      debounceTime(1000)
    ).subscribe( val  => {
      this.errorMsg.nom = this.errorMessages.setMessage(
        this.registerForm.get('nom')!,
        this.errorMessages.validationNameMsg
      );});

    //input date debut
    this.registerForm.get('dateHeureDebut')!.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe( val  => {
      this.errorMsg.dateDebut = this.errorMessages.setMessage(
        this.registerForm.get('dateHeureDebut')!,
        this.errorMessages.validationDateMsg
      );});


    //input date limite d'inscription
    this.registerForm.get('dateLimiteInscription')!.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe( val  => {
      this.errorMsg.dateLimiteInscription = this.errorMessages.setMessage(
        this.registerForm.get('dateLimiteInscription')!,
        this.errorMessages.validationDateMsg
      );});

    //input nombre maximum d'inscription
    this.registerForm.get('nbInscriptionsMax')!.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe( val  => {
      this.errorMsg.nbInscriptionsMax = this.errorMessages.setMessage(
        this.registerForm.get('nbInscriptionsMax')!,
        this.errorMessages.validationNbInscriptionsMax
      );});


    // input codePostal
    this.registerForm.get('codePostal')!.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe( val  => {
      console.log(this.registerForm.get('codePostal')!.errors)
      this.errorMsg.codePostal = this.errorMessages.setMessage(
        this.registerForm.get('codePostal')!,
        this.errorMessages.validationCodePostal
      );});

    // input duree
    // input infosSortie
    // input rue
    // input latitude
    // input ville
    // input campus
    // input lieu
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
   * fonction en charge de mettre a jour les informations des champs quand un lieu est choisit
   *
   */
  public setValues(){
    // on veut pas lancer l'appel asynchore quand on est sur "choix lieu"
    if(this.registerForm.get('lieu')?.value > 0){
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
    } else {
      this.registerForm.patchValue({ville : ""})
      this.registerForm.patchValue({rue : ""})
      this.registerForm.patchValue({codePostal : ""})
      this.registerForm.patchValue({latitude : ""})
    }


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

  /**
   * Fonction en charge d'ajouter une sortie en base de données seulement si le formualire est valide
   * (appelée au niveau de la balise form par la directive ngSubmit )
   */
  public onSave(){
    if(this.registerForm.status === 'VALID' && this.registerForm.touched ){
      const url = "http://localhost/APISortie/public/api/sortie/";
      this.sd.createSortie(url, this.registerForm.value).subscribe(data =>{
        this.postId = data.id
        this.isCreated(this.postId);

      });
    } else {
      this.isCreated(this.postId)
    }

  }

  private isCreated(value : number){
    if (value !== undefined){
      this.isDone.isCreate = true;
      this.isDone.isCorrect = true;
    } else {
      this.isDone.isCreate = false;
      this.isDone.isCorrect = false;
    }
  }

}
