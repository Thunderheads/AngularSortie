import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISortie} from "../modele/interface/ISortie";

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})

export class SortieData {


  constructor(private http: HttpClient) { }

  /**
   * fonction en charge de requeter l'api symfony pour en extraire toute les sorties
   * @param url
   */
  public getSortie(url: string): Observable<ISortie> {

    return this.http.get<ISortie>(url, httpOptions)
  }

  /**
   * Fonction en charge d'envoyer la nouvelle sortie en base de données
   * @param url
   */
  public createSortie(url: string, sortie : ISortie): Observable<ISortie> {

    return this.http.post<ISortie>(url, sortie)
  }
}
