export interface PostsResponse {
  success: boolean;
  message: string;
  posts: Post[];
}

export interface Post {
  post_id: number;
  user_id: number;
  user_name: string;
  post_date: Date;
  post_text: string;
  like_count: number;
  comment_count: number;
  user_liked: number;
  comments: string;
}

export class PostModel {
  postId: number;
  userId: number;
  userName: string;
  postDate: Date;
  postText: string;
  likeCount: number;
  commentCount: number;
  userLiked: number;
  comments: string;

  constructor(posts: Post) {
    this.postId = posts.post_id;
    this.userId = posts.user_id;
    this.userName = posts.user_name;
    this.postDate = posts.post_date;
    this.postText = posts.post_text;
    this.likeCount = posts.like_count;
    this.commentCount = posts.comment_count;
    this.userLiked = posts.user_liked;
    this.comments = posts.comments;
  }
}
