export interface IUser {
  _id? : string
  first_name: string,
  last_name: string,
  mobile_number: string,
  email: string,
  user_uid: string,
  created_at?: Date,
  modified_at?: Date
}
