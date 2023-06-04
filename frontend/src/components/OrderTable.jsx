import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const OrderTable = ({
  data,
  columns,
  handleDelete,
  handleStatus,
  entityType,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="bg-gray-700 w-full table-auto border-collapse border-2 border-gray-400 rounded-lg text-center overflow-hidden whitespace-no-wrap">
        <thead className="bg-gray-800 h-10 uppercase font-bold">
          <tr>
            {columns.map((column) => (
              <th key={column}>
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
            <th>Mark as Completed</th>
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
                <Button
                  variant="primary"
                  className="rounded-md"
                  onClick={() => handleStatus(row._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
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
    </div>
  );
};

export default OrderTable;
