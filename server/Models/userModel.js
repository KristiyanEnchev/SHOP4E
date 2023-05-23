import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    profile: {
      firstName: String,
      lastName: String,
      avatar: {
        type: String,
        match: [/^(http|https):\/\/.+/, 'avatar is not valid!'],
      },
      bio: String,
      address: {
        street: String,
        city: String,
        country: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index(
  { email: 1 },
  {
    collation: {
      locale: 'en',
      strength: 1,
    },
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
