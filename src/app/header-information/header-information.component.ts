import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header-information',
  templateUrl: './header-information.component.html',
  styleUrls: ['./header-information.component.scss']
})
export class HeaderInformationComponent implements OnInit {

  lista: any[] = [];
  entradas: number = 0;
  saidas: number = 0;
  saldo: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.atualizarSaldo();

    this.dataService.getLista().subscribe(
      (lista) => {
        this.lista = lista;
        this.atualizarSaldo();
      },
      (error) => {
        console.error('Erro ao recuperar a lista:', error);
      }
    );

    this.dataService.listaObservable.subscribe(
      (listaAtualizada) => {
        this.lista = listaAtualizada;
        this.atualizarSaldo();
      }
    );
  }

  private atualizarSaldo(): void {
    this.entradas = 0;
    this.saidas = 0;

    this.lista.forEach((item) => {
      let valorNumerico = parseFloat(item.value);

      if (item.type == '1') {
        this.entradas += valorNumerico;
      } else {
        this.saidas += valorNumerico;
      }
    });

    this.entradas = parseFloat(this.entradas.toFixed(2));
    this.saidas = parseFloat(this.saidas.toFixed(2));
    this.saldo = parseFloat((this.entradas - this.saidas).toFixed(2));
  }
}
