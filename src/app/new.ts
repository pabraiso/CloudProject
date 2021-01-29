
import { User } from "./user.model";

export class New{
    date!: any;
    description!: String | undefined;
    country!: String | undefined;
    uid!: String | null;
    email!: String | null;
    displayName!: String | null;

    constructor(
        date: Date,
        description: String,
        country: String,
        uid:String,
        email: String,
        displayName: String){
            this.date = date;
            this.description = description;
            this.country = country;
            this.uid=uid;
            this.email = email;
            this.displayName = displayName;
        }
}
