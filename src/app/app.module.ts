import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './sortie/home/home.component';
import { AppRoutingModule} from "../routing/app-routing.module";
import { CreerSortieComponent } from './sortie/creer-sortie/creer-sortie.component';
import { AnnulerSortieComponent } from './sortie/annuler-sortie/annuler-sortie.component';
import { ModifierSortieComponent } from './sortie/modifier-sortie/modifier-sortie.component';
import { AfficherSortieComponent } from './sortie/afficher-sortie/afficher-sortie.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SortieData} from "../services/api/sortie.data";
import { HttpClientModule } from '@angular/common/http';
import { DetailSortieComponent } from './sortie/detail-sortie/detail-sortie.component';
import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr';
import { LoginComponent } from './login/login.component';
import { SortieComponent } from './sortie/sortie.component';
import { AfficherUserComponent } from './sortie/afficher-user/afficher-user.component';
import { ModifierUserComponent } from './sortie/modifier-user/modifier-user.component';
import { HomeTableComponent } from './sortie/home/home-table/home-table.component';

registerLocaleData(localFr, 'fr')


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreerSortieComponent,
    AnnulerSortieComponent,
    ModifierSortieComponent,
    AfficherSortieComponent,
    DetailSortieComponent,
    LoginComponent,
    SortieComponent,
    AfficherUserComponent,
    ModifierUserComponent,
    HomeTableComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SortieData],
  bootstrap: [AppComponent]
})
export class AppModule { }
