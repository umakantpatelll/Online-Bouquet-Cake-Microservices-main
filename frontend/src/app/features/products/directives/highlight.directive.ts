import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * HighlightDirective (Attribute Directive)
 * ----------------------------------------------------
 * Why this file exists:
 * Dynamically highlights substrings matching the current search keyword inside parent DOM text.
 * 
 * Angular Features Used:
 * 1. Host Element Reference (ElementRef): Accesses the host DOM element directly.
 * 2. OnChanges: Lifecycle hook fired when input values change (re-evaluating text markers on query adjustments).
 * 
 * Interview Tip:
 * Directives modify the appearance, structure, or behavior of DOM elements. 
 * Attribute directives (like this one) change appearance/behavior of an existing element. 
 * Structural directives (prefixed with asterisk like *ngIf, *ngFor) modify the DOM layout structure.
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') text: string = '';
  @Input() searchKeyword: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.text) {
      this.el.nativeElement.innerHTML = '';
      return;
    }

    if (!this.searchKeyword || !this.searchKeyword.trim()) {
      this.el.nativeElement.textContent = this.text;
      return;
    }

    this.highlightText();
  }

  private highlightText(): void {
    const escapedKeyword = this.searchKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');
    
    // Wrap matches in standard mark tags
    const highlighted = this.text.replace(regex, '<mark class="bg-warning text-dark p-0">$1</mark>');
    this.el.nativeElement.innerHTML = highlighted;
  }
}
