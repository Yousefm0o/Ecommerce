import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { HeadingComponent } from './heading/heading.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './list/card/card.component';

import { AppRoutingModule } from '../../app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';






@NgModule({
  declarations: [
    ProductsComponent,
    HeadingComponent,
    ListComponent,
    CardComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    RouterModule,
    CurrencyPipe,
    MatSnackBarModule,
  ]
})
export class ProductsModule { }
