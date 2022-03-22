import { Component, OnInit } from '@angular/core';
import {Sortie} from "../../modele/Sortie";
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from "@angular/forms";
import {Lieu} from "../../modele/Lieu";
import {Campus} from "../../modele/Campus";
import {Etat} from "../../modele/Etat";
import {Ville} from "../../modele/Ville";
import {debounceTime} from "rxjs";
import {ISortie} from "../../modele/ISortie";
import {SortieData} from "../../api/sortie.data";
import {ILieu} from "../../modele/ILieu";
import {LieuData} from "../../api/lieu.data";



/**
 * Fonction en charge de transformer une date en timestamp (les millisecondes sont comprises
 * car Date.now les prend en compte aussi
 * @param strDate
 */
function toTimestamp(strDate : any){
  let datum = Date.parse(strDate);
  return datum;
}

function compareDate() : ValidatorFn{

  // key de type string
  return (c : AbstractControl) : {[key:string] : boolean} | null => {

    if((toTimestamp(c.value) < Date.now())){
      return{ "dateError" : true}
    }
    return null;
  };
}

@Component({
  selector: 'app-creer-sortie',
  templateUrl: './creer-sortie.component.html',
  styleUrls: ['./creer-sortie.component.css']
})

export class CreerSortieComponent implements OnInit {

  //methode reactive
  public registerForm : FormGroup;
  public postId : any;
  public lstLieux : ISortie[] = [];


  public sortie : Sortie = new Sortie();
  constructor(private formBuilder : FormBuilder, private sd: SortieData, private lieuData :LieuData) {
      // creation des differentes instances des objets
      this.sortie.lieu = new Lieu();
      this.sortie.lieu.ville = new Ville();
      this.sortie.etat = new Etat();
      this.sortie.campus = new Campus();
  }

  // attribut pour sauvegarder les messages d'erreurs
  public errorMsg : string;


  private validationErrorsMessages = {
    // clé => valeur (message d'erreur)
    'required' :'Entrez un nom à votre sortie',
    'minlength' : 'Le nom doit faire au moins 8 caractères'
  };



  // fonction qui fait quelque chose au lancement de la page
  ngOnInit(): void {
    //methode reactive
    //on constitue un form group qui lui meme est consituté de plusieurs forms controles

    this.registerForm = this.formBuilder.group({

      //premiere valuer = valeur par défaut, pour mettre plusieurs validators, utiliser un array
      nom : ['mon nom de groupe', [Validators.required, Validators.minLength(4) ]],
      //dateGroup : this.formBuilder.group({
      dateHeureDebut :  ['02-08-1997',compareDate()],
      dateLimiteInscription : ['1970-01-01',compareDate()],
      //}),
      nbInscriptionsMax : '9',
      duree : '45',
      codePostal : '',
      infosSortie : 'coucou pas d\'infos,'

      //rue : '',
      //latitude: '',
      //longitude: '',
      //ville : '',
      //campus : '',
      //lieu : '',
    })
    //this.defaultValueForm();
    //abonnement a l'observateur
    // ! - Non-null assertion operator

    let nomControle = this.registerForm.get('nom')!;
    nomControle.valueChanges.pipe(
      //permet de définir un temps avant de lancer la suite
      debounceTime(1000)
    ).subscribe( val  => {
      this.setMessage(nomControle);
    });
  }

  // generer des valeurs par défaut
  public defaultValueForm(){
    //tout les valeurs doivent etre renseignées avec setValue sinon utiliser patchValue
    this.registerForm.setValue({
      nom : 'banana',
      //campus : "",
      //ville : '',
      lieu : '',
      nbInscriptionsMax : 9,
      //rue : "che poa",
      duree : 60,
      //codePostal : 35000,
      infosSortie : "sortie cool",
      //latitude: "",
      //longitude: "",

    })
  }

  /**
   * Fonction en charge d'ajouter une sortie en base de données
   */
  public onSave(){
    console.log(this.registerForm.value);
    const url = "http://localhost/api_sortie/public/api/sortie/";
    this.sd.createSortie(url, this.registerForm.value).subscribe(data =>
      this.postId = data.id)
    console.log(this.postId)
    ;
  }

  public getLieux(){
    const url = "http://localhost/api_sortie/public/api/lieu/";
    this.lieuData.getLieux(url).subscribe(
      data =>{

        for( let element of data){
          /**
           * TODO modifier de sorte a ne pas utiliser le ignore
           */
          this.lstLieux.push(element);
        }
      }

    )
  }


  //tester la date
  public dateValue(){
    //recupere la date stocker
    let date = this.registerForm.get('dateLimite')?.value;
    let myMoment = new Date(Date.now());
    //console.log(myMoment.getMilliseconds())
  }

  /**
   * Fonction en charge d'afficher un message d'erreur
   * @param val
   * @private
   */
  private setMessage(val : AbstractControl) : void{
      this.errorMsg ="";
      if((val.touched || val.dirty) && val.errors){
        // permet de recuperer les clés des erreurs génerées
        //console.log(this.validationErrorsMessages['required'])
        // ma façon :
        // dans object.key a la position 0 on a le type d'erreur renvoyée (à chaque fois on renvoie une seul erreur donc ça changera pas elle sera toujours a la position 0)
        // le as any est nécessaire sinon on peut pas accéder à l'erreur correspondante dans le tableau crée plus haut
        // ainsi recuperer la clé nous donne accés à la valeur indexée dans le tableau qu'on stocke dans errorMsg
        this.errorMsg = (this.validationErrorsMessages as any)[Object.keys(val.errors)[0]];
      }
  }

}
