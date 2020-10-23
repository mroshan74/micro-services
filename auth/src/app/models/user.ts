import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  username: string;
  email: string;
  password: string;
  role?: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: string;
  id: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre<UserDoc>('save', function(next){
    bcryptjs.genSalt()
        .then(salt => {
            bcryptjs.hash(this.password,salt)
                .then(encrypted => {
                    this.password = encrypted
                    next()
                })
                .catch(err => {
                    return Promise.reject(err)
                })
        })
        .catch(err => {
            return Promise.reject(err)
        })
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
