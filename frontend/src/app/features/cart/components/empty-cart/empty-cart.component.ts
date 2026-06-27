import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * EmptyCartComponent (Presentational Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Displays a descriptive, styled card with links to the products catalog when the cart is empty.
 */
@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card card-theme p-5 text-center shadow-sm border-0 d-flex flex-column align-items-center">
      <span class="material-icons display-1 text-muted opacity-50 mb-3" style="font-size: 7rem;">remove_shopping_cart</span>
      <h2 class="fw-bold mb-2 font-outfit">Your Cart is Empty</h2>
      <p class="text-muted-custom mb-4" style="max-width: 350px;">You haven't added any fresh bouquets or delicious cakes to your cart yet.</p>
      <a routerLink="/products" class="btn custom-btn px-4 py-2">Start Shopping</a>
    </div>
  `
})
export class EmptyCartComponent {}
