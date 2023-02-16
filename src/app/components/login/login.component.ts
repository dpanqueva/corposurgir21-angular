import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLoginData: Login = new Login();
  errors: string[]=[];

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    if(this.loginService.isAuthenticated()){
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Hola '.concat(this.loginService.user.nombre).concat(", bienvenido de nuevo, ya estás autenticado"),
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/modulo-administracion']);
    }else{
      this.router.navigate(['/login']);
    }
  }
  
  public loginAccess():void{
    this.loginService.accessLogin(this.formLoginData).subscribe(
     {
        next: (e)=>{ 
          this.loginService.saveToken(e);
          this.loginService.saveUser(e);
          this.router.navigate(['/modulo-administracion']).then(()=>{window.location.reload()});
          this.messageService.successFullMessage('Bienvenido '.concat( e.nombre).concat(" ").concat(e.apellido));
        },
        error: (e)=>{
          this.errors[0] = e.error.error.clave as string;
          this.errors[1] = e.error.error.correo as string;
        }
    });

  }

}
