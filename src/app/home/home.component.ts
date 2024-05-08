import { Component } from '@angular/core';
import { MapComponent } from "./map/map.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
