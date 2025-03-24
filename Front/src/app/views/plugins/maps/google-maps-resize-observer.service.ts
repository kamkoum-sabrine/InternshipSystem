import { effect, Injectable, OnDestroy, signal } from '@angular/core';

@Injectable()
export class GoogleMapsResizeObserverService implements OnDestroy {

  readonly mapHeight = signal<string>('65vh');
  readonly target = signal<Element | undefined>(undefined);

  #resizeObserver: ResizeObserver = new ResizeObserver(entries => {
    const height = entries[0].contentRect.height;
    if (height < 530) {
      return;
    }
    const heightString = `${height - 300}px`;
    this.mapHeight.set(heightString);
  });

  targetEffect = effect(() => {
    const target = this.target();
    if (target) {
      this.#resizeObserver.observe(target);
    }
  });

  ngOnDestroy(): void {
    const target = this.target();
    if (target) {
      this.#resizeObserver.unobserve(target);
    }
  }
}
