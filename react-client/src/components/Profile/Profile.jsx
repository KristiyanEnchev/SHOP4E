import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  avatarUpload,
  setCredentials,
  updateUser,
} from '../../redux/Public/AuthSlice';
import {
  emailValidator,
  passwordValidator,
} from '../Authentication/Validators';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

export default function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { avatar, email, name } = auth;
  const [avatarPreview, setAvatarPreview] = useState(null);

  const form = useForm({
    defaultValues: {
      name: name || '',
      email: email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { isSubmitting } = form.formState;

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values) => {
    let hasUpdates = false;
    let newAvatarPath = null;

    try {
      const avatarInput = document.getElementById('avatar-upload');
      const avatarFile = avatarInput?.files?.[0];

      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);

        try {
          const result = await dispatch(avatarUpload(formData)).unwrap();
          console.log('Avatar upload result:', result);

          if (!result || !result.url) {
            throw new Error('Failed to upload avatar - no path received');
          }

          newAvatarPath = result.fullUrl;
          console.log('New avatar path:', newAvatarPath);
          hasUpdates = true;
        } catch (uploadError) {
          console.error('Avatar upload error:', uploadError);
          toast.error('Failed to upload profile picture');
          return;
        }
      }

      const updateData = {
        ...auth,
        name: values.name,
        email: values.email,
        token: auth.token,
        isAdmin: auth.isAdmin,
        _id: auth._id,
        profile: {
          avatar: newAvatarPath || auth.avatar,
        },
        avatar: newAvatarPath || auth.avatar,
      };

      if (values.name !== name || values.email !== email || newAvatarPath) {
        console.log('Updating profile with:', updateData);

        const updateResult = await dispatch(updateUser(updateData)).unwrap();
        console.log('Profile update result:', updateResult);

        if (updateResult) {
          const updatedAuth = {
            ...auth,
            ...updateResult,
            name: values.name,
            email: values.email,
            avatar: newAvatarPath || updateResult.avatar || auth.avatar,
            token: auth.token,
            isAdmin: auth.isAdmin,
          };

          console.log('Setting final auth state:', updatedAuth);

          // Update Redux state
          dispatch(setCredentials(updatedAuth));

          // Update all session storage items
          sessionStorage.setItem('userInfo', JSON.stringify(updatedAuth));
          sessionStorage.setItem('avatar', updatedAuth.avatar);
          sessionStorage.setItem('name', updatedAuth.name);
          sessionStorage.setItem('email', updatedAuth.email);

          hasUpdates = true;
        }
      }

      // Handle password update with the most recent avatar
      if (values.currentPassword && values.newPassword) {
        if (values.newPassword !== values.confirmPassword) {
          toast.error('New passwords do not match');
          return;
        }

        const passwordUpdate = {
          ...auth,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          token: auth.token,
          isAdmin: auth.isAdmin,
          avatar: newAvatarPath || auth.avatar,
          name: values.name,
          email: values.email,
          profile: {
            avatar: newAvatarPath || auth.avatar,
          },
        };

        const passwordResult = await dispatch(
          updateUser(passwordUpdate)
        ).unwrap();

        if (passwordResult) {
          const updatedAuth = {
            ...auth,
            ...passwordResult,
            name: values.name,
            email: values.email,
            avatar: newAvatarPath || auth.avatar,
            token: auth.token,
            isAdmin: auth.isAdmin,
          };

          dispatch(setCredentials(updatedAuth));
          sessionStorage.setItem('userInfo', JSON.stringify(updatedAuth));
          sessionStorage.setItem('avatar', updatedAuth.avatar);
          sessionStorage.setItem('name', updatedAuth.name);
          sessionStorage.setItem('email', updatedAuth.email);
          hasUpdates = true;
        }
      }

      if (!hasUpdates) {
        toast.error('No changes detected');
        return;
      }

      toast.success('Profile updated successfully');

      // Reset form and preview
      form.reset({
        ...values,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setAvatarPreview(null);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <Card className="w-full max-w-4xl bg-white shadow-2xl border-0 rounded-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
            Profile Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="px-11">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-8">
              {/* Left Section - Personal Info */}
              <div className="flex-1 space-y-8">
                {/* Avatar */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="relative">
                        <img
                          src={avatarPreview || avatar || '/default-avatar.png'}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover bg-gray-100"
                        />
                        <div
                          className="absolute inset-0 bg-black/50 rounded-full
                          opacity-0 group-hover:opacity-100 transition-opacity
                          flex items-center justify-center"
                        >
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Full Name"
                            className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: 'Email is required',
                      validate: emailValidator,
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email Address"
                            className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Right Section - Password Change */}
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Change Password
                </h3>

                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Current Password"
                          className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-medium" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  rules={{
                    validate: (value) => !value || passwordValidator(value),
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="New Password"
                          className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-medium" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{
                    validate: (value) =>
                      !form.getValues('newPassword') ||
                      value === form.getValues('newPassword') ||
                      'Passwords do not match',
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm New Password"
                          className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-medium" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 mt-6 bg-gradient-to-r from-red-400 to-red-500
                    hover:opacity-90 transition-all shadow-lg shadow-red-500/30
                    text-white font-semibold text-base rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : null}
                  {isSubmitting ? 'Updating...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
