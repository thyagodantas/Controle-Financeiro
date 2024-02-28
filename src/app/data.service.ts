import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api';
  private listaSubject = new Subject<any[]>();

  listaObservable = this.listaSubject.asObservable();


  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  adicionarItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/adicionar`, item)
      .pipe(
        tap(() => this.atualizarLista())
      );
  }

  deletarItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletar/${itemId}`)
      .pipe(
        tap(() => this.atualizarLista())
      );
  }

  private atualizarLista(): void {
    this.getLista().subscribe(
      (lista) => {
        this.listaSubject.next(lista);
      },
      (error) => {
        console.error('Erro ao obter lista após atualização:', error);
      }
    );
  }
}