import React from "react";
import Button from "./Button";

const OrderTable = ({
  data,
  columns,
  handleDelete,
  handleStatus,
  entityType,
}) => {
  const isUserLoggedIn = entityType === "user";

  // Filter orders based on status
  const pendingOrders = data.filter(
    (order) => order.status === "Pending" || order.status === "pending"
  );
  const doneOrders = data.filter((order) => order.status === "Done");

  return (
    <div className="overflow-x-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Pending Orders</h2>
        {pendingOrders.length > 0 ? (
          <table className="bg-gray-700 w-full table-auto border-collapse border-2 border-gray-400 rounded-lg text-center overflow-hidden whitespace-no-wrap">
            <thead className="bg-gray-800 h-10 uppercase font-bold">
              <tr>
                {columns.map((column) => (
                  <th key={column}>
                    {column.replace(/([A-Z])/g, " $1").trim()}
                  </th>
                ))}
                {isUserLoggedIn ? <th>Mark as Completed</th> : null}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="bg-gray-600 text-gray-100">
              {pendingOrders.map((row) => (
                <tr key={row._id}>
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="border border-gray-500 px-4 py-2 sm:px-2 sm:py-1"
                    >
                      {row[column]}
                    </td>
                  ))}
                  {isUserLoggedIn ? (
                    <td className="border border-gray-500">
                      <Button
                        variant="primary"
                        className="rounded-md"
                        onClick={() => handleStatus(row._id)}
                      >
                        <i className="fas fa-circle-check"></i>
                      </Button>
                    </td>
                  ) : null}
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
            No Pending Orders Found..
          </h2>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Done Orders</h2>
        {doneOrders.length > 0 ? (
          <table className="bg-gray-700 w-full table-auto border-collapse border-2 border-gray-400 rounded-lg text-center overflow-hidden whitespace-no-wrap">
            <thead className="bg-gray-800 h-10 uppercase font-bold">
              <tr>
                {columns.map((column) => (
                  <th key={column}>
                    {column.replace(/([A-Z])/g, " $1").trim()}
                  </th>
                ))}
                {isUserLoggedIn ? null : <th>Delete</th>}
              </tr>
            </thead>
            <tbody className="bg-gray-600 text-gray-100">
              {doneOrders.map((row) => (
                <tr key={row._id}>
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="border border-gray-500 px-4 py-2 sm:px-2 sm:py-1"
                    >
                      {row[column]}
                    </td>
                  ))}
                  {isUserLoggedIn ? null : (
                    <td className="border border-gray-500">
                      <Button
                        variant="danger"
                        className="rounded-md"
                        onClick={() => handleDelete(row._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-red-500 text-xl text-center rounded-md border-2 border-gray-700 font-semibold mb-2 p-4 hidden md:block">
            No Completed Orders Found..
          </h2>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
