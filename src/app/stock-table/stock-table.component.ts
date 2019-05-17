import { Component, OnInit } from '@angular/core';
import { StockProviderService } from '../stock-provider.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  constructor(private stockProviderService: StockProviderService) { }

  stockList: {}[];
  stockDetails: {};

  ngOnInit() {
    this.stockList = this.stockProviderService.getList();
    this.stockDetails = this.stockProviderService.getDetails();
    this.stockProviderService.initialCall();
  }

}
