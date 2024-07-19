import { Component } from '@angular/core';
import { GetProfilesService } from '../../../services/get-profiles.service';
import { NgFor, NgIf } from '@angular/common';
import { ConnectProfilesModel } from '../../../models/connect-profiles.model';
import { FollowService } from '../../../services/follow.service';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent {

  constructor(private _getProfiles: GetProfilesService, private _follow: FollowService) { 
    this.loadProfiles();
  }

  profiles: ConnectProfilesModel[] = [];

  loadProfiles() {
    this._getProfiles.getRandomProfiles().subscribe(data => {
      console.log(data);
      this.profiles = data || [];
    });
  }

  follow(followed: number){
    console.log('Follow' + followed);
    this._follow.follow(followed).subscribe(() => {
      this.loadProfiles();
    });
  }
unfollow(followed: number){
    console.log('Unfollow' + followed);
    this._follow.unfollow(followed).subscribe(() => {
      this.loadProfiles();
    });
  }


}
