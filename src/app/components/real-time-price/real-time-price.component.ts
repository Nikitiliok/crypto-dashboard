import { Component, Output } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'real-time-price',
  templateUrl: './real-time-price.component.html',
  styleUrl: './real-time-price.component.scss'
})
export class RealTimePriceComponent {
  public price: number = 0;
  public time: string = '';
  public symbol: string = '';
  public cryptoSymbol: string = '';
  public showMarketData: boolean = false;

  constructor(
    private cryptoDataService: CryptoDataService,
    private spinner: NgxSpinnerService,
    private sharedDataService: SharedDataService
  ) {}

  getMarketData() {
    this.spinner.show();
    this.sharedDataService.setSymbol(this.symbol);
    this.cryptoDataService.getRealTimeData(`BITSTAMP_SPOT_${this.symbol.toUpperCase()}`).subscribe(
    data => {
      this.price = data.price;
      this.time = new Date(data.time_exchange).toLocaleTimeString();
      this.cryptoSymbol = this.symbol;
      this.spinner.hide();
      this.showMarketData = true;
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showMarketData = false;
    });
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedChars = /^[a-zA-Z_]*$/;
    const inputChar = event.key;

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }
}
