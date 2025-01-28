import { Pencil, Trash2, Info } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/Public/modalSlice';
import { printDate } from '../Helpers/FormatHelper';
import { UserActions } from '../Helpers/UserListConstants';
import ActionButton from '../ActionButton.jsx';

export default function ProductCard({ product, deleteHandler }) {
  const blankPictueUrl =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  const { createdAt, price, image, name, _id } = product;
  const dispatch = useDispatch();

  return (
    <>
      <td className="p-4">
        <img
          src={image || blankPictueUrl}
          alt={`${name}'s profile`}
          className="w-[50px] h-[50px] rounded-full object-cover mx-auto border border-gray-200"
        />
      </td>
      <td className="p-4 text-center">{name}</td>
      <td className="p-4 text-center">${price}</td>
      <td className="p-4 text-center">{printDate(createdAt)}</td>
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            variant="edit"
            title="Edit"
            icon={<Pencil size={18} />}
            onClick={() =>
              dispatch(openModal({ objectId: _id, action: UserActions.Edit }))
            }
          />
          <ActionButton
            variant="delete"
            title="Delete"
            icon={<Trash2 size={18} />}
            onClick={(e) => deleteHandler(e, _id)}
          />
          <ActionButton
            variant="info"
            title="Info"
            icon={<Info size={18} />}
            onClick={() =>
              dispatch(
                openModal({ objectId: _id, action: UserActions.Details })
              )
            }
          />
        </div>
      </td>
    </>
  );
}
