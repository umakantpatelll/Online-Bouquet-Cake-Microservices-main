import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../../core/models/cart-item.model';

/**
 * CartItemComponent (Presentational Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Manages rendering the quantity adjuster and remove control buttons for a single item.
 * 
 * Performance:
 * OnPush ensures changes inside this specific card row do not trigger checks 
 * across the rest of the application layout.
 */
@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;

  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}
