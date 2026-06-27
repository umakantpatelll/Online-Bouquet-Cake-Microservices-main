import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

/**
 * HoverCardDirective (Attribute Directive)
 * ----------------------------------------------------
 * Why this file exists:
 * Dynamically modifies CSS transitions and shadow properties of cards upon cursor entry.
 * 
 * Angular Features Used:
 * - Renderer2: Abstracted API to safely interact with DOM elements across various browser platforms.
 * - HostListener: Listens to events fired on the host element (`mouseenter`, `mouseleave`).
 */
@Directive({
  selector: '[appHoverCard]',
  standalone: true
})
export class HoverCardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Inject standard smooth transitions upon load
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-6px)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 12px 24px rgba(0, 0, 0, 0.12)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
  }
}
