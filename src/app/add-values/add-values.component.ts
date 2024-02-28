import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-values',
  templateUrl: './add-values.component.html',
  styleUrl: './add-values.component.scss'
})
export class AddValuesComponent {

  novoItem: any = { description: '', value: '', type: '' };

  constructor(private dataService: DataService) { }

  adicionarItem(): void {
    if(this.novoItem.description === '' || this.novoItem.value === '' || this.novoItem.type === '') {
      alert('Preencha todos os campos');
      return;
    }
    this.dataService.adicionarItem(this.novoItem).subscribe(
      (response) => {
        console.log('Item adicionado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao adicionar item:', error);
      }
    );
  }

}
