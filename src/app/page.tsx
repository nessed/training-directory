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
} from "@heroui/react";
import SearchBar from "@/components/SearchBar";
import { EllipsisVertical } from 'lucide-react';

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
      avatar: "/blank-profilepic", // Default avatar
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
      <div className="w-full flex flex-row justify-end gap-2 p-1">
        {/* <SearchBar /> */}
        <Input placeholder="Search" />
        <Button className="font-semibold">Status</Button>
        <Button className="font-semibold">Columns</Button>
        <Button className="bg-secondary text-white font-semibold">
          Add User
        </Button>
      </div>
      <div className="flex flex-row justify-between gap-2 text-gray-600 p-2">
        <div className="">Total 20 users</div>
        <div>Rows per page: 5</div>
      </div>

      <Table className="shadow-lg rounded-lg w-full">
        <TableHeader className="font-bold w-screen ">
          <TableColumn className="font-bold text-white bg-secondary">
            ID
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary">
            AVATAR
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary">
            NAME
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary">
            ROLE
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary">
            STATUS
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary">
            ACTIONS
          </TableColumn>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              className="text-gray-700 border-b border-opacity-100"
              key={user.id}
            >
              <TableCell>{user.id}</TableCell>

              {/* Render the Avatar using next/image */}
              <TableCell>
                <Image
                  src={user.avatar} // Use the avatar URL (points to public/blank-profilepic.png)
                  alt={`${user.name}'s Avatar`}
                  width={40} // Width of the image
                  height={40} // Height of the image
                  className="rounded-full" // Optional: make the image circular
                />
              </TableCell>

              <TableCell className="font-sans">{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip color={getStatusColor(user.status)}>{user.status}</Chip>
              </TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      :{" "}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
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
    </div>
  );
}
