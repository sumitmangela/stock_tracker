import { Component, OnInit } from '@angular/core';
import { StockProviderService } from '../stock-provider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  searchList: {}[];
  data_name: string = '';
  disableSearch :boolean = false;

  constructor(private stockProviderService: StockProviderService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addStock(stock_name: HTMLInputElement) {
     if (stock_name.value && stock_name.value !== ' ' ) {
       this.stockProviderService.addStockToList(stock_name.value.toUpperCase(), this.data_name);
       stock_name.value = '';
       this.disableSearch = false;
     }
  }

  clearSearch(stock_name: HTMLInputElement) {
      stock_name.value = '';
      this.disableSearch = false;
 }

  inputChange(stock_name: HTMLInputElement){
    if (stock_name.value && stock_name.value !== ' ' ) {
      this.stockProviderService.getSearchResults(stock_name.value)
      .subscribe((data) => { 
        if(data['Note']){
          this.toastr.warning('API limit is reached, Please try again after a minute','Cannot Search for stocks',{
            positionClass: 'toast-bottom-center',
            timeOut: 5000,
            closeButton: true
          });
        }
        else{
          this.searchList = data['bestMatches'].map((item)=>{ return { symbol : item["1. symbol"], name: item["2. name"]} });
        }
      } );
    }
    else{
      this.searchList = [];
    }

  }

  selectSearchValue(stock_name: HTMLInputElement, stock_value: string, data_name: string){
    stock_name.value = stock_value;
    this.data_name = data_name;
    this.searchList = [];
    this.disableSearch = true;
  }

}
