import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string; // always the hashed version — never plaintext
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,// MongoDB creates a unique index — prevents duplicate emails
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export const User = model<IUser>("User", userSchema);