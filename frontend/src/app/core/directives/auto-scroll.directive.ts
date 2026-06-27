import { Directive, ElementRef, inject, AfterViewChecked } from '@angular/core';

/**
 * AutoScrollDirective (Utility Behavior Directive)
 * ----------------------------------------------------
 * Why this file exists:
 * Automatically scrolls containers (like console logs or chat views) to the bottom
 * when new elements append.
 */
@Directive({
  selector: '[appAutoScroll]',
  standalone: true
})
export class AutoScrollDirective implements AfterViewChecked {
  private el = inject(ElementRef);

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const native = this.el.nativeElement;
      native.scrollTop = native.scrollHeight;
    } catch (err) {
      // Fail silently if DOM is not ready
    }
  }
}
