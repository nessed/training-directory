"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import {Chip} from "@heroui/chip";


export default function Home() {
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
const getStatusColor = (status: string) => {
  if (status === "Active") return "success"; // Green
  if (status === "Paused") return "danger"; // Red
  if (status === "Vacation") return "warning"; // Yellow
  return "default"; // Fallback
};

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
              <TableCell><Chip color={getStatusColor(user.status)}>{user.status}</Chip></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
