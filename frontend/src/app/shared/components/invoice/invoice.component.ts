import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import { OrderResponse } from '../../../core/models/checkout.model';
import { NotificationService } from '../../../core/services/notification.service';

/**
 * InvoiceComponent (Shared Presentational Button Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Standalone button that generates and triggers client-side invoice PDF downloads using jsPDF.
 */
@Component({
  selector: 'app-invoice-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="generateInvoice()" class="btn btn-outline-primary btn-sm rounded-pill px-3 font-outfit d-flex align-items-center gap-1 shadow-sm">
      <span class="material-icons text-sm" style="font-size: 1.1rem;">download</span> Download Invoice
    </button>
  `,
  styles: [`
    .font-outfit {
      font-family: 'Outfit', sans-serif;
    }
  `]
})
export class InvoiceComponent {
  @Input({ required: true }) order!: OrderResponse;
  private notificationService = inject(NotificationService);

  generateInvoice(): void {
    try {
      const doc = new jsPDF();
      
      // Brand Header
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('ONLINE BOUQUET & CAKE', 14, 20);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Premium Bakery & Floral Delivery Services', 14, 25);
      doc.text('GSTIN: 27AAAAA0000A1Z', 14, 30);
      
      // Document Summary Details
      doc.setFont('Helvetica', 'bold');
      doc.text('INVOICE RECAP', 140, 20);
      doc.setFont('Helvetica', 'normal');
      doc.text(`Invoice No: #INV-${this.order.id}`, 140, 25);
      doc.text(`Date: ${new Date(this.order.createdAt).toLocaleDateString()}`, 140, 30);
      doc.text(`Status: ${this.order.status}`, 140, 35);
      
      // Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(14, 42, 196, 42);
      
      // Customer Details
      doc.setFont('Helvetica', 'bold');
      doc.text('DELIVERED TO:', 14, 50);
      doc.setFont('Helvetica', 'normal');
      doc.text(`Customer ID: #${this.order.customerId}`, 14, 55);
      doc.text(`Contact: ${this.order.contactNumber || 'N/A'}`, 14, 60);
      doc.text(`Shipping Address: ${this.order.deliveryAddress || 'N/A'}`, 14, 65, { maxWidth: 120 });
      
      // Table Header columns
      let y = 80;
      doc.setFillColor(240, 240, 240);
      doc.rect(14, y, 182, 8, 'F');
      doc.setFont('Helvetica', 'bold');
      doc.text('Product Name', 16, y + 6);
      doc.text('Qty', 110, y + 6);
      doc.text('Price', 135, y + 6);
      doc.text('Subtotal', 165, y + 6);
      
      // Table Item Rows
      doc.setFont('Helvetica', 'normal');
      y += 8;
      this.order.items.forEach(item => {
        y += 8;
        doc.text(item.productName || `Product #${item.productId}`, 16, y);
        doc.text(String(item.quantity), 110, y);
        doc.text(`INR ${item.price.toFixed(2)}`, 135, y);
        doc.text(`INR ${(item.price * item.quantity).toFixed(2)}`, 165, y);
      });
      
      // Table Footer Divider line
      y += 6;
      doc.line(14, y, 196, y);
      
      // Total summarySpent
      y += 8;
      doc.setFont('Helvetica', 'bold');
      doc.text('Total Amount Spent (GST Included):', 110, y);
      doc.text(`INR ${this.order.totalPrice.toFixed(2)}`, 165, y);
      
      // Legal terms disclaimer
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(8);
      doc.text('Thank you for shopping with us! This is a computer generated invoice copy.', 14, 270);
      
      // Trigger download
      doc.save(`Invoice-${this.order.id}.pdf`);
      this.notificationService.showSuccess('Invoice downloaded successfully', 'PDF Generated');
    } catch (e) {
      console.error(e);
      this.notificationService.showError('Failed to generate invoice PDF', 'Print Error');
    }
  }
}
