import { Injectable } from '@angular/core';

// Marker interface for type safety
export interface CustomMarker {
  position: google.maps.LatLngLiteral;
  label?: string;
  title: string;
  www: string;
  content?: google.maps.marker.PinElement;
}

@Injectable()
export class GoogleMapsDataService {

  markers: CustomMarker[] = [
    {
      position: {
        lat: 37.431489,
        lng: -122.163719
      },
      label: 'S',
      title: 'Stanford',
      www: 'https://www.stanford.edu/'
    },
    {
      position: {
        lat: 37.394694,
        lng: -122.150333
      },
      label: 'T',
      title: 'Tesla',
      www: 'https://www.tesla.com/'
    },
    {
      position: {
        lat: 37.331681,
        lng: -122.0301
      },
      label: 'A',
      title: 'Apple',
      www: 'https://www.apple.com/'
    },
    {
      position: {
        lat: 37.484722,
        lng: -122.148333
      },
      label: 'F',
      title: 'Facebook',
      www: 'https://www.facebook.com/'
    }
  ];

  options: google.maps.MapOptions = {
    center: {
      lat: 37.42000,
      lng: -122.103719
    },
    zoom: 10,
    mapId: 'DEMO_MAP_ID'
  };

  vertices: google.maps.LatLngLiteral[] = [
    { lat: 37.7, lng: -122.5 },
    { lat: 37.708, lng: -122.37 },
    { lat: 37.80, lng: -122.40 },
    { lat: 37.78, lng: -122.51 }
  ];

  circleCenter: google.maps.LatLngLiteral = { lat: 37.523, lng: -122.036 };

  // Let's cache for markerOptions to avoid multiple creation of markerOptions config objects.
  // Creates the markerOptions object at first time the getter is called, then cached.
  // Subsequent accesses return the cached value without recreating it.
  markerOptionsCache!: google.maps.marker.AdvancedMarkerElement;

  // markerOptions getter defines a property, but does not calculate the property's value until it is accessed.
  // and it will be accessed from ng-template only when apiLoaded === true
  get markerOptions(): google.maps.marker.AdvancedMarkerElement {
    if (!this.markerOptionsCache) {
      this.markerOptionsCache = <google.maps.marker.AdvancedMarkerElement><unknown>{
        draggable: false,
        // icon: {
          // url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // size: new google.maps.Size(40, 82),
          // origin: new google.maps.Point(0, 0),
          // labelOrigin: new google.maps.Point(10, -10),
          // // The anchor for this image is the base of the flagpole at (0, 32).
          // anchor: new google.maps.Point(0, 32)
        // }
      };
    }
    return this.markerOptionsCache;
  }
}
