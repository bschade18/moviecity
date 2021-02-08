// Auth Actions
export interface RegisterProps {
  name: string;
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface ResetPasswordProps {
  password: string;
  password2: string;
  token: string;
}

export interface User {
  email: string;
  favorites: [];
  friends: [];
  name: string;
  photo: string;
  register_date: string;
  username: string;
  watchList: [];
  _id: string;
}

export interface UserLoadedAction {
  type: string;
  payload: User;
}

export interface UserWithToken {
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
    username: string;
  };
}

export interface LoginSuccessAction {
  type: string;
  payload: UserWithToken;
}

export interface RegisterSuccessAction {
  type: string;
  payload: UserWithToken;
}

export interface SetFriendsAction {
  type: string;
  payload: User;
}

export interface SetFavoritesAction {
  type: string;
  payload: User;
}

export interface SetWatchListAction {
  type: string;
  payload: User;
}

export interface UpdateImageAction {
  type: string;
  payload: string;
}

export interface GetUserAction {
  type: string;
  payload: User;
}

// Message Actions

export interface Message {
  conversation: [];
  imageUrl: string;
  messageDate?: string;
  movieTitle: string;
  recipient: object;
  sender: object;
  _id?: string;
}

export interface Conversation {
  conversation: {
    date: string;
    read: boolean;
    text: string;
    user: string;
    _id: string;
  }[];
}

export interface SetCurrentMessageAction {
  type: string;
  payload: Message;
}

export interface MessagesLoadedAction {
  type: string;
  payload: Message[];
}

export interface SendMessageAction {
  type: string;
  payload: Message;
}

export interface UpdateMessageAction {
  type: string;
  payload: Message;
}

// Review Actions
export interface Review {
  comments?: Comment[];
  imageUrl: string;
  movieId: number;
  movieTitle: string;
  name: string;
  rating: number;
  reviewDate?: string;
  text: string;
  user: User;
  username: string;
  _id?: string;
}

export interface Comment {
  date?: string;
  name: string;
  text: string;
  user: { photo: string; _id: string };
  username: string;
  _id?: string;
}

export interface ReviewsLoadedAction {
  type: string;
  payload: Review[];
}

export interface ReviewLoadedAction {
  type: string;
  payload: Review;
}

export interface AddReviewAction {
  type: string;
  payload: Review;
}

export interface AddCommentAction {
  type: string;
  payload: Review;
}

// User Actions
export interface GetUsersAction {
  type: string;
  payload: User[];
}

export interface GetUserAction {
  type: string;
  payload: User;
}

export interface UpdateUserAction {
  type: string;
  payload: User;
}

// Alert Actions
export interface Alert {
  location: string;
  msg: string;
  param: string;
  value?: string;
}
