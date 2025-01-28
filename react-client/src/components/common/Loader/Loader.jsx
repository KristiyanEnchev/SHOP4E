export default function Loader() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[50px] w-[50px] text-[0px] text-[#00c9d0] z-[9999]">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className={`
            absolute after:content-[' '] after:block after:absolute after:w-[7px] after:h-[7px]
            after:rounded-full after:bg-black after:-mt-1 after:-ml-1
            [transform-origin:40px_40px] animate-loader
            ${
              index === 0
                ? 'after:top-[63px] after:left-[63px] [animation-delay:-0.036s]'
                : index === 1
                ? 'after:top-[68px] after:left-[56px] [animation-delay:-0.072s]'
                : index === 2
                ? 'after:top-[71px] after:left-[48px] [animation-delay:-0.108s]'
                : index === 3
                ? 'after:top-[72px] after:left-[40px] [animation-delay:-0.144s]'
                : index === 4
                ? 'after:top-[71px] after:left-[32px] [animation-delay:-0.18s]'
                : index === 5
                ? 'after:top-[68px] after:left-[24px] [animation-delay:-0.216s]'
                : index === 6
                ? 'after:top-[63px] after:left-[17px] [animation-delay:-0.252s]'
                : 'after:top-[56px] after:left-[12px] [animation-delay:-0.288s]'
            }
          `}
        />
      ))}
    </div>
  );
}
