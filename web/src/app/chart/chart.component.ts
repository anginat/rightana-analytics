import { Component, Input, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'rana-chart',
  template: '<canvas></canvas>',
  styles: [':host { display: block; }']
})
export class ChartComponent implements OnInit, OnChanges  {
  chart: Chart;

  @Input() type: string;
  @Input() data: any;
  @Input() options: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.create();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      if (changes['type'] || changes['options']) {
        this.create();
      } else if (changes['data']) {
        const currentValue = changes['data'].currentValue;
        ['datasets', 'labels', 'xLabels', 'yLabels']
          .forEach(property => {
            this.chart.data[property] = currentValue[property];
          });
        this.chart.update();
      }
    }
  }

  private create() {
    this.chart = new Chart(this.elementRef.nativeElement.querySelector('canvas'), {
      type: this.type,
      data: this.data,
      options: this.options
    });
  }
}
