import { Component, OnInit } from '@angular/core';
import { StockProviderService } from '../stock-provider.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  constructor(private stockProviderService: StockProviderService) { }

  stockList: {}[];

  ngOnInit() {
    this.stockList = this.stockProviderService.getList();
  }

  removeStock(stock_name: string) {
    if (stock_name) {
      this.stockProviderService.removeStockFromList(stock_name);
    }
  }

}
