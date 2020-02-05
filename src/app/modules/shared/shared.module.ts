import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import { CardComponent } from './card/card.component';
import { PopupComponent } from './popup/popup.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [LoaderComponent, CardComponent, PopupComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ], exports: [LoaderComponent, CardComponent, PopupComponent], entryComponents: [PopupComponent]
})
export class SharedModule { }
