import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../../core/services/notification.service';

interface UserDetail {
  id: number;
  name: string;
  email: string;
  role: string;
  totalOrders: number;
  totalSpent: number;
  isActive: boolean;
  memberSince: string;
}

/**
 * UserListComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Manages customer directory details, total sales contributions, 
 * member profiles, and status activation overrides.
 */
@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'totalOrders', 'totalSpent', 'status', 'actions'];
  dataSource = new MatTableDataSource<UserDetail>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchText = '';
  selectedRole = 'ALL';

  // Mock initial directory values
  private mockUsers: UserDetail[] = [
    { id: 1, name: 'Umakant Patel', email: 'umakant@gmail.com', role: 'ROLE_ADMIN', totalOrders: 15, totalSpent: 12450.00, isActive: true, memberSince: '2026-01-10' },
    { id: 2, name: 'Amit Sharma', email: 'amit.sharma@example.com', role: 'ROLE_CUSTOMER', totalOrders: 4, totalSpent: 2890.00, isActive: true, memberSince: '2026-03-15' },
    { id: 3, name: 'Sonia Rao', email: 'sonia.rao@example.com', role: 'ROLE_DELIVERY', totalOrders: 0, totalSpent: 0.00, isActive: true, memberSince: '2026-04-20' },
    { id: 4, name: 'Raj Malhotra', email: 'raj@example.com', role: 'ROLE_CUSTOMER', totalOrders: 1, totalSpent: 699.00, isActive: false, memberSince: '2026-05-01' }
  ];

  ngOnInit(): void {
    this.dataSource.data = [...this.mockUsers];
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();
    const role = this.selectedRole;

    this.dataSource.filterPredicate = (data: UserDetail, filter: string) => {
      const matchesSearch = data.name.toLowerCase().includes(search) || 
                            data.email.toLowerCase().includes(search);
      const matchesRole = role === 'ALL' || data.role === role;
      return matchesSearch && matchesRole;
    };

    this.dataSource.filter = 'trigger';
    this.cdr.markForCheck();
  }

  toggleUserStatus(user: UserDetail): void {
    const newStatus = !user.isActive;
    const actionLabel = newStatus ? 'activated' : 'deactivated';
    
    if (confirm(`Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} user account for ${user.name}?`)) {
      // Apply status modification locally
      this.mockUsers = this.mockUsers.map(u => 
        u.id === user.id ? { ...u, isActive: newStatus } : u
      );
      this.dataSource.data = [...this.mockUsers];
      
      this.notificationService.showInfo(`User account has been successfully ${actionLabel}.`, 'User Management');
      this.applyFilters();
    }
  }
}
