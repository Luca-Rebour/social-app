// hitPost.model.ts

export interface HitPostsResponse {
  success: boolean;
  message: string;
  posts: HitPost[];
}

export interface HitPost {
  post_id: number;
  text: string;
  likes_count: number;
  comments_count: number;
}

export class HitPostModel {
  postId: number;
  postText: string;
  likeCount: number;
  commentCount: number;

  constructor(post: HitPost) {
    this.postId = post.post_id;
    this.postText = post.text;
    this.likeCount = post.likes_count;
    this.commentCount = post.comments_count;
  }
}
