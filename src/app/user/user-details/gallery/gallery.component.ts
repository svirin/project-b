import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { ImageState } from '../../../shared/model/image-state.model';
import { UserState } from '../../../shared/model/user-state.model';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy{

  @Input() subject: Subject<UserState>;
  subscription: Subscription;
  mainImage: ImageState = new ImageState('', '');
  images: ImageState[];

  constructor
  (

  ) { }

  ngOnInit() {

    if (this.subject) {
      this.subscription = this.subject.subscribe((userState) => {

        this.images = userState.images;
        let idx = this.getRandomInt(0, userState.images.length - 1);
        this.mainImage = userState.images[idx];

      });
    }
  }

  selectImage(img: ImageState) {
    this.mainImage = img;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
