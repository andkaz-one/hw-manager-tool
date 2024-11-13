import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { HardwareService } from '../../services/hardware.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataTableComponent } from './data-table/data-table.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailComponent } from './detail/detail.component';
import { Equipment } from '../../interfaces';
import { SidebarModule } from 'primeng/sidebar';



@Component({
  selector: 'app-hardware',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    DataTableComponent,
    DetailComponent,
    CardModule,
    ButtonModule,
    SidebarModule
  ],
  providers: [HardwareService, DialogService],
  templateUrl: './hardware.component.html',
  styleUrl: './hardware.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HardwareComponent implements OnInit {
  private hardwareService: HardwareService = inject(HardwareService);
  private dialogService: DialogService = inject(DialogService);

  private dialogRef: DynamicDialogRef | undefined;


  // mock data
  data = this.hardwareService.data$;

  ngOnInit(): void {
  }

  openDetailsWindow(event: Equipment): void {
    this.dialogRef = this.dialogService.open(DetailComponent, {
      data: event,
      header: `Details of: ${event.model}`,
      maximizable: true,
      width: '45vw',
      modal: true
    });
  }

}
