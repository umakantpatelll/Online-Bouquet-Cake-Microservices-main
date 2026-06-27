import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PageHeaderComponent
 * ----------------------------------------------------
 * Why this file exists:
 * A reusable component to render page headers consistently across different modules.
 * 
 * Angular Features Used:
 * 1. Input Property decorator (@Input): Enables parent components to pass data (title, subtitle) down.
 * 2. Standalone Component: Completely self-contained.
 * 
 * Interview Tip:
 * Angular standalone components reduce module boilerplate. To receive input properties from a parent component, 
 * use the `@Input()` decorator. In Angular 16+, inputs can be made required using `{ required: true }`.
 */
@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header py-4 border-bottom border-light-subtle mb-4">
      <h1 class="fw-bold font-outfit text-main mb-1">{{ title }}</h1>
      <p *ngIf="subtitle" class="text-muted-custom mb-0">{{ subtitle }}</p>
    </div>
  `,
  styles: [`
    .page-header {
      background: transparent;
    }
  `]
})
export class PageHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
}
