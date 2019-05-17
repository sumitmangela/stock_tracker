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


getList() {
    return this.stockList;
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

getSearchResults(keyword){
    this.generateSearchUrl(keyword);
    return this.http.get(this.search_url);
}



}