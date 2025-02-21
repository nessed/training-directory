"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import SearchBar from "@/components/SearchBar";
export default function Home() {
  const users = [
    {
      id: 1,
      name: "Ali",
      role: "CEO",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      id: 2,
      name: "Abid",
      role: "Director",
      status: "Paused",
      actions: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      id: 3,
      name: "Abdullah",
      role: "Developer",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
    {
      id: 4,
      name: "Amna",
      role: "Manager",
      status: "Vacation",
      actions: "",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    },
    {
      id: 5,
      name: "Hassan",
      role: "Designer",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    },
    {
      id: 6,
      name: "Zunair",
      role: "Intern",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      id: 7,
      name: "Haider",
      role: "Marketing Manager",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    },
    {
      id: 8,
      name: "Bilal",
      role: "Sales Executive",
      status: "Paused",
      actions: "",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29027008d",
    },
    {
      id: 9,
      name: "Sara",
      role: "HR Manager",
      status: "Vacation",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 10,
      name: "Zeeshan",
      role: "Software Engineer",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 11,
      name: "Fatima",
      role: "Product Manager",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 12,
      name: "Omer",
      role: "Finance Head",
      status: "Paused",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: 13,
      name: "Ayesha",
      role: "Content Writer",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 14,
      name: "Noman",
      role: "System Admin",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    {
      id: 15,
      name: "Saad",
      role: "Quality Assurance",
      status: "Paused",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 16,
      name: "Tariq",
      role: "Support Engineer",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    {
      id: 17,
      name: "Rehan",
      role: "Security Officer",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: 18,
      name: "Usman",
      role: "IT Manager",
      status: "Vacation",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    {
      id: 19,
      name: "Zara",
      role: "PR Executive",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=50",
    },
    {
      id: 20,
      name: "Kamran",
      role: "Logistics Coordinator",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    {
      id: 21,
      name: "Daniyal",
      role: "Developer",
      status: "Paused",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 22,
      name: "Shayan",
      role: "Project Manager",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    {
      id: 23,
      name: "Eman",
      role: "UX Designer",
      status: "Vacation",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    {
      id: 24,
      name: "Irfan",
      role: "Operations Manager",
      status: "Active",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: 25,
      name: "Sana",
      role: "Research Analyst",
      status: "Paused",
      actions: "",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Active") return "success"; // Green
    if (status === "Paused") return "danger"; // Red
    if (status === "Vacation") return "warning"; // Yellow
    return "default"; // Fallback
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full flex flex-row justify-end">
        <Button>Add User</Button>
        <SearchBar /></div>
      
      <Table className="shadow-lg rounded-lg w-full">
        <TableHeader className="font-bold w-screen ">
          <TableColumn className="font-bold text-white bg-secondary ">
            ID
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary">
            Avatar
          </TableColumn>
          <TableColumn className="font-bold text-white bg-secondary ">
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
              <TableCell>{user.avatar}</TableCell>
              <TableCell className="font-sans">{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip color={getStatusColor(user.status)}>{user.status}</Chip>
              </TableCell>
              <TableCell>{user.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
