import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Table = ({ data, columns, handleDelete, entityType }) => {
  return (
    <div className="overflow-x-auto">
      {data.length > 0 ? (
        <table className="bg-gray-700 w-full table-auto border-collapse border-2 border-gray-400 rounded-lg text-center overflow-hidden whitespace-no-wrap">
          <thead className="bg-gray-800 h-10 uppercase font-bold">
            <tr>
              {columns.map((column) => (
                <th key={column}>{column.replace(/([A-Z])/g, " $1").trim()}</th>
              ))}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="bg-gray-600 text-gray-100">
            {data.map((row) => (
              <tr key={row._id}>
                {columns.map((column) => (
                  <td
                    key={column}
                    className="border border-gray-500 px-4 py-2 sm:px-2 sm:py-1"
                  >
                    {row[column]}
                  </td>
                ))}
                <td className="border border-gray-500">
                  <Link to={`/admin/edit/profile/${row._id}`}>
                    <Button variant="primary" className="rounded-md">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                </td>
                <td className="border border-gray-500">
                  <Button
                    variant="danger"
                    className="rounded-md"
                    onClick={() => handleDelete(row._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-red-500 text-xl text-center rounded-md border-2 border-gray-700 font-semibold mb-2 p-4 hidden md:block">
          Not Found..
        </h2>
      )}
    </div>
  );
};

export default Table;
