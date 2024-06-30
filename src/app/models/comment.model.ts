export interface CommentResponse {
    comments: Comment[];
    message: string;
    success: boolean;
  }
  
  export interface Comment {
    comment_id: number;
    date: string;
    name: string;
    post_id: number;
    text: string;
    user_id: number;
    username: string;
  }
  
  export class CommentModel {
    comment_id: number;
    date: string;
    name: string;
    commentPostId: number;
    text: string;
    userId: number;
    username: string;
  
    constructor(comment: Comment) {
      this.comment_id = comment.comment_id;
      this.date = comment.date;
      this.name = comment.name;
      this.commentPostId = comment.post_id;
      this.text = comment.text;
      this.userId = comment.user_id;
      this.username = comment.username;
    }
  }
  