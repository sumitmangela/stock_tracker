import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { StockProviderService } from '../stock-provider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit, OnDestroy{

  constructor(private stockProviderService: StockProviderService, private toastr: ToastrService) {}

  stockList: {}[];
  stockDetails: {};
  stockActive: string;
  loading:boolean = true;
  stockSubjectObserver : any;
 

  @ViewChild('graph') public graphEl: ElementRef;

  ngOnInit() {
    this.stockDetails = { symbol: '', name: '', time: '', high: '', low : '', time_series: {} };

    this.stockList = this.stockProviderService.getList();
    this.stockActive = this.stockList[0]["symbol"];

    this.stockProviderService.initialCall(this.graphEl.nativeElement);
    this.stockSubjectObserver = this.stockProviderService.stockSubject.subscribe(
        (value) => {
          console.log(1);
          if(value['Note']){
            this.toastr.warning('API limit is reached, Please try again after a minute','Cannot update stocks',{
              positionClass: 'toast-bottom-center',
              timeOut: 5000,
              closeButton: true
            });

            if(this.stockDetails["symbol"] != ''){
              this.loading = false;
            }

          }
          else{
            this.stockDetails = value;
           this.loading = false;
          }
        }
    );
  }

  afterStockSelect(symbol: string , name: string) {
    this.stockProviderService.changeStock(this.graphEl.nativeElement, symbol, name);
    this.stockActive = symbol;
    this.loading = true;
  }


  ngOnDestroy(){
    this.stockSubjectObserver.unsubscribe();
  }

}
