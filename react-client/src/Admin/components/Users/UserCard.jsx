import { UserActions } from '../Helpers/UserListConstants';
import { useDispatch } from 'react-redux';
import { printDate } from './../Helpers/FormatHelper';
import { Pencil, Trash2, Info } from 'lucide-react';
import { openModal } from '../../../redux/Public/modalSlice.js';
import ActionButton from './../ActionButton';

export const UserCard = ({ user, deleteHandler }) => {
  const dispatch = useDispatch();
  const blankPictueUrl =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  const { createdAt, email, profile, name } = user;

  return (
    <>
      <td className="p-4">
        <img
          src={profile.avatar || blankPictueUrl}
          alt={`${name}'s profile`}
          className="w-[50px] h-[50px] object-cover rounded-full p-0.5 border border-gray-400 mx-auto"
        />
      </td>
      <td className="p-4 text-center">{name}</td>
      <td className="p-4 text-center">{email}</td>
      <td className="p-4 text-center">{printDate(createdAt)}</td>
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            variant="edit"
            title="Edit"
            icon={<Pencil className="w-4 h-4" />}
            onClick={() =>
              dispatch(
                openModal({ objectId: user._id, action: UserActions.Edit })
              )
            }
          />
          <ActionButton
            variant="delete"
            title="Delete"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={(e) => deleteHandler(e, user._id)}
          />
          <ActionButton
            variant="info"
            title="Info"
            icon={<Info className="w-4 h-4" />}
            onClick={() =>
              dispatch(
                openModal({ objectId: user._id, action: UserActions.Details })
              )
            }
          />
        </div>
      </td>
    </>
  );
};
