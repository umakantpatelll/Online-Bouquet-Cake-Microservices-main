import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../core/models/product.model';
import { PriceDiscountPipe } from '../pipes/price-discount.pipe';
import { StockStatusPipe } from '../pipes/stock-status.pipe';
import { CategoryColorPipe } from '../pipes/category-color.pipe';
import { HighlightDirective } from '../directives/highlight.directive';
import { HoverCardDirective } from '../directives/hover-card.directive';
import { LazyImageDirective } from '../directives/lazy-image.directive';

/**
 * ProductCardComponent
 * ----------------------------------------------------
 * Why this file exists:
 * A presentation card representing a single cake or bouquet item in catalog lists.
 * 
 * Performance Optimization:
 * ChangeDetectionStrategy.OnPush: This informs Angular to skip checking this component 
 * unless its input parameters (`product` or `searchKeyword`) change their references.
 * Reduces digest cycle workloads.
 * 
 * Integrated Features:
 * - Directives: Highlights matched queries, injects hover animations, supports lazy images.
 * - Pipes: Formats currency, applies discounts, renders stock strings.
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PriceDiscountPipe,
    StockStatusPipe,
    CategoryColorPipe,
    HighlightDirective,
    HoverCardDirective,
    LazyImageDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() searchKeyword: string = '';
}
