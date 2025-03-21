/// <reference types="@types/google.maps" />

import { Component, computed, inject, viewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import MarkerClusterer from '@googlemaps/markerclustererplus';

import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  CardImgDirective,
  PlaceholderAnimationDirective,
  PlaceholderDirective
} from '@coreui/angular-pro';

import { DocsLinkComponent } from '@docs-components/docs-link/docs-link.component';
import { GoogleMapsLoaderService } from './google-maps-loader.service';
import { ScriptInjectorService } from './script-injector.service';
import { CustomMarker, GoogleMapsDataService } from './google-maps-data.service';
import { GoogleMapsResizeObserverService } from './google-maps-resize-observer.service';

@Component({
  selector: 'app-google-maps-integration',
  templateUrl: 'google-maps.component.html',
  styleUrls: ['google-maps.component.scss'],
  providers: [GoogleMapsLoaderService, GoogleMapsDataService, GoogleMapsResizeObserverService],
  standalone: true,
  imports: [DocsLinkComponent, CardComponent, CardHeaderComponent, CardBodyComponent, GoogleMapsModule, PlaceholderDirective, PlaceholderAnimationDirective, CardImgDirective]
})
export class GoogleMapsComponent {

  title: string = '';

  readonly markerClustererScriptSrc = 'https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js';
  readonly markerClustererImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  readonly #document = inject(DOCUMENT);
  readonly googleMapsLoaderService = inject(GoogleMapsLoaderService);
  readonly scriptInjectorService = inject(ScriptInjectorService);
  readonly googleMapsResizeObserverService = inject(GoogleMapsResizeObserverService);
  readonly googleMapsDataService = inject(GoogleMapsDataService);

  readonly markers = this.googleMapsDataService.markers;
  readonly options = this.googleMapsDataService.options;
  readonly circleCenter = this.googleMapsDataService.circleCenter;
  readonly vertices = this.googleMapsDataService.vertices;

  get markerOptions() {
    return this.googleMapsDataService.markerOptions;
  }

  constructor() {
    this.scriptInjectorService.loadScript(this.markerClustererScriptSrc);
    this.googleMapsResizeObserverService.target.set(this.#document.body);
  }

  readonly scriptLoaded = computed(() => {
    return this.scriptInjectorService.loaded();
  });

  readonly mapHeight = computed(() => {
    return this.googleMapsResizeObserverService.mapHeight();
  });

  readonly googleMap = viewChild(GoogleMap);
  readonly markerClusterer = computed(() => {
    const map = this.googleMap()?.googleMap as google.maps.Map;
    return map ? new MarkerClusterer(map, [], {}) : undefined;
  });

  readonly infoWindow = viewChild(MapInfoWindow);

  activeInfoWindow!: CustomMarker;

  get infoWindowContent() {
    return this.activeInfoWindow;
  }

  set infoWindowContent(marker) {
    this.title = marker.title;
    this.activeInfoWindow = marker;
    const infoWindow = this.infoWindow();
    if (infoWindow) {
      infoWindow.position = marker.position;
      infoWindow.open();
    }
  }

  openInfoWindow(marker: MapMarker, item: CustomMarker) {
    this.infoWindowContent = item;
    this.infoWindow()?.open(marker);
  }

  showPolygonInfoWindow($event: google.maps.PolyMouseEvent) {
    const marker: CustomMarker = {
      position: {
        lat: $event?.latLng?.lat() ?? 0,
        lng: $event?.latLng?.lng() ?? 0
      },
      label: 'SF',
      title: 'San Francisco',
      www: 'https://en.wikipedia.org/wiki/San_Francisco'
    };
    this.infoWindowContent = marker;
  }

  showCircleInfoWindow($event: google.maps.MapMouseEvent) {
    const marker: CustomMarker = {
      position: {
        lat: $event?.latLng?.lat() ?? 0,
        lng: $event?.latLng?.lng() ?? 0
      },
      label: 'NW',
      title: 'Newark',
      www: 'https://en.wikipedia.org/wiki/Newark,_California'
    };
    this.infoWindowContent = marker;
  }
}
