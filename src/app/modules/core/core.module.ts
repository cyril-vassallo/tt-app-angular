import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const core = [
  BrowserModule,
  HttpClientModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [...core],
  exports: [...core],
})
export class CoreModule {}
