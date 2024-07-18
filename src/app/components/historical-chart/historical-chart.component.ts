import { Component, Input, OnInit } from '@angular/core';
import { CryptoHistoryService, HistoricalDataItem } from '../../services/crypto-history.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrl: './historical-chart.component.scss',
})
export class HistoricalChartComponent implements OnInit {
  public historicalData: any[] = [];
  public colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454'],
  }
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public showHistoricalChart = false;

  constructor(
    private cryptoHistoryService: CryptoHistoryService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.sharedDataService.getSymbol().subscribe((res) => {
      this.getData(res);
    })
  }

  getData(symbol: string) {
    this.cryptoHistoryService.getHistoricalData(symbol).subscribe(data => {
      this.showHistoricalChart = true;
      this.historicalData = [{
        name: 'Historical Data',
        series: data.map((item: HistoricalDataItem) => ({
          name: new Date(item.time_period_start).toLocaleDateString(),
          value: item.price_close
        }))
      }];
    }, err => {
      console.log(err);
    });
  }
}
