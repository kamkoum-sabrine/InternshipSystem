import { Injectable, OnDestroy, signal } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable()
export class GoogleMapsLoaderService implements OnDestroy {

  // To use the Google Maps JavaScript API, you must register your app project on the Google API Console
  // and get a Google API key which you can add to your app
  // see: https://developers.google.com/maps/gmp-get-started
  readonly #apiKey: string = 'AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA'; // CoreUI demo Google API key, to replace

  readonly apiLoaded = signal(false);

  loader = new Loader({
    apiKey: this.#apiKey,
    id: '_coreui-google-maps',
    version: 'weekly',
    libraries: ['maps', 'marker']
  });

  constructor() {
    this.loader.importLibrary('maps').then(async (lib) => {
      this.apiLoaded.set(true);
    }).catch(reason => {
      this.apiLoaded.set(false);
      console.log('"@googlemaps/js-api-loader" importLibrary() rejected:', reason);
    });

  }

  ngOnDestroy(): void {
    this.loader.deleteScript();
  }
}
