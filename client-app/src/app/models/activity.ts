import { runInAction } from "mobx";

export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  date: Date;
  venue: string;
  isGoing: boolean;
  isHost: boolean;
  attendees: IAttendee[];
  comments: IComment[];
}
export interface IComment {
  id: string;
  createdAt: Date;
  body: string;
  username: string;
  displayName: string;
  image: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}
export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = "";
  venue: string = "";

  constructor(init?: IActivityFormValues) {
    console.log("init", init);
    if (init && init.date) {
      runInAction("setting data of form time data septate", () => {
        // init.time = new Date(init.date!);
        init.time = init.date;
        // init.date = new Date(init.date!);
      });
    }
    Object.assign(this, init);
  }
}

export interface IAttendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
  following?: boolean;
}
