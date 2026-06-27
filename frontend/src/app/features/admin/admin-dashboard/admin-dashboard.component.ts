import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * AdminDashboardComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Admin portal boundary for viewing sales statistics and catalog inventory.
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <h1 class="fw-bold font-outfit text-main mb-4">Admin Dashboard</h1>
      
      <!-- Stats Row -->
      <div class="row g-4 mb-5">
        <div class="col-md-3 col-sm-6">
          <div class="card card-theme p-4 shadow-sm">
            <span class="text-muted-custom text-sm fw-semibold">Total Revenue</span>
            <h2 class="fw-bold text-primary-color mt-2">₹12,450</h2>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card card-theme p-4 shadow-sm">
            <span class="text-muted-custom text-sm fw-semibold">Active Orders</span>
            <h2 class="fw-bold text-main mt-2">5 Orders</h2>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card card-theme p-4 shadow-sm">
            <span class="text-muted-custom text-sm fw-semibold">Total Cakes</span>
            <h2 class="fw-bold text-main mt-2">18 Items</h2>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card card-theme p-4 shadow-sm">
            <span class="text-muted-custom text-sm fw-semibold">Total Bouquets</span>
            <h2 class="fw-bold text-main mt-2">12 Items</h2>
          </div>
        </div>
      </div>

      <div class="card card-theme shadow-sm p-4">
        <h2 class="h4 fw-bold mb-4 font-outfit">Catalog Inventory List (Mock)</h2>
        <div class="table-responsive">
          <table class="table text-main">
            <thead>
              <tr class="text-muted-custom">
                <th>Product ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              @for (prod of products(); track prod.id) {
                <tr>
                  <td>#{{ prod.id }}</td>
                  <td class="fw-semibold">{{ prod.name }}</td>
                  <td><span class="badge bg-light text-dark text-uppercase">{{ prod.category }}</span></td>
                  <td>₹{{ prod.price | number:'1.2-2' }}</td>
                  <td>{{ prod.stock }} units</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {
  products = signal([
    { id: 10, name: 'P8 Chocolate Cake', category: 'CAKE', price: 450.00, stock: 47 },
    { id: 11, name: 'Premium Red Roses Bouquet', category: 'BOUQUET', price: 699.00, stock: 25 },
    { id: 12, name: 'Velvet Dream Cupcake Combo', category: 'COMBO', price: 850.00, stock: 12 }
  ]);
}
