import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockItemComponent } from './stock-item/stock-item.component';
import { StockCrudComponent } from './stock-crud/stock-crud.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockProviderService } from './stock-provider.service';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


const appRoutes: Routes = [
  { path: '', component: StockTableComponent},
  { path: 'stocks', component: StockCrudComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StockListComponent,
    StockItemComponent,
    StockCrudComponent,
    StockTableComponent,
    StockFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [StockProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
