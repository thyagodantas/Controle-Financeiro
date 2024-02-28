// list-values.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons'
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-list-values',
  templateUrl: './list-values.component.html',
  styleUrls: ['./list-values.component.scss']
})
export class ListValuesComponent implements OnInit {
  lista: any[] = [];
  iconCircleUp = faArrowAltCircleUp;
  iconCircleDown = faArrowAltCircleDown;
  iconTrash = faTrash

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Inicializa a lista no carregamento do componente
    this.dataService.getLista().subscribe(
      (lista) => {
        this.lista = lista;
      },
      (error) => {
        console.error('Erro ao recuperar a lista:', error);
      }
    );

    // Atualiza a lista em tempo real quando houver alterações
    this.dataService.listaObservable.subscribe(
      (listaAtualizada) => {
        this.lista = listaAtualizada;
      }
    );
  }

  deletarItem(itemId: number): void {
    this.dataService.deletarItem(itemId).subscribe(
      () => {
        this.dataService.listaObservable.subscribe(
          (listaAtualizada) => {
            this.lista = listaAtualizada;
          }
        );
      },
      (error) => {
        console.error('Erro ao deletar item:', error);
      }
    );
  }
}
