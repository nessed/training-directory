"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Button,
  Input,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Pagination,
} from "@heroui/react";
import SearchBar from "@/components/SearchBar";
import { EllipsisVertical, Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Plus } from "lucide-react";

import Image from "next/image";

export default function Home() {
  const users = [
    {
      id: 1,
      name: "Ali",
      role: "CEO",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 2,
      name: "Abid",
      role: "Director",
      status: "Paused",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 3,
      name: "Abdullah",
      role: "Developer",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 4,
      name: "Amna",
      role: "Manager",
      status: "Vacation",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 5,
      name: "Hassan",
      role: "Designer",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 6,
      name: "Zunair",
      role: "Intern",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 7,
      name: "Haider",
      role: "Marketing Manager",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 8,
      name: "Bilal",
      role: "Sales Executive",
      status: "Paused",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 9,
      name: "Sara",
      role: "HR Manager",
      status: "Vacation",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 10,
      name: "Zeeshan",
      role: "Software Engineer",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 11,
      name: "Fatima",
      role: "Product Manager",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 12,
      name: "Omer",
      role: "Finance Head",
      status: "Paused",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 13,
      name: "Ayesha",
      role: "Content Writer",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 14,
      name: "Noman",
      role: "System Admin",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 15,
      name: "Saad",
      role: "Quality Assurance",
      status: "Paused",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 16,
      name: "Tariq",
      role: "Support Engineer",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 17,
      name: "Rehan",
      role: "Security Officer",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 18,
      name: "Usman",
      role: "IT Manager",
      status: "Vacation",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 19,
      name: "Zara",
      role: "PR Executive",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 20,
      name: "Kamran",
      role: "Logistics Coordinator",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 21,
      name: "Daniyal",
      role: "Developer",
      status: "Paused",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 22,
      name: "Shayan",
      role: "Project Manager",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 23,
      name: "Eman",
      role: "UX Designer",
      status: "Vacation",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 24,
      name: "Irfan",
      role: "Operations Manager",
      status: "Active",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
    {
      id: 25,
      name: "Sana",
      role: "Research Analyst",
      status: "Paused",
      actions: "",
      avatar: "/blank-profilepic.png", // Default avatar
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Active") return "success"; // Green
    if (status === "Paused") return "danger"; // Red
    if (status === "Vacation") return "warning"; // Yellow
    return "default"; // Fallback
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-white p-4">
      {/* Search bar with icon */}
      <div className="w-full flex flex-row justify-end gap-2 p-1">
        <Input
          placeholder="Search by name..."
          startContent={<Search className="text-gray-500" />}
          className="p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        {/* Status dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button className="font-semibold flex items-center gap-2">
              Status
              <ChevronDown className="text-gray-500" size={100} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu className="text-gray-700">
            <DropdownItem key="active">Active</DropdownItem>
            <DropdownItem key="paused">Paused</DropdownItem>
            <DropdownItem key="vacation">Vacation</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Columns dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button className="font-semibold flex items-center gap-2">
              Columns
              <ChevronDown className="text-gray-500" size={100} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu className="text-gray-700">
            <DropdownItem key="id">ID</DropdownItem>
            <DropdownItem key="avatar">Avatar</DropdownItem>
            <DropdownItem key="name">Name</DropdownItem>
            <DropdownItem key="role">Role</DropdownItem>
            <DropdownItem key="status">Status</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Add User dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button className="bg-secondary text-white font-semibold flex items-center justify-center gap-2">
              Add User
              <Plus className="text-white" size={100} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu className="text-gray-700">
            <DropdownItem key="add-new">Add New User</DropdownItem>
            <DropdownItem key="import">Import Users</DropdownItem>
            <DropdownItem key="export">Export Users</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {/* Rows per page with dropdown */}
      <div className="flex flex-row justify-between gap-2 text-gray-600 p-2">
        <div className="flex flex-row gap-1">
          <div>Total:</div>
          <div>20 users</div>
        </div>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" size="sm" className="font-semibold">
                5
                <ChevronDown className="text-gray-500" size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="text-gray-700">
              <DropdownItem key="5">5</DropdownItem>
              <DropdownItem key="10">10</DropdownItem>
              <DropdownItem key="15">15</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* Table displaying users */}
      <Table className="shadow-lg rounded-lg w-full table-fixed">
        <TableHeader className="font-bold w-screen">
          <TableColumn className="text-center font-bold text-white bg-secondary">
            <Checkbox color="success" />
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            AVATAR
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            NAME
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            ROLE
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            STATUS
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            ACTIONS
          </TableColumn>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              className="text-gray-700 border-b border-opacity-100"
              key={user.id}
            >
              <TableCell className="text-center">
                <Checkbox color="success" />
              </TableCell>

              {/* Avatar */}
              <TableCell className="text-center flex justify-center items-center">
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s Avatar`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </TableCell>

              {/* User name */}
              <TableCell className="text-center font-sans">
                {user.name}
              </TableCell>

              {/* User role */}
              <TableCell className="text-center">{user.role}</TableCell>

              {/* Status */}
              <TableCell className="text-center font-bold">
                <Chip
                  className="font-semibold "
                  color={getStatusColor(user.status)}
                >
                  {user.status}
                </Chip>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-center">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <EllipsisVertical className="text-gray-500" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu className="text-gray-700">
                    <DropdownItem key="view">View</DropdownItem>
                    <DropdownItem key="edit">Edit</DropdownItem>
                    <DropdownItem key="delete">Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        key="secondary"
        color="secondary"
        className=" flex items-center justify-center py-5"
        isCompact
        loop
        showControls
        showShadow
        initialPage={1}
        total={10}
      />
      ;{" "}
    </div>
  );
}
