import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {

  departamentos : string[] = [];
  provincias : string[] = [];
  distritos : Ubigeo[] = [];

  docente: Docente = { 
    ubigeo:{
      idUbigeo:-1,
      departamento:"-1",
      provincia:"-1",
      distrito:"",
    }
  };

  constructor(private ubigeoService:UbigeoService, 
              private docenteService:DocenteService) { 

         this.ubigeoService.listarDepartamento().subscribe(
               (departamentos) => this.departamentos = departamentos
         );

  }

  registraDocente(){
      console.log(this.docente);
      this.docenteService.registrar(this.docente).subscribe(
          response => {
              console.log(response.mensaje);
              alert(response.mensaje);
            },
            error => {
              console.log(error);
            },
      );
  }

  listaProvincia(){
      console.log("listaProvincia>>> " + this.docente.ubigeo?.departamento);
      this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
          (provincias) => this.provincias = provincias
      );
  }

  listaDistrito(){
    console.log("listaDistrito>>> " + this.docente.ubigeo?.departamento);
    console.log("listaDistrito>>> " + this.docente.ubigeo?.provincia);
    this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento,this.docente.ubigeo?.provincia).subscribe(
        (distritos) => this.distritos = distritos
    );
}

  ngOnInit(): void {
  }


}
