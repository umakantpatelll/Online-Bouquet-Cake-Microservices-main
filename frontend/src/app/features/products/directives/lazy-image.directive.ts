import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

/**
 * LazyImageDirective (Attribute Directive)
 * ----------------------------------------------------
 * Why this file exists:
 * Dynamically injects lazy loading configurations into `<img>` tags, 
 * optimizing bandwidth by fetching images only as they approach the viewport.
 */
@Directive({
  selector: 'img[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Set standard native lazy load attribute on img elements
    this.renderer.setAttribute(this.el.nativeElement, 'loading', 'lazy');
  }
}
