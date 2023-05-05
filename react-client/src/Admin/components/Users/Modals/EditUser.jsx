import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Image } from 'lucide-react';
import {
  avatarValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  nameValidator,
} from '../../../../components/Authentication/Validators.js';
import Loader from '../../../../components/common/Loader/Loader.jsx';
import { findUserById, setUser } from '../../../../redux/Admin/UserSlice.js';
import { updateUser } from '../../../../redux/Admin/UsersSlice.js';
import { closeModal } from '../../../../redux/Public/modalSlice.js';
import { UserActions } from '../../Helpers/UserListConstants.js';
import ModalWrapper from '../../ModalWrapper';
import Button from '../../Button';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const EditUser = ({ objectId }) => {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const { user, loading } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(findUserById(objectId));
  }, [objectId, dispatch]);

  const changeHandler = (e) => {
    dispatch(
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
  };

  const submitHandler = () => {
    const { avatar, firstName, lastName, ...userData } = user;
    userData.profile = { avatar, firstName, lastName };
    userData._id = user._id;
    dispatch(updateUser(userData));
    dispatch(closeModal({ action: UserActions.Close }));
  };

  const validator = (e) => {
    setErrors((state) =>
      e.target.name === 'email'
        ? { ...state, [e.target.name]: emailValidator(user.email) }
        : e.target.name === 'firstName'
        ? { ...state, [e.target.name]: firstNameValidator(user.firstName) }
        : e.target.name === 'name'
        ? { ...state, [e.target.name]: nameValidator(user.name) }
        : e.target.name === 'lastName'
        ? { ...state, [e.target.name]: lastNameValidator(user.lastName) }
        : { ...state, [e.target.name]: avatarValidator(user.avatar) }
    );
  };

  const isFormValid = !Object.values(errors).some((x) => x);

  if (loading) return <Loader />;

  return (
    <ModalWrapper
      title="Edit User"
      description="Edit user information"
      size="default"
      loading={loading}
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
                defaultValue={user.firstName}
                onChange={changeHandler}
                onBlur={validator}
              />
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
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
                defaultValue={user.lastName}
                onChange={changeHandler}
                onBlur={validator}
              />
            </div>
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
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
                defaultValue={user.email}
                onChange={changeHandler}
                onBlur={validator}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
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
                defaultValue={user.name}
                onChange={changeHandler}
                onBlur={validator}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Avatar URL */}
        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar URL</Label>
          <div className="relative">
            <Image className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="avatar"
              name="avatar"
              className="pl-8"
              defaultValue={user.avatar}
              onChange={changeHandler}
              onBlur={validator}
            />
          </div>
          {errors.avatar && (
            <p className="text-sm text-red-500">{errors.avatar}</p>
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
            icon={null}
            color="white"
            bgColor={currentColor}
            text="Save Changes"
            borderRadius="10px"
            size="md"
            onClick={submitHandler}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </ModalWrapper>
  );
};
