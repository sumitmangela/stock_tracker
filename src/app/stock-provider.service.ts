import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class StockProviderService {

constructor(private http: HttpClient) {}

api_key = 'OGXJ4OQULBITRD7O';
search_url: string;
stock_url: string;

stockList = [
    { symbol : 'SQ', name : 'Square Inc.' },
    { symbol : 'GDDY', name : 'GoDaddy Inc.' },
];

stockDetails: { symbol:string, name: string, time: string, time_series: {} };

getList() {
    return this.stockList;
}

getDetails() {
    return this.stockDetails;
}

addStockToList(stock_symobol: string, stock_name: string){
    this.stockList.push({ symbol : stock_symobol, name : stock_name });
}

removeStockFromList(stock_symobol: string) {
    (this.stockList).splice(this.stockList.map(x => x.symbol).indexOf(stock_symobol), 1);
}

generateSearchUrl(keyword){
    this.search_url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+keyword+'&apikey='+this.api_key;
}

generateStock_url(symbol){
    this.stock_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+symbol+'&interval=5min&apikey='+this.api_key;
}

getSearchResults(keyword){
    this.generateSearchUrl(keyword);
    return this.http.get(this.search_url);
}

getStockDetails(symbol){
    this.generateStock_url(symbol);
    return this.http.get(this.stock_url);
}

dispalyChart(symbol, name){
  this.getStockDetails(symbol).subscribe((data)=> { 
    this.stockDetails = {
        symbol : symbol,
        name : name,
        time : data["Meta Data"]["3. Last Refreshed"],
        time_series : data["Time Series (5min)"]
    };
    console.log(this.stockDetails);
   });
}

initialCall(){
   this.dispalyChart(this.stockList[0].symbol, this.stockList[0].name);
}

}