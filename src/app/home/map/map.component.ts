import { Component, inject, OnDestroy } from '@angular/core';
import { LeafletControlLayersConfig, LeafletModule } from "@asymmetrik/ngx-leaflet";
import { Control, latLng, MapOptions, tileLayer, Map, LatLng, LeafletEvent, LocationEvent } from "leaflet";
import { Subscription } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { NgxLeafletLocateModule } from "@runette/ngx-leaflet-locate";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule,
    NgxLeafletLocateModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnDestroy {
  options: MapOptions = {
    layers: [
      tileLayer('https://google.com/maps/vt?x={x}&y={y}&z={z}', {
        attribution: 'Google Maps'
      }),
    ],
    zoom: 13,
    center: latLng(-17.779223, -63.181640),
    attributionControl: false
  };

  layersControl: LeafletControlLayersConfig = {
    baseLayers: {
      'Google Maps': tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: [ 'mt0', 'mt1', 'mt2', 'mt3' ],
      }),
      'Google Satellite': tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: [ 'mt0', 'mt1', 'mt2', 'mt3' ],
      }),
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
      }),
    },
    overlays: {},
  };
  myLocation?: LatLng;
  map!: Map;

  constructor() {
    this.subscription = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  isSmallScreen = false;
  private subscription!: Subscription;
  breakpointObserver = inject(BreakpointObserver);
  locateOptions: Control.LocateOptions = {
    position: 'bottomright',
    strings: {
      title: 'Mostrar mi ubicación actual',
    },
    locateOptions: {
      enableHighAccuracy: true,
      watch: true,
    },
    keepCurrentZoomLevel: true,
    flyTo: true,
    cacheLocation: true,
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('locatedeactivate', this._onLocateDeactivate.bind(this));
  }

  _onLocateDeactivate(_: LeafletEvent) {
    this.myLocation = undefined!;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  styleMap(): string {
    if (this.isSmallScreen) {
      return "height: calc(100% - 145.43px); width: 100%";
    } else {
      return 'height: calc(100% - 139.58px); width: 100%;';
    }
  }

  _onNewLocation(event: LocationEvent) {
    this.myLocation = event.latlng;
  }
}
