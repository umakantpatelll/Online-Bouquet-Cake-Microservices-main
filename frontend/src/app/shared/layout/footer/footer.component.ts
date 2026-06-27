import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * FooterComponent
 * ----------------------------------------------------
 * Why this file exists:
 * The site footer with copyright info, address links, and navigation blocks.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer-theme border-top border-light-subtle mt-auto py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="material-icons text-primary-color" style="font-size: 2rem;">cake</span>
              <span class="font-outfit fw-bold fs-5">Bouquet & Cake Ordering</span>
            </div>
            <p class="text-muted-custom mb-3">Delivering handcrafted premium cakes and fresh floral arrangements directly to your doorstep. Make every celebration sweet and memorable.</p>
            <div class="d-flex gap-2">
              <a href="#" class="btn btn-outline-secondary btn-sm rounded-circle"><i class="bi bi-facebook"></i></a>
              <a href="#" class="btn btn-outline-secondary btn-sm rounded-circle"><i class="bi bi-instagram"></i></a>
              <a href="#" class="btn btn-outline-secondary btn-sm rounded-circle"><i class="bi bi-twitter"></i></a>
            </div>
          </div>
          
          <div class="col-lg-2 col-md-6 col-6 ms-auto">
            <h4 class="fw-bold mb-3 font-outfit text-sm text-uppercase text-muted-custom">Quick Links</h4>
            <ul class="list-unstyled d-flex flex-column gap-2">
              <li><a routerLink="/" class="footer-link text-decoration-none">Home</a></li>
              <li><a routerLink="/products" class="footer-link text-decoration-none">Our Products</a></li>
              <li><a routerLink="/cart" class="footer-link text-decoration-none">Shopping Cart</a></li>
              <li><a routerLink="/orders" class="footer-link text-decoration-none">My Orders</a></li>
            </ul>
          </div>
          
          <div class="col-lg-2 col-md-6 col-6">
            <h4 class="fw-bold mb-3 font-outfit text-sm text-uppercase text-muted-custom">Support</h4>
            <ul class="list-unstyled d-flex flex-column gap-2">
              <li><a href="#" class="footer-link text-decoration-none">Help Center</a></li>
              <li><a href="#" class="footer-link text-decoration-none">Contact Us</a></li>
              <li><a href="#" class="footer-link text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" class="footer-link text-decoration-none">Terms of Service</a></li>
            </ul>
          </div>
          
          <div class="col-lg-3 col-md-6">
            <h4 class="fw-bold mb-3 font-outfit text-sm text-uppercase text-muted-custom">Contact</h4>
            <ul class="list-unstyled d-flex flex-column gap-2 text-muted-custom">
              <li><i class="bi bi-geo-alt me-2 text-primary-color"></i> 123 Baker St, New York</li>
              <li><i class="bi bi-telephone me-2 text-primary-color"></i> +1 (555) 019-2834</li>
              <li><i class="bi bi-envelope me-2 text-primary-color"></i> support&#64;bouquetcake.com</li>
            </ul>
          </div>
        </div>
        
        <div class="border-top border-light-subtle pt-4 mt-4 text-center">
          <p class="text-muted-custom mb-0">&copy; 2026 Online Bouquet & Cake Ordering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-theme {
      background-color: var(--card-bg);
      color: var(--text-main);
      transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
    }
    .footer-link {
      color: var(--text-muted);
      transition: color var(--transition-speed) ease;
      &:hover {
        color: var(--primary-color);
      }
    }
    .text-primary-color {
      color: var(--primary-color);
    }
    .text-muted-custom {
      color: var(--text-muted);
    }
  `]
})
export class FooterComponent {}
