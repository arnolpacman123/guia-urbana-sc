import { Component } from '@angular/core';
import { MapComponent } from "./map/map.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MatDrawer, MatDrawerContainer } from "@angular/material/sidenav";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapComponent,
    HeaderComponent,
    SidebarComponent,
    MatDrawerContainer,
    MatDrawer,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
