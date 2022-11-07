import { NgModule } from '@angular/core';
import { ChartModule } from '../../shared/modules/chart/chart.module';
import { ChartsComponent } from './layout/charts.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ChartsComponent],
  imports: [CoreModule, ChartModule],
})
export class ChartsModule {}
