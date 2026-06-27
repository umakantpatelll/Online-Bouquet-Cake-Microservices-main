import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { RelativeTimePipe } from '../../../core/pipes/relative-time.pipe';

interface AuditLog {
  id: number;
  username: string;
  action: string;
  entityName: string;
  ipAddress: string;
  correlationId: string;
  timestamp: string;
}

/**
 * AuditLogsComponent
 * ----------------------------------------------------
 * Why this file exists:
 * The security compliance panel listing administrative activity logs, 
 * network IP coordinates, and correlation traceability codes.
 */
@Component({
  selector: 'app-operations-audit-logs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RelativeTimePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['id', 'username', 'action', 'entityName', 'ipAddress', 'correlationId', 'timestamp'];
  dataSource = new MatTableDataSource<AuditLog>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchText = '';
  selectedAction = 'ALL';

  private mockAuditLogs: AuditLog[] = [
    { id: 401, username: 'umakant', action: 'UPDATE_PRODUCT', entityName: 'Product #10', ipAddress: '192.168.1.10', correlationId: 'CID-890213', timestamp: new Date(Date.now() - 120000).toISOString() },
    { id: 402, username: 'umakant', action: 'UPDATE_ORDER_STATUS', entityName: 'Order #15', ipAddress: '192.168.1.10', correlationId: 'CID-234901', timestamp: new Date(Date.now() - 900000).toISOString() },
    { id: 403, username: 'system_daemon', action: 'CREATE_DELIVERY', entityName: 'Delivery #202', ipAddress: '127.0.0.1', correlationId: 'CID-908123', timestamp: new Date(Date.now() - 3600000).toISOString() }
  ];

  ngOnInit(): void {
    this.dataSource.data = [...this.mockAuditLogs];
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();
    const act = this.selectedAction;

    this.dataSource.filterPredicate = (data: AuditLog, filter: string) => {
      const matchesSearch = data.username.toLowerCase().includes(search) || 
                            data.correlationId.toLowerCase().includes(search) ||
                            data.entityName.toLowerCase().includes(search);
      const matchesAction = act === 'ALL' || data.action === act;
      return matchesSearch && matchesAction;
    };

    this.dataSource.filter = 'trigger';
    this.cdr.markForCheck();
  }
}
