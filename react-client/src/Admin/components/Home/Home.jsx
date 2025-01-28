import { useStateContext } from '../../contexts/ContextProvider.jsx';

export const Home = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="mb-10">
      <div className="flex flex-col items-center justify-center">
        <p
          style={{ color: currentColor }}
          className="text-3xl font-extrabold tracking-tight text-slate-900 text-center mb-6"
        >
          Welcome to The Admin Panel
        </p>
        <img
          className="w-[60%] h-[90%]"
          src="https://res.cloudinary.com/dmkgrwjes/image/upload/v1660328454/samples/New%20Assets/guard_idy7yg.png"
          alt="guard"
        />
      </div>
    </div>
  );
};
