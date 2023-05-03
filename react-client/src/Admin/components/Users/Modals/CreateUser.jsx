import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../../redux/Admin/UsersSlice.js';
import { closeModal } from '../../../../redux/Public/modalSlice.js';
import { UserActions } from '../../Helpers/UserListConstants.js';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
import Button from '../../Button.jsx';

import { User, Mail, Image, Lock } from 'lucide-react';
import ModalWrapper from './../../ModalWrapper';
import { useStateContext } from '../../../contexts/ContextProvider';

export const CreateUser = () => {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ initialError: true });
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    name: '',
    avatar: '',
    password: '',
  });

  const changeHandler = (e) => {
    if (
      values.avatar !== '' &&
      values.firstName !== '' &&
      values.lastName !== '' &&
      values.email !== '' &&
      values.name !== '' &&
      values.password !== ''
    ) {
      setErrors({ initialError: false });
    }
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = () => {
    setIsLoading(true);
    try {
      const { avatar, firstName, lastName, ...userData } = values;
      userData.profile = { avatar, firstName, lastName };
      dispatch(createUser(userData));
      dispatch(closeModal({ action: UserActions.Close }));
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const minLength = (e, bound) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: values[e.target.name].length < bound,
    }));
  };

  const isFormValid = !Object.values(errors).some((x) => x);

  return (
    <ModalWrapper
      title="Create User"
      size="default"
      description="Form to create a new user"
      loading={isLoading}
    >
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* First Name & Last Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="firstName"
                name="firstName"
                className="pl-8"
                value={values.firstName}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-500">
                First name should be at least 3 characters long!
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="lastName"
                name="lastName"
                className="pl-8"
                value={values.lastName}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.lastName && (
              <p className="text-sm text-red-500">
                Last name should be at least 3 characters long!
              </p>
            )}
          </div>

          {/* Email & Username */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                name="email"
                type="email"
                className="pl-8"
                value={values.email}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 5)}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">Email is not valid!</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="name"
                name="name"
                className="pl-8"
                value={values.name}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 6)}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">Username is not valid!</p>
            )}
          </div>
        </div>

        {/* Avatar & Password */}
        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar URL</Label>
          <div className="relative">
            <Image className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="avatar"
              name="avatar"
              className="pl-8"
              value={values.avatar}
              onChange={changeHandler}
              onBlur={(e) => minLength(e, 3)}
            />
          </div>
          {errors.avatar && (
            <p className="text-sm text-red-500">Image Avatar is not valid!</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="password"
              name="password"
              type="password"
              className="pl-8"
              value={values.password}
              onChange={changeHandler}
              onBlur={(e) => minLength(e, 6)}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">Password is not valid!</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            icon={null}
            color="rgb(153, 171, 180)"
            bgColor="transparent"
            text="Cancel"
            borderRadius="10px"
            size="md"
            onClick={() => dispatch(closeModal())}
          />
          <Button
            type="submit"
            icon={null}
            color="white"
            bgColor={currentColor}
            text={isLoading ? 'Creating...' : 'Create User'}
            borderRadius="10px"
            size="md"
            onClick={submitHandler}
            disabled={!isFormValid || isLoading}
          />
        </div>
      </form>
    </ModalWrapper>
  );
};
