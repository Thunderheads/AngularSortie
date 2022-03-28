import { Component, OnInit } from '@angular/core';
import {UserData} from "../../services/api/user.data";
import {HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public user = {
    email : "",
    motdepasse : ""
  }
  public logError = false;

  constructor( private userData : UserData,
                private router: Router ) { }

  /**
   * Fonction en charge de vérifier que l'utilisateur existe dans la base de données
   */
  public onSave() : void{

    let log : boolean;
    const url = "http://localhost/APISortie/public/api/user/?email=" + this.user.email + "&password=" +this.user.motdepasse
    this.userData.getUser(url).subscribe(data=>{
      if(data === null){
        this.logError = true;
      } else {
        this.logError =false;
        // ici on json stringify et quand on voudra recuperer des valeurs on devra faire l'inverse
        sessionStorage.setItem('user',  JSON.stringify(data))
        // ici on procède à une redirection sur la page home (l'enfant de sortie)
        this.router.navigate((['sortie','home']))
      }
    })
  }


  ngOnInit(): void {
    // partie déconnexion
    if(sessionStorage.getItem('user') !== null){
      sessionStorage.removeItem('user')
      console.log( sessionStorage.getItem('user'))
    }
  }

}
