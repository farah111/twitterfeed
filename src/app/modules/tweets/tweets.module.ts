import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent } from './tweets.component';
import {TweetsRoutingModule} from './tweets-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from '../../core/interceptors/error-interceptor';
import {AuthInterceptor} from '../../core/interceptors/auth-interceptor';
import {TweetsService} from '../../core/services/tweets.service';
import {SharedModule} from '../shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [TweetsComponent],
  imports: [
    CommonModule,
    TweetsRoutingModule,
    SharedModule,
    NgxJsonViewerModule
  ],
  providers: [
    TweetsService,
  ]
})
export class TweetsModule { }
