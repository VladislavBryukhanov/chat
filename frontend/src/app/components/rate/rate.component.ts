import {Component, Input, OnInit} from '@angular/core';
import {RateService} from '../../services/rate.service';
import {AuthService} from '../../services/auth.service';
import {Rate} from '../../models/rate';

enum actions {
  LIKE = 'like',
  DISLIKE = 'dislike'
}

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  @Input()
  public itemId: string;

  public likeCounter: number;
  public dislikeCounter: number;

  public meLike = false;
  public meDislike = false;

  public isShowedLikedUsers = false;
  public isShowedDislikedUsers = false;

  constructor(private rateService: RateService, private authService: AuthService) { }

  ngOnInit() {
    this.getPostRate();
  }

  // true = like, false = dislike
  ratePost(isLike: boolean) {
    this.rateService.postRate(new Rate(
      this.authService.myUser._id,
      isLike,
      this.itemId
    )).subscribe(_ => {
        this.getPostRate();
      });
  }

  getPostRate() {
    this.rateService.getRate(this.itemId, this.authService.myUser._id)
      .subscribe(res => {
        this.likeCounter = res['likeCounter'];
        this.dislikeCounter = res['dislikeCounter'];

        res['myAction'] === actions.LIKE ?
          this.meLike = true : this.meLike = false;
        res['myAction'] === actions.DISLIKE ?
          this.meDislike = true : this.meDislike = false;
      });
  }

  // true = like, false = dislike
  showRatedUsers(isLike) {
    this.isShowedLikedUsers = isLike;
    this.isShowedDislikedUsers = !isLike;
  }

}