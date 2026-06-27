import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * HomeComponent
 * ----------------------------------------------------
 * Why this file exists:
 * It serves as the primary landing page of the application, introducing users to categories and featured items.
 * 
 * Angular Features Used:
 * 1. Signals (signal): Used for modern state management of dummy featured products.
 * 2. Standalone Component: Declared with `standalone: true` and explicit imports, avoiding NgModules.
 * 
 * Interview Tip:
 * Angular Signals provide a reactive way to notify the framework of state changes. Unlike RxJS Observables, 
 * Signals are synchronous and do not require subscription cleanups, making them ideal for template-bound UI state.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  // Categorization tokens for Cake & Bouquet platform
  categories = signal([
    { id: 1, name: 'Premium Cakes', icon: 'cake', description: 'Freshly baked artisanal cakes for every celebration.', route: '/products', query: 'CAKE' },
    { id: 2, name: 'Fresh Bouquets', icon: 'local_florist', description: 'Handpicked floral arrangements to express emotions.', route: '/products', query: 'BOUQUET' },
    { id: 3, name: 'Combos & Gifts', icon: 'card_giftcard', description: 'Special cake and flower pairings for extra warmth.', route: '/products', query: 'COMBO' }
  ]);

  // Modern signals state containing initial dummy catalog items
  featuredProducts = signal([
    {
      id: 1,
      name: 'Chocolate Truffle Cake',
      category: 'CAKE',
      price: 499.00,
      imageUrl: 'assets/images/choco-truffle.jpg',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Elegance Red Roses Bouquet',
      category: 'BOUQUET',
      price: 699.00,
      imageUrl: 'assets/images/red-roses.jpg',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Velvet Vanilla Cake',
      category: 'CAKE',
      price: 450.00,
      imageUrl: 'assets/images/vanilla.jpg',
      rating: 4.7
    }
  ]);
}
