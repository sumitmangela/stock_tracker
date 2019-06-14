import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()

export class StockProviderService {

constructor(private http: HttpClient) {}

api_key = 'OGXJ4OQULBITRD7O';
search_url: string;
stock_url: string;
lastChart = null;


stockList = [
    { symbol : 'SQ', name : 'Square Inc.' },
    { symbol : 'GDDY', name : 'GoDaddy Inc.' },
];

stockSubject = new Subject();

stockDetails: { symbol:string, name: string, time: string, high: string, low: string, time_series: {} };

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

dispalyChart(container, symbol, name){
  this.getStockDetails(symbol).subscribe((data)=> { 
    
    if(data['Note']){
      this.stockSubject.next(data);
    }
    else{  
    let time = data["Time Series (5min)"];

    //  time = time[Object.keys(time)[Object.keys(time).length-1]];
    time =  time[data["Meta Data"]["3. Last Refreshed"]];
    

    this.stockDetails = {
        symbol : symbol,
        name : name,
        time : data["Meta Data"]["3. Last Refreshed"],
        high: time["2. high"],
        low: time["3. low"],
        time_series : data["Time Series (5min)"]
    };

   
    this.stockSubject.next(this.stockDetails);

    this.createChart(container, symbol, this.stockDetails.time_series)
     }
   });
}

initialCall(container){
   this.dispalyChart(container, this.stockList[0].symbol, this.stockList[0].name);
}

changeStock(container,symbol,name){
    this.dispalyChart(container, symbol, name);
 }

 transformData(timeSeries){
    let data = [], item;

    for (let each in timeSeries)
    {
      item = timeSeries[each];
      data.push([new Date(each).getTime(),
        parseFloat(item["4. close"])]);
    }

    return data;
 }

 createChart(container, symbol, timeSeries)
  {
    let options: any = this.chartConfig(symbol, timeSeries);
    let {lastChart} = this;

    if(options.chart != null)
    {
      options.chart['renderTo'] = container;
    }
    else
    {
      options.chart = {
        'renderTo': container
      };
    }

    if(lastChart != null)
    {
      lastChart.destroy();
    }

    lastChart = new Highcharts.Chart(options);
  }

  chartConfig(symbol, timeSeries)
  {
    let data = this.transformData(timeSeries);

    var config = {
      chart: { type: 'spline' },
      title : { text : symbol },
      xAxis: {
          type: 'datetime'
      },
      series: [{
        name: symbol,
        data: data,
        color: '#86e860',
      }],
      rangeSelector: {
          buttons: [{
              type: 'hour',
              count: 1,
              text: '1h'
          }, {
              type: 'day',
              count: 1,
              text: '1D'
          }, {
              type: 'all',
              count: 1,
              text: 'All'
          }],
          selected: 1,
          inputEnabled: false
      }
    };

    return config;
  };



}