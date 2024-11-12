import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Equipment } from '../../../interfaces';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  data = input<Equipment[]>();
  onShow = output<Equipment>();

  openEditWindow(item: Equipment): void {
    this.onShow.emit(item);
  }


}
