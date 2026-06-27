import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * EmptyStateComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Reusable placeholder card shown when arrays (like orders, cart items, catalog) are empty.
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card card-theme p-5 text-center shadow-sm border-0 d-flex flex-column align-items-center">
      <span class="material-icons display-1 text-muted opacity-50 mb-3">{{ icon }}</span>
      <h3 class="fw-bold mb-2">{{ title }}</h3>
      <p class="text-muted-custom mb-4" style="max-width: 350px;">{{ description }}</p>
      <button *ngIf="actionText" (click)="onActionClick()" class="btn custom-btn px-4 py-2">
        {{ actionText }}
      </button>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() icon: string = 'info';
  @Input() title: string = 'No Items Found';
  @Input() description: string = 'There are no records to display at this time.';
  @Input() actionText?: string;

  @Output() action = new EventEmitter<void>();

  onActionClick() {
    this.action.emit();
  }
}
