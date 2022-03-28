import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../app/sortie/home/home.component";
import {AppComponent} from "../app/app.component";
import {CreerSortieComponent} from "../app/sortie/creer-sortie/creer-sortie.component";
import {ModifierSortieComponent} from "../app/sortie/modifier-sortie/modifier-sortie.component";
import {AfficherSortieComponent} from "../app/sortie/afficher-sortie/afficher-sortie.component";
import {AnnulerSortieComponent} from "../app/sortie/annuler-sortie/annuler-sortie.component";
import { DetailSortieComponent } from 'src/app/sortie/detail-sortie/detail-sortie.component';
import {LoginComponent} from "../app/login/login.component";
import {SortieComponent} from "../app/sortie/sortie.component";
import {LoginGuard} from "../services/guards/login-guard.service";
import {AfficherUserComponent} from "../app/sortie/afficher-user/afficher-user.component";
import {ModifierUserComponent} from "../app/sortie/modifier-user/modifier-user.component";

const routes: Routes =[
  //chemin d'accès aux différents composants
  // quand le chemin est vide on redirige vers le composant home
 // { path : "root", component: AppComponent},
  { path : "login", component: LoginComponent},
  //LoginGuard est le gardien qui empeche d'accéder a la route sortie ( et a ses enfants).
  { path : "sortie" , canActivate : [LoginGuard], component : SortieComponent, children : [
      { path : 'home', component : HomeComponent},
      { path : 'creer', component : CreerSortieComponent},
      { path : 'modifier/:id', component : ModifierSortieComponent},
      { path : 'detail/:id', component : DetailSortieComponent },
      { path : 'annuler', component : AnnulerSortieComponent},
      { path : 'afficher', component : AfficherSortieComponent},
      { path : 'utilisateur/modifier', component : ModifierUserComponent},
      { path : 'utilisateur/:id', component : AfficherUserComponent},

    ]},

  /**
   * TODO decommenté cet ligne de code et  trouver son but (je sais pas à  quoi elle sert )
   */
  //{ path : '**', redirectTo : 'sortie/home', pathMatch: 'full' }
];



@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule{ }

