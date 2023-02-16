import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/core/models/menu';
import { LoginService } from 'src/app/core/services/login.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus: Menu[];
  isAuthenticated: boolean = false;
  nombre: string;

  constructor(private menuClient: MenuService, private authService: LoginService
    ,private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.nombre= this.authService.user.nombre;
  }

  logout():void{
    this.authService.logout().subscribe();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
    this.messageService.successFullMessage('Finalizaste sesión, vuelve pronto!');
  }
}


