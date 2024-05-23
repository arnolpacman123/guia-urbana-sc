import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from "@angular/material/sidenav";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatDrawer
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer() {
    this.drawer.toggle();
  }
}
