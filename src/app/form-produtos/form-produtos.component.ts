import { Component, EventEmitter, Output } from '@angular/core';
import { Produto } from '../produto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoApiService } from '../produto-api.service';

@Component({
  selector: 'app-form-produtos',
  standalone: false,
  templateUrl: './form-produtos.component.html',
  styleUrl: './form-produtos.component.css'
})
export class FormProdutosComponent {
  produto = new Produto();
  id?:number;
  botaoAcao = "Cadastrar";

  constructor(private produtoApiService: ProdutoApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.params['id'];
    if(this.id) {
      this.botaoAcao = "Editar";
      this.produtoApiService.buscarPorId(this.id).subscribe(
        (prod) => this.produto = prod
      );
    }
  }

  salvar(){ 
    if(this.id) { //Editar
      this.produtoApiService.editar(this.id, this.produto).subscribe(
        (produto) => {
          alert("Produto  editado com sucesso!");
        }
      );
      
    }
    else { //Cadastrar
      this.produtoApiService.inserir(this.produto).subscribe(
        (prod) => {
          alert("Produto cadastrado com sucesso!")
          this.produto = new Produto();    
        }
      );
    }
  }

  voltar() {
    this.router.navigate(['/tabela']);
  }
}
