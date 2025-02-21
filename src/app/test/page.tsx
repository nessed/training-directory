"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@heroui/react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  active: "success", // Green
  paused: "danger", // Red
  vacation: "warning", // Yellow
};

const users = [
    { id: 1, name: "Ali", role: "CEO", status: "Active" },
    { id: 2, name: "Abid", role: "Director", status: "Paused" },
    { id: 3, name: "Abdullah", role: "Developer", status: "Active" },
    { id: 4, name: "Amna", role: "Manager", status: "Vacation" },
    { id: 5, name: "Hassan", role: "Designer", status: "Active" },
    { id: 6, name: "Zunair", role: "Intern", status: "Active" },
    { id: 7, name: "Haider", role: "Marketing Manager", status: "Active" },
    { id: 8, name: "Bilal", role: "Sales Executive", status: "Paused" },
    { id: 9, name: "Sara", role: "HR Manager", status: "Vacation" },
    { id: 10, name: "Zeeshan", role: "Software Engineer", status: "Active" },
    { id: 11, name: "Fatima", role: "Product Manager", status: "Active" },
    { id: 12, name: "Omer", role: "Finance Head", status: "Paused" },
    { id: 13, name: "Ayesha", role: "Content Writer", status: "Active" },
    { id: 14, name: "Noman", role: "System Admin", status: "Active" },
    { id: 15, name: "Saad", role: "Quality Assurance", status: "Paused" },
    { id: 16, name: "Tariq", role: "Support Engineer", status: "Active" },
    { id: 17, name: "Rehan", role: "Security Officer", status: "Active" },
    { id: 18, name: "Usman", role: "IT Manager", status: "Vacation" },
    { id: 19, name: "Zara", role: "PR Executive", status: "Active" },
    { id: 20, name: "Kamran", role: "Logistics Coordinator", status: "Active" },
    { id: 21, name: "Daniyal", role: "Developer", status: "Paused" },
    { id: 22, name: "Shayan", role: "Project Manager", status: "Active" },
    { id: 23, name: "Eman", role: "UX Designer", status: "Vacation" },
    { id: 24, name: "Irfan", role: "Operations Manager", status: "Active" },
    { id: 25, name: "Sana", role: "Research Analyst", status: "Paused" },
];

export default function Page() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return users.slice(start, start + rowsPerPage);
  }, [page]);

  const renderCell = (user: any, columnKey: string) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          />
        );
      case "role":
        return <p className="capitalize">{cellValue}</p>;
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                ⋮
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">View</DropdownItem>
              <DropdownItem key="edit">Edit</DropdownItem>
              <DropdownItem key="delete">Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>

      <Table aria-label="Users Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className="text-black"key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found" items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center w-full mt-4">
        <Button isDisabled={page === 1} size="sm" onPress={() => setPage(page - 1)}>
          Previous
        </Button>
        <Pagination isCompact showControls color="primary" page={page} total={pages} onChange={setPage} />
        <Button isDisabled={page === pages} size="sm" onPress={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
