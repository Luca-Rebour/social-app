// hitPost.model.ts

export interface ConnectProfilesResponse {
    profiles: Profile[];
  }
  
  export interface Profile {
    name: string;
    last_name: string;
    user_id: number;
    followers: number,
    followed_by:boolean;
  }
  
  export class ConnectProfilesModel {
    name: string;
    lastName: string;
    followers: number;
    id: number;
    followedBy: boolean;
  
    constructor(profile: Profile) {
      this.name = profile.name;
      this.lastName = profile.last_name;
      this.followers = profile.followers;
      this.id = profile.user_id;
      this.followedBy = profile.followed_by;
    }
  }
  