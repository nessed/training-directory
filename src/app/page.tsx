"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";

export default function Home() {
  const users = [
    { id: 1, name: "Ali", role: "CEO", status: "Active" },
    { id: 2, name: "Abid", role: "Director", status: "Paused" },
    { id: 3, name: "Abdullah", role: "Developer", status: "Active" },
    {
      id: 4,
      name: "Amna",
      role: "Manager",
      status: "Vacation",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <Table className="max-w-3xl shadow-lg rounded-lg w-screen">
        <TableHeader className="font-bold w-screen ">
          <TableColumn className="font-bold text-white bg-secondary ">
            NAME
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary">
            ROLE
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary">
            STATUS
          </TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              className="text-gray-700 border-b border-opacity-100"
              key={user.id}
            >
              <TableCell className="font-sans">{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
