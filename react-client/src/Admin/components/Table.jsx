const Table = ({ headers, children, headerColor }) => {
  return (
    <div className="relative overflow-auto w-full mb-1 p-2 rounded-[3rem] bg-white">
      <table className="w-full">
        <thead
          className="sticky top-0 bg-white z-10"
          style={{ backgroundColor: headerColor }}
        >
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="p-2 text-center text-white font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {children}
      </table>
    </div>
  );
};

export default Table;
