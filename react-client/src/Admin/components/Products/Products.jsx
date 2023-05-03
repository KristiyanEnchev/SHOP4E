import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  getProducts,
  selectProducts,
} from '../../../redux/Public/productsSlice';
import Header from '../Header';
import ProductCard from './ProductCard';
import { DetailsProduct } from './Modals/DetailsProduct';
import { EditProduct } from './Modals/EditProduct';
import { CreateProduct } from './Modals/CreateProduct';
import Loader from '../../../components/common/Loader/Loader';
import toast from 'react-hot-toast';
import { useStateContext } from '../../contexts/ContextProvider.jsx';
import { openModal } from '../../../redux/Public/modalSlice.js';
import { UserActions } from '../Helpers/UserListConstants.js';
import Table from '../Table.jsx';
import { usePagination } from '@/Admin/hooks/usePagination.jsx';
import { useSearch } from '@/Admin/hooks/useSearch.jsx';
import Search from '../Search.jsx';
import Pagination from '../Pagination.jsx';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(selectProducts);
  const { isOpen, userAction, objectId } = useSelector((state) => state.modal);
  const { currentColor } = useStateContext();

  const { setSearchTerm, filteredItems: filteredProducts } = useSearch(
    products,
    ['name', 'slug', '_id']
  );

  const {
    currentItems: currentProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    totalItems,
  } = usePagination(filteredProducts);

  const tableHeaders = ['Image', 'Name', 'Price', 'Created', 'Actions'];

  const deleteHandler = (e, productID) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this?')) {
      dispatch(deleteProduct(productID));
    } else {
      toast.error('Deletion stopped');
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <Header category="Page" title="Products" />
        <Search onSearch={setSearchTerm} placeholder="Search products..." />
        <button
          onClick={() => dispatch(openModal({ action: UserActions.Create }))}
          style={{ backgroundColor: currentColor }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add new product
        </button>
      </div>

      <section className="w-full bg-white rounded-lg shadow-md">
        {/* Modals */}
        {isOpen && userAction === 'details' && (
          <DetailsProduct objectId={objectId} />
        )}
        {isOpen && userAction === 'edit' && <EditProduct objectId={objectId} />}
        {isOpen && userAction === 'create' && <CreateProduct />}

        {/* Table */}
        <Table headers={tableHeaders} headerColor={currentColor}>
          <tbody>
            {currentProducts?.map((product) => (
              <tr
                key={product._id}
                className="even:bg-gray-100 odd:bg-white hover:bg-gray-50 transition-colors"
              >
                <ProductCard product={product} deleteHandler={deleteHandler} />
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

export default Products;
