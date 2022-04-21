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

  //Variables globales para los combobox
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  //Variables seleccionadas
  docente: Docente = {
      ubigeo:{
        idUbigeo:-1,
        departamento:"-1",
        provincia:"-1",
        distrito:"",
      }
  }

  constructor(private ubigeoService:UbigeoService, private docenteService:DocenteService) { 
         this.ubigeoService.listaDepartamento().subscribe(
               (x) => this.departamentos = x
         );
  }

  cargaProvincia(){
    console.log(">>> Carga Provincia >> ");
    console.log(">>> Departamento >> " + this.docente.ubigeo?.departamento);
    
    this.ubigeoService.listaProvincia(this.docente.ubigeo?.departamento).subscribe(
            (x) => this.provincias = x
    );

    this.docente.ubigeo!.provincia = "-1";
    this.distritos = [];
    this.docente.ubigeo!.idUbigeo = -1;

  }

  cargaDistrito(){
    console.log(">>> Carga Distrito >> ");
    console.log(">>> Departamento >> " + this.docente.ubigeo?.departamento);
    console.log(">>> Provincia >> " + this.docente.ubigeo?.provincia);

    this.ubigeoService.listaDistrito(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
            (x) => this.distritos = x
      );

    this.docente.ubigeo!.idUbigeo = -1;
  }


  insertado(){
        this.docenteService.registraDocente(this.docente).subscribe(
          (x) => alert(x.mensaje)
        );
  }

  ngOnInit(): void {
  }


}
