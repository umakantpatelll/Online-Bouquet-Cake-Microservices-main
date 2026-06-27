import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription, take } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CustomValidators } from '../../../core/utilities/custom-validators';
import { CartItem } from '../../../core/models/cart-item.model';
import { OrderRequest, OrderRequestItem, ShippingAddress } from '../../../core/models/checkout.model';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { PaymentSelectionComponent } from './components/payment-selection/payment-selection.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';

/**
 * CheckoutComponent (Container Component)
 * ----------------------------------------------------
 * Why this file exists:
 * The primary checkout wizard combining Material Steppers with 
 * Address, Payment selection, and Final Order placement logic.
 */
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatStepperModule,
    MatButtonModule,
    NgxSpinnerModule,
    ShippingAddressComponent,
    PaymentSelectionComponent,
    OrderReviewComponent,
    CheckoutSummaryComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);

  shippingForm!: FormGroup;
  paymentForm!: FormGroup;
  
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  discount: number = 0;
  appliedCoupon: string | null = null;
  discountPercentage: number = 0;

  private subs = new Subscription();

  ngOnInit(): void {
    // 1. Initialise form controls
    this.shippingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), CustomValidators.noWhitespace]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email, CustomValidators.noWhitespace]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      specialInstructions: ['']
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['CREDIT_DEBIT_CARD', Validators.required]
    });

    // Prefill form values from authenticated user profile if logged in
    this.subs.add(
      this.authService.currentUser$.pipe(take(1)).subscribe(user => {
        if (user) {
          this.shippingForm.patchValue({
            name: user.name,
            email: user.email
          });
        }
      })
    );

    // 2. Bind to CartService streams
    this.subs.add(this.cartService.cartItems$.subscribe(items => this.cartItems = items));
    this.subs.add(this.cartService.cartSubtotal$.subscribe(sub => this.subtotal = sub));
    this.subs.add(this.cartService.discountAmount$.subscribe(amt => this.discount = amt));
    this.subs.add(this.cartService.appliedCoupon$.subscribe(cp => this.appliedCoupon = cp));
    this.subs.add(this.cartService.discountPercentage$.subscribe(pct => this.discountPercentage = pct));

    // Redirect to products if cart has zero items
    if (this.cartItems.length === 0) {
      this.notificationService.showWarning('Please add items to your cart before checking out.', 'Empty Cart');
      this.router.navigate(['/products']);
    }
  }

  get shippingAddress(): ShippingAddress {
    return this.shippingForm.value;
  }

  get paymentMethod(): string {
    return this.paymentForm.get('paymentMethod')?.value || '';
  }

  placeOrder(): void {
    if (this.shippingForm.invalid || this.paymentForm.invalid || this.cartItems.length === 0) {
      this.notificationService.showError('Please check your address validation fields before placing order.', 'Validation Error');
      return;
    }

    this.spinner.show();

    // Map cart items list to order items request DTO format
    const requestItems: OrderRequestItem[] = this.cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    // Retrieve active logged in customer ID, default to 1 for fallback validation
    let customerId = 1;
    const currentUser = this.authService.currentUserSignal();
    if (currentUser && currentUser.id) {
      customerId = currentUser.id;
    }

    const payload: OrderRequest = {
      userId: customerId,
      items: requestItems
    };

    this.orderService.placeOrder(payload).subscribe({
      next: (res) => {
        this.spinner.hide();
        if (res.success) {
          this.notificationService.showSuccess(res.message || 'Order created successfully', 'Checkout Success');
          this.cartService.clearCart(); // Clear local shopping selections
          this.router.navigate(['/orders']); // Forward customer to order status tracking list
        }
      },
      error: (err) => {
        this.spinner.hide();
        // Network errors or 401 logouts are caught dynamically inside global errorInterceptor
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
