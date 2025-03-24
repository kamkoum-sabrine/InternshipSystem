import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptInjectorService {
  readonly #document: Document = inject(DOCUMENT);
  readonly #rendererFactory: RendererFactory2 = inject(RendererFactory2);
  readonly #renderer: Renderer2 = this.#rendererFactory.createRenderer(null, null);

  readonly loaded = signal(false);

  #appendScript(src: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = this.#renderer.createElement('script');
      this.#renderer.setAttribute(scriptElement, 'type', 'text/javascript');
      this.#renderer.setAttribute(scriptElement, 'src', src);
      this.#renderer.setProperty(scriptElement, 'loading', 'async');
      scriptElement.onload = () => {
        resolve({ loaded: true });
      };
      scriptElement.onerror = (error: any) => reject({ loaded: false, error });
      this.#renderer.appendChild(this.#document.head, scriptElement);
    });
  }

  loadScript(src: string) {
    this.#appendScript(src)
      .catch((rejected) => {
        console.log('rejected:', rejected);
      })
      .then((resolved) => {
        console.log('resolved:', resolved);
        this.loaded.set(true);
      });
  }

}
