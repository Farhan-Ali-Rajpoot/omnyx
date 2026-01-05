import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "@/libs/jwtService";
import { TokenType } from "@/config/tokens";

export type UserProviderType = (typeof UserProvider)[keyof typeof UserProvider];
export const UserProvider = ["email", "google"];

export interface UserType {
  _id: string;
  name: string;
  name_normalized: string;
  email: string;
  password: string;
  provider: UserProviderType;
  verified: boolean;
  picture?: string;
  createdAt?: Date;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    name_normalized: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: [7, "Email must be at least 7 characters long"],
      maxlength: [60, "Email must be at most 60 characters long"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "Password must be at least 5 characters long"],
      maxlength: [60, "Password must be at most 60 characters long"],
    },
    picture: {
      type: String,
    },
    provider: {
      type: String,
      enum: UserProvider,
      required: true,
      default: "email",
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

UserSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 86400, // 24 hours
    partialFilterExpression: { verified: false },
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  if (this.isModified("name")) {
    this.name_normalized = this.name.trim().toLowerCase();
  }
  next();
});

UserSchema.methods.generateJWT = function ({ cfg }: { cfg: TokenType }) {
  const payload: Omit<UserType, 'password' | 'name_normalized' | 'verified'> = {
    name: this.name,
    email: this.email,
    picture: this.picture,
    provider: this.provider,
    _id: this._id,
    createdAt: this.createdAt,
  };
  const token = JWT.sign(cfg, payload, { expiresIn: "90d" });
  if (!token.ok) {
    throw new Error(`JWT_SIGN_FAILED: ${token.error}`);
  }
  return token.value;
};

UserSchema.methods.isPasswordCorrect = async function ({
  password,
}: {
  password: string;
}) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
