import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {TweetsService} from '../../core/services/tweets.service';
import {ToastrService} from 'ngx-toastr';
import {Tweet} from '../../core/models/tweet';
import * as moment from 'moment';
import {User} from '../../core/models/user';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-posts',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  loading: boolean;
  tweetsList: Tweet [] = [];
  currentUser: User;
  selectedTweet: Tweet;
  constructor(
    private toastr: ToastrService,
    private tweetsService: TweetsService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.loading = true;
    this.getTweets();
  }

  getCurrentUser() {
    this.currentUser = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTweets() {
    this.tweetsService.getUserTweets().subscribe(tweets => {
      this.loading = false;
      this.tweetsList = tweets;
    }, error => {
      this.loading = false;
      this.toastr.error('Something wrong happened, please try again later');
    });
  }

  getDateFormat(date) {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
  }

  showDetails(tweet, templateRef: TemplateRef<any>) {
    this.selectedTweet = tweet;
    this.dialog.open(templateRef);
  }

  closeAll() {
    this.dialog.closeAll();
  }

}
