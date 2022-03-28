import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILieu} from "../../modele/interface/ILieu";
import {ICampus} from "../../modele/interface/ICampus";

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
export class CampusData{
  constructor(private http: HttpClient) { }

  /**
   * Fonction en charge de lister les campus.
   * @param url
   */
  public getCampus(url: string): Observable<ICampus> {

    return this.http.get<ICampus>(url)
  }
}
