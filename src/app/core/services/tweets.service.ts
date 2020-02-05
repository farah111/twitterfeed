import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TWEETS} from '../../../apiMap';
import {map, take, tap} from 'rxjs/operators';
import {Tweet} from '../models/tweet';
import {Observable} from 'rxjs';

@Injectable()
export class TweetsService {

  constructor(protected http: HttpClient) { }

  getUserTweets(): Observable<Tweet[]> {
    return this.http.get(TWEETS).pipe(
      map(res => res as Tweet[] || []),
      tap(tweets => {
        // sort items by created_at desc
        tweets.sort(
          (a, b) =>
            (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0));
      })
    );
  }
}
