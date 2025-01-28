import { useEffect } from 'react';
import Header from '../Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  retrieveUsers,
  selectUsers,
} from '../../../redux/Admin/UsersSlice.js';
import { UserCard } from './UserCard.jsx';
import { openModal } from '../../../redux/Public/modalSlice.js';
import { DetailsUser } from './Modals/DetailsUser.jsx';
import { EditUser } from './Modals/EditUser.jsx';
import { CreateUser } from './Modals/CreateUser.jsx';
import { useStateContext } from '../../contexts/ContextProvider.jsx';
import { UserActions } from '../Helpers/UserListConstants.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import Table from '../Table.jsx';
import Search from '../Search.jsx';
import Pagination from '../Pagination.jsx';
import { useSearch } from '@/Admin/hooks/useSearch.jsx';
import { usePagination } from '@/Admin/hooks/usePagination.jsx';

const Users = () => {
  const dispatch = useDispatch();
  const { isOpen, userAction, objectId } = useSelector((state) => state.modal);
  const { currentColor } = useStateContext();
  const { users } = useSelector(selectUsers);

  const { setSearchTerm, filteredItems: filteredUsers } = useSearch(users, [
    'name',
    'email',
  ]);

  const {
    currentItems: currentUsers,
    totalPages,
    currentPage,
    setCurrentPage,
    totalItems,
  } = usePagination(filteredUsers);

  const tableHeaders = ['Image', 'Name', 'Email', 'Created', 'Actions'];

  const deleteHandler = (e, userID) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this?')) {
      dispatch(deleteUser(userID));
    } else {
      toast.error('Deletion stopped');
    }
  };

  useEffect(() => {
    dispatch(retrieveUsers());
  }, [dispatch]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <Header category="Page" title="Users" />
        <div className="flex items-center gap-4">
          <Search onSearch={setSearchTerm} placeholder="Search users..." />
          <Button
            onClick={() => dispatch(openModal({ action: UserActions.Create }))}
            style={{ backgroundColor: currentColor }}
            className="px-4 py-2 rounded-full text-white hover:opacity-90 transition-opacity"
          >
            Add new user
          </Button>
        </div>
      </div>

      <section className="w-full bg-white rounded shadow-md">
        {/* Modals */}
        {isOpen && userAction === UserActions.Details && (
          <DetailsUser objectId={objectId} />
        )}
        {isOpen && userAction === UserActions.Edit && (
          <EditUser objectId={objectId} />
        )}
        {isOpen && userAction === UserActions.Create && <CreateUser />}

        {/* Table */}
        <Table headers={tableHeaders} headerColor={currentColor}>
          <tbody>
            {currentUsers?.map((user) => (
              <tr
                key={user._id}
                className="even:bg-gray-100/30 odd:bg-black/30 odd:text-white hover:bg-[#5a859680] transition-colors"
              >
                <UserCard user={user} deleteHandler={deleteHandler} />
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
        />
      </section>
    </div>
  );
};

export default Users;
