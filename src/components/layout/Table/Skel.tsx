import { TTableColumn } from "../../../types/types";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Skel = ({ columns }: { columns: TTableColumn[] }) => {
  return (
    <>
      {data.map((data, ind) => {
        return (
          <tr key={ind} className="h-[50px]">
            {columns.map((col, ind) => {
              return (
                <td key={ind} className="h-[50px] last:pr-[16px]">
                  <div className="sk_bg mx-[16px] p-[0.75rem] mr-2 bg-white rounded-[8px]"></div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default Skel;
