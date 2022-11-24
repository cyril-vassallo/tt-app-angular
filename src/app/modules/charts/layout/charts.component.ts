import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  public barChart: any;
  public bubbleChart: any;
  public reversedMultiLineChart: any;

  constructor() {}

  // ----- Component lifecycle methods ----- //

  ngOnInit() {
    this.buildChart();
  }

  buildChart(): void {
    this.barChart = {
      id: 'chart-bar',
      title: 'Bar Chart',
      type: 'bar',
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      datasets: [
        {
          label: 'Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.bubbleChart = {
      id: 'bubble-bar',
      title: 'Bubble Chart',
      type: 'bubble',
      options: {},
      datasets: [
        {
          label: 'First Dataset',
          data: [
            {
              x: 20,
              y: 30,
              r: 15,
            },
            {
              x: 40,
              y: 10,
              r: 10,
            },
            {
              x: 12,
              y: 25,
              r: 50,
            },
          ],
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Second Dataset',
          data: [
            {
              x: 5,
              y: 14,
              r: 25,
            },
            {
              x: 46,
              y: 20,
              r: 70,
            },
            {
              x: 72,
              y: 32,
              r: 12,
            },
          ],
          backgroundColor: 'rgb(99, 255, 132)',
        },
      ],
    };

    this.reversedMultiLineChart = {
      id: 'reversed-line',
      title: 'Grade by regrouping type on 5 last years',
      type: 'line',
      options: {
        plugins: {
          autocolors: false,
          annotation: {
            annotations: {
              box1: {
                drawTime: 'beforeDatasetDraw',
                type: 'box',
                xMin: 1,
                xMax: 2,
                yMin: 1,
                yMax: 4,
                backgroundColor: 'rgba(255,88,118,0.5)',
                borderColor: 'transparent',
              },
            },
          },
        },
        scales: {
          x: {
            position: 'top',
            offset: true,
          },
          y: {
            reverse: true,
            beginAtZero: false,
            min: 1,
            max: 4,
            offset: true,
            ticks: {
              precision: 0,
            },
            grid: {
              display: false,
            },
          },
        },
      },
      labels: ['2017', '2018', '2019', '2020', '2021'],
      datasets: [
        {
          label: 'Private',
          data: [1, 2.3, 3.2, 2, 4],
          fill: false,
          borderColor: 'rgba(75, 190, 255, 0.5)',
          backgroundColor: 'blue',
          borderWidth: 10,
          radius: 10,
          tension: 0,
        },
        {
          label: 'Public',
          data: [3, 1.3, 3, 3, 2],
          fill: false,
          borderColor: 'rgba(190, 255, 75, 0.5)',
          backgroundColor: 'green',
          radius: 10,
          borderWidth: 10,
          tension: 0,
        },
        {
          label: 'Asso',
          data: [2, 3.1, 1.2, 3, 2],
          fill: false,
          borderColor: 'rgba(255, 190, 75, 0.5)',
          backgroundColor: 'red',
          radius: 10,
          borderWidth: 10,
          tension: 0,
        },
      ],
    };
  }
}
