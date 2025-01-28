import { useStateContext } from '../contexts/ContextProvider';
import { PropTypes } from 'prop-types';

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  clas,
  onClick,
  disabled,
}) => {
  const { setIsClicked, initialState } = useStateContext();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsClicked(initialState);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} ${clas} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {icon} {text}
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.node,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  bgHoverColor: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
  borderRadius: PropTypes.string,
  width: PropTypes.string,
  clas: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
