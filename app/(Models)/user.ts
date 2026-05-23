import { Schemaz, models, model } from "mongoose";
const UserSchema = new Schema({
  username: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: true,
  },
  number: {
    type: string,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
  role: {
    type: string,
    required: true,
  },
});
const User = models.User || model("User", UserSchema);
export default User;
