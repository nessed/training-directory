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
import trainersData from "./data/trainers.json";

export default function Home() {
  // Apply 'as const' to ensure type safety and auto-completion
  const trainers = trainersData 

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
      <div className="flex flex-row justify-between gap-2 text-gray-600 p-2">
        <div className="flex flex-row gap-1">
          <div>Total:</div>
          <div>{trainers.trainers.length} users</div>
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
      <Table className="shadow-lg rounded-lg w-full table-fixed">
        <TableHeader className="font-bold w-screen">
          <TableColumn className="text-center font-bold text-white bg-secondary">
            First Name
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            Last Name
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            Gender
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            Title
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            Profile
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            Education
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            Certifications
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            Training Expertise
          </TableColumn>
          <TableColumn className="text-center font-bold text-white bg-secondary">
            Training Methods
          </TableColumn>
        </TableHeader>
        <TableBody>
          {trainers.trainers.map((trainer, index) => (
            <TableRow
              className="text-gray-700 border-b border-opacity-100"
              key={index}
            >
              <TableCell className="text-center">{trainer.firstName} </TableCell>
              <TableCell className="text-center">{trainer.lastName}</TableCell>
              <TableCell className="text-center">{trainer.gender}</TableCell>
              <TableCell className="text-center">{trainer.title}</TableCell>
              <TableCell className="text-center">
                {trainer.professionalProfile}
              </TableCell>
               <TableCell className="text-center">
                <ul>
                  {trainer.education.map((edu, idx) => (
                    <li key={idx}>
                      {edu.degreeType}{" "}
                      {edu.fieldOfStudy}
                    </li>
                  ))}
                </ul>
              </TableCell>

               <TableCell className="text-center">
                <ul>
                  {trainer.certifications.map((cert, idx) => (
                    <li key={idx}>
                      {cert.certificationName} - {cert.issuingOrganization}
                    </li>
                  ))}
                </ul>
              </TableCell>

              {/* Training Expertise: Display as bullet points */}
              <TableCell className="text-center">
                <ul>
                  {trainer.trainingExpertise.map((expertise, idx) => (
                    <li key={idx}>
                      {expertise.name}: {expertise.otherInformation}
                    </li>
                  ))}
                </ul>
              </TableCell>

              {/* Training Methods: Display as bullet points */}
              <TableCell className="text-center">
                <ul>
                  {trainer.trainingMethods.map((method, idx) => (
                    <li key={idx}>{method.name}</li>
                  ))}
                </ul>
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
