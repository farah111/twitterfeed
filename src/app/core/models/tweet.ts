import {User} from './user';

export interface Tweet {
  id: number;
  user: {
    name: string ;
    screen_name: string;
    followers_count: number;
  };
  created_at: string;
}

