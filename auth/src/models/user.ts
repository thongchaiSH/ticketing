import mongoose from "mongoose";
import { Password } from "../services/password";
// An interface
interface UserAtts {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAtts): UserDoc;
}

//An Interface that describes the properties
//that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // createdAt:string;
  // updatedAt:string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; //remove field json to password
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hased = await Password.toHash(this.get("password"));
    this.set("password", hased);
  }
  done();
});

//custom schema
userSchema.statics.build = (attrs: UserAtts) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// const user=User.build({
//     email:"t",
//     password:"x"
// });

export { User };
