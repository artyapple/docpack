import {Subscription} from "rxjs";

export interface DocSet {
  packName: string;
  docs: Array<Doc>;
}

export interface Doc {
  content: string;
}
