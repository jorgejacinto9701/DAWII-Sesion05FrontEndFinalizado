import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';

const baseUrl = 'http://localhost:8090/rest/docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http:HttpClient) { }

  registrar(data:Docente): Observable<any>{
    return this.http.post(baseUrl, data);
  }
}
