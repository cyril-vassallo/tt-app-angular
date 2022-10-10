import { NgModule } from '@angular/core';
import { ChartModule } from '../../shared/modules/chart/chart.module';
import { ChartsComponent } from './layout/charts.component';

@NgModule({
  declarations: [ChartsComponent],
  imports: [ChartModule],
})
export class ChartsModule{}
