interface IPost {
  title: String;
  body: String;
  tags: [String];
  publishedDate: Date;
  user: {
    _id: String;
    email: String;
    username: String;
  };
  _id: String;
}

export type { IPost };
