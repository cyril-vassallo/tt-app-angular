import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChartInterface } from '../../../interfaces/interfaces';
import {
  Chart,
  registerables,
  ChartType,
  ChartOptions,
  ChartDataset,
} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {


  public chart: any;
  @Input() title: string = '';
  @Input() id: string = '';
  @Input() type: ChartType = 'bar';
  @Input() datasets: ChartDataset[] = [];
  @Input() labels: string[] = [];
  @Input() options: ChartOptions = {};

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    this.chart = new Chart(this.id, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: this.options
    });

  }
}
