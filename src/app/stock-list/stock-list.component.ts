import { Component, OnInit } from '@angular/core';
import { StockProviderService } from '../stock-provider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  constructor(private stockProviderService: StockProviderService, private toastr: ToastrService) { }

  stockList: {}[];

  ngOnInit() {
    this.stockList = this.stockProviderService.getList();
  }

  removeStock(stock_name: string) {
    if (stock_name) {
      if(this.stockList.length <= 1){
        this.toastr.warning('There has to be minimum one stock in the list','Cannot Delete this stock',{
          positionClass: 'toast-bottom-center',
          timeOut: 5000,
          closeButton: true
        });
      }
      else{
        this.stockProviderService.removeStockFromList(stock_name);
      }
    }
  }

}
