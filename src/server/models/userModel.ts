import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

const Schema = mongoose.Schema;

// Create a schema using typescript with mongoose
const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compare encrypted password with plain text password
userSchema.methods.comparePassword = async function (
  plainPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, this.password);
};

// Hash plain text password before saving
userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  // Hash password  and store in password field
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;
