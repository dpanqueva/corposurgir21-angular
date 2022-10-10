import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/models/menu';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus: Menu[];

  constructor(private menuClient: MenuService) { }

  ngOnInit(): void {
   /* this.menuClient.getMenus().subscribe(
      menus =>{
        this.menus = menus;
      }
    );*/
  }
}


