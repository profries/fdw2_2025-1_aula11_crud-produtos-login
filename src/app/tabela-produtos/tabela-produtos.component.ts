import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoApiService } from '../produto-api.service';

@Component({
  selector: 'app-tabela-produtos',
  standalone: false,
  templateUrl: './tabela-produtos.component.html',
  styleUrl: './tabela-produtos.component.css'
})
export class TabelaProdutosComponent {
  nomePesquisa?: string;
  lista: Produto[] = [];

  constructor(private produtoApiService: ProdutoApiService){
    this.listar();
  }
  
  listar() {
    this.produtoApiService.listar().subscribe(
      (produtos) => {
        this.lista = produtos
      }
    );
  }

  deletar(id?: number) {
    this.produtoApiService.deletar(id).subscribe(
      (produto) => {
        alert(`Produto com id ${produto.id} removido com sucesso!`);
        this.listar();
      }
    );
  }

}
