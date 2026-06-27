import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * ProductListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Displays the list of available Cakes and Bouquets with filters.
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <div>
          <h1 class="fw-bold font-outfit text-main mb-1">Our Cakes & Bouquets</h1>
          <p class="text-muted-custom mb-0">Browse through our fresh, premium-quality selections.</p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary rounded-pill active">All</button>
          <button class="btn btn-outline-secondary rounded-pill">Cakes</button>
          <button class="btn btn-outline-secondary rounded-pill">Bouquets</button>
        </div>
      </div>
      
      <div class="row g-4">
        @for (prod of products(); track prod.id) {
          <div class="col-md-4 col-sm-6">
            <div class="card card-theme hover-scale border-0 shadow-sm overflow-hidden h-100">
              <div class="d-flex align-items-center justify-content-center text-white bg-secondary bg-opacity-25" style="height: 220px;">
                <span class="material-icons display-1 opacity-50">{{ prod.category === 'CAKE' ? 'cake' : 'local_florist' }}</span>
              </div>
              <div class="card-body p-4 d-flex flex-column">
                <span class="badge bg-light text-dark align-self-start mb-2 px-3 py-2 text-uppercase fw-semibold">{{ prod.category }}</span>
                <h3 class="h5 card-title fw-bold mb-2">{{ prod.name }}</h3>
                <p class="text-muted-custom small mb-3">{{ prod.description }}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                  <span class="fs-4 fw-bold text-primary-color">₹{{ prod.price | number:'1.2-2' }}</span>
                  <a [routerLink]="['/products', prod.id]" class="btn custom-btn btn-sm">Details</a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProductListComponent {
  products = signal([
    { id: 1, name: 'Chocolate Truffle Cake', category: 'CAKE', price: 499.00, description: 'Classic dark chocolate cake layered with rich truffle ganache.' },
    { id: 2, name: 'Elegance Red Roses Bouquet', category: 'BOUQUET', price: 699.00, description: 'A gorgeous assembly of 12 fresh red roses.' },
    { id: 3, name: 'Pineapple Delight Cake', category: 'CAKE', price: 420.00, description: 'Light whipped cream cake with juicy pineapple bits.' },
    { id: 4, name: 'White Lilies Splendor', category: 'BOUQUET', price: 850.00, description: 'Exquisite arrangement of fresh white lilies and greens.' }
  ]);
}
