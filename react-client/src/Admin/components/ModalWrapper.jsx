import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { MdOutlineCancel } from 'react-icons/md';
import { closeModal } from '@/redux/Public/modalSlice.js';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import Button from '../components/Button.jsx';

const ModalWrapper = ({
  children,
  title,
  description = '',
  size = 'default',
  showClose = true,
  loading = false,
  preventClose = false,
}) => {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    if (!preventClose) {
      dispatch(closeModal());
    }
  };

  const sizeClasses = {
    small: 'sm:max-w-[425px]',
    default: 'sm:max-w-[625px]',
    large: 'sm:max-w-[825px]',
    full: 'sm:max-w-[90vw]',
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent
        className={`
          ${sizeClasses[size]}
          border-none
          shadow-lg
          p-0
          gap-0
        `}
        style={{
          backgroundColor: '#1A1C1E',
        }}
      >
        {/* Header */}
        {(title || showClose) && (
          <DialogHeader className="border-b border-gray-700/50 p-4">
            {title && (
              <>
                <DialogTitle className="text-xl font-semibold text-gray-100">
                  {title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {description || `${title} dialog`}
                </DialogDescription>
              </>
            )}
            {showClose && !preventClose && (
              <div className="absolute right-2 top-2">
                <Button
                  icon={<MdOutlineCancel />}
                  color="rgb(10, 10, 10)"
                  bgColor={currentColor}
                  size="2xl"
                  borderRadius="50%"
                  clas="btn-style-t"
                  onClick={handleClose}
                />
              </div>
            )}
          </DialogHeader>
        )}

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2
                className="h-8 w-8 animate-spin"
                style={{ color: currentColor }}
              />
            </div>
          ) : (
            <div className="text-gray-200">{children}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large', 'full']),
  showClose: PropTypes.bool,
  loading: PropTypes.bool,
  preventClose: PropTypes.bool,
};

export default ModalWrapper;
