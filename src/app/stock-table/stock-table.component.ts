import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StockProviderService } from '../stock-provider.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  constructor(private stockProviderService: StockProviderService) {}

  stockList: {}[];
  stockDetails: {};
  stockActive: string;
  loading:boolean = true;
 

  @ViewChild('graph') public graphEl: ElementRef;

  ngOnInit() {
    this.stockDetails = { symbol: '', name: '', time: '', high: '', low : '', time_series: {} };

    this.stockList = this.stockProviderService.getList();
    this.stockActive = this.stockList[0]["symbol"];

    this.stockProviderService.initialCall(this.graphEl.nativeElement);
    this.stockProviderService.stockSubject.subscribe(
        (value) => {
           this.stockDetails = value;
           this.loading = false;
        }
    );
  }

  afterStockSelect(symbol: string , name: string) {
    this.stockProviderService.changeStock(this.graphEl.nativeElement, symbol, name);
    this.stockActive = symbol;
    this.loading = true;
  }

}
