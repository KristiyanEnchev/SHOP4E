const ActionButton = ({ onClick, title, icon, variant }) => {
  const variants = {
    edit: 'bg-[#5cb85c]',
    delete: 'bg-[#d9534f]',
    info: 'bg-[#2a87a5]',
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={`${variants[variant]} p-1.5 rounded hover:opacity-90 hover:shadow-lg transition-all text-white w-8 h-8 flex items-center justify-center`}
    >
      {icon}
    </button>
  );
};

export default ActionButton;
