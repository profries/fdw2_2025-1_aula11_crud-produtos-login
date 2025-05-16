import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  erro = false;
  usuario = "";
  senha = "";
  
  constructor( 
    private authService: AuthService,
    private router: Router
  ){ }

  realizarLogin() {
    this.authService.login(this.usuario, this.senha).subscribe(
      logado => {
        if(logado) {
          this.router.navigate(['/tabela']);
        }
        else {
          this.erro = true;
        }
      }
    )
  }
}
