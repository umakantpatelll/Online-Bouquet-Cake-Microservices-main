import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

/**
 * ProductDetailComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Shows detailed description, rating, stock, and add-to-cart controls for a single product.
 */
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/" class="text-decoration-none text-muted-custom">Home</a></li>
          <li class="breadcrumb-item"><a routerLink="/products" class="text-decoration-none text-muted-custom">Products</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ product().name }}</li>
        </ol>
      </nav>

      <div class="row g-5">
        <div class="col-md-6">
          <div class="d-flex align-items-center justify-content-center text-white bg-secondary bg-opacity-25 rounded" style="height: 400px;">
            <span class="material-icons display-1 opacity-50" style="font-size: 8rem;">
              {{ product().category === 'CAKE' ? 'cake' : 'local_florist' }}
            </span>
          </div>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <span class="badge bg-light text-dark align-self-start mb-2 px-3 py-2 text-uppercase fw-semibold">{{ product().category }}</span>
          <h1 class="fw-bold font-outfit text-main mb-3">{{ product().name }}</h1>
          <h2 class="fs-2 fw-bold text-primary-color mb-4">₹{{ product().price | number:'1.2-2' }}</h2>
          <p class="text-muted-custom mb-4">{{ product().description }}</p>
          
          <div class="mb-4 d-flex align-items-center gap-3">
            <span class="fw-semibold">Stock Status:</span>
            <span class="badge bg-success-subtle text-success px-3 py-2">In Stock ({{ product().stock }} available)</span>
          </div>

          <div class="d-flex gap-3">
            <button class="btn custom-btn px-4 py-3"><i class="bi bi-cart-plus-fill me-2"></i> Add to Cart</button>
            <a routerLink="/products" class="btn custom-btn-outline px-4 py-3">Back to Catalog</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailComponent {
  product = signal({
    id: 1,
    name: 'Chocolate Truffle Cake',
    category: 'CAKE',
    price: 499.00,
    description: 'Our signature chocolate truffle cake features moist chocolate sponge cake layered with rich dark chocolate ganache, decorated with chocolate shards.',
    stock: 12
  });

  constructor(private route: ActivatedRoute) {}
}
