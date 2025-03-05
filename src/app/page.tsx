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
  Tooltip,
} from "@heroui/react";
import {
  ChevronDown,
  Search,
  Building,
  Monitor,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Plus } from "lucide-react";
import trainersData from "./data/trainers.json";
import Image from "next/image";
import avatar from "@/public/profilepicdefault.png";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleRowsPerPageChange = (newValue) => {
    setRowsPerPage(newValue);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  //array: main array that contains all trainer data imported from the json file
  const trainers = trainersData;

  //revise
  const filteredTrainers = trainers.trainers.filter((trainer) =>
    `${trainer.firstName} ${trainer.lastName}`.toLowerCase().includes(search)
  );

  //revise

  const displayedTrainers = filteredTrainers.slice(0, rowsPerPage);

  //this contains the value for the expertise user chooses to filter by from the dropdown
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  //array: goes through the trainers main array and then goes through the trainingExpertise array to get the name of all expertise (with duplicates)
  const expertise = trainers.trainers.map((trainer) =>
    trainer.trainingExpertise.map((expertise) => expertise.name)
  );

  //array: removes duplicates from the expertise array by spreading the expertise array into a new set and then spreading that set into a new array
  const expertiseUnique = [...new Set(expertise.flat())];

  const selectedExpertiseFiltered = selectedExpertise
    ? trainers.trainers.filter((trainer) =>
        trainer.trainingExpertise.some(
          (expertise) => expertise.name === selectedExpertise
        )
      )
    : trainers.trainers;

  return (
    <div className="flex flex-col min-h-screen max-w-screen bg-white lg:overflow-x-hidden lg:overflow-y-hidden ">
      <div className="text-white"> HELLO </div>
      {/* Search bar with icon */}
      <div className="flex flex-col justify-between gap-2 px-10 p-2">
        <div className="w-full flex flex-row justify-between gap-2 p-1">
          <div className="w-full flex">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={handleSearch}
              size={"lg"}
              startContent={<Search className="text-gray-900" size={16} />}
              className="rounded-lg focus:ring-2 text-xl focus:ring-blue-500 rounded-full w-8/12" // Set width to half
            />
          </div>
 
          <div className="flex items-center gap-2">
            {/* Status dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  size={"lg"}
                  className="font- flex items-center bg-gray-200 shadow-md gap-2"
                >
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
                <Button
                  size={"lg"}
                  className="font- flex items-center gap-2 bg-gray-200 shadow-md gap-2"
                >
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
                <Button
                  size={"lg"}
                  className="bg-blue-600 text-white font- flex items-center justify-center shadow-lg gap-2"
                >
                  Add User
                  <Plus className="text-white" size={26} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="text-gray-700">
                <DropdownItem key="add-new">Add New User</DropdownItem>
                <DropdownItem key="import">Import Users</DropdownItem>
                <DropdownItem key="export">Export Users</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-2 text-gray-400 font-light p-2 ">
          <div className="flex flex-row ">
            <div>Total: </div>
            <div> {selectedExpertiseFiltered.length} users</div>
          </div>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" size="sm" className="font-semibold">
                  {rowsPerPage}
                  <ChevronDown className="text-gray-500" size={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="text-gray-700">
                <DropdownItem
                  key="5"
                  onClick={() => handleRowsPerPageChange(5)}
                >
                  5
                </DropdownItem>
                <DropdownItem
                  key="10"
                  onClick={() => handleRowsPerPageChange(10)}
                >
                  10
                </DropdownItem>
                <DropdownItem
                  key="15"
                  onClick={() => handleRowsPerPageChange(15)}
                >
                  15
                </DropdownItem>
                <DropdownItem
                  key="20"
                  onClick={() => handleRowsPerPageChange(20)}
                >
                  20
                </DropdownItem>
                <DropdownItem
                  key="30"
                  onClick={() => handleRowsPerPageChange(30)}
                >
                  30
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <Table
          isHeaderSticky
          isStriped
          className="w-full table-fixed overflow-y-visible "
        >
          <TableHeader className="w-screen text-md bg-white">
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md">
              AVATAR -{selectedExpertise}
            </TableColumn>
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-2">
              FULL NAME 
            </TableColumn>
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md">
              GENDER
            </TableColumn>
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md">
              PROFILE 
            </TableColumn>
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md">
              EDUCATION
            </TableColumn>
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md">
              <Dropdown className="">
                <DropdownTrigger>
                  <Button
                    size={"lg"}
                    className="text-left text-gray-600 bg-gray-200 font-medium text-md"
                  >
                    CERTIFICATIONS
                    <ChevronDown className="text-gray-500" size={100} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="text-gray-700 max-h-32 overflow-y-auto">
                  <DropdownItem className="" key="active">Active</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableColumn>
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size={"lg"}
                    className="text-left text-gray-600 bg-gray-200 font-medium text-md"
                  >
                    EXPERTISE
                    <ChevronDown className="text-gray-500" size={100} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="text-gray-700 max-h-32 overflow-y-auto">
                  {expertiseUnique.map((expertise, idx) => (
                    <DropdownItem
                      key={idx}
                      onClick={() => setSelectedExpertise(expertise)}
                    >
                      {expertise}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </TableColumn>
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md">
              TRAINING METHODS
            </TableColumn>
          </TableHeader>

          <TableBody emptyContent={"No rows to display."}>
            {selectedExpertiseFiltered.map((trainer, index) => (
              <TableRow
                data-hover
                className="text-gray-700 hover:bg-blue-200 hover:cursor-pointer odd:bg-white even:bg-gray-100"
                key={index}
              >
                {/* Avatar */}
                <TableCell className="text-left font-semibold px-4 border-gray-200 ">
                  <Image src={avatar} alt="Avatar" width={50} height={50} />
                </TableCell>

                {/* Full Name */}
                <TableCell className="text-left font-semibold px-4 border-gray-200">
                  {trainer.firstName} {trainer.lastName}
                </TableCell>

                {/* Gender */}
                <TableCell className="text-left px-4 border-gray-200">
                  {trainer.gender}
                </TableCell>

                {/* Profile */}
                <TableCell className="text-left px-4 border-gray-200">
                  <div className="text-gray-600 bline-clamp-2 pr-36">
                    {trainer.professionalProfile}
                  </div>
                </TableCell>

                {/* Education */}
                <TableCell className="text-left px-4 border-gray-200">
                  <ul className="">
                    {trainer.education.slice(0, 2).map((edu, idx) => (
                      <li key={idx}>
                        {edu.degreeType} {edu.fieldOfStudy}
                      </li>
                    ))}
                  </ul>
                </TableCell>

                {/* Certifications */}
                <TableCell className="text-left px-4 border-gray-200">
                  <ul className="">
                    {trainer.certifications.slice(0, 2).map((cert, idx) => (
                      <li key={idx}>
                        {cert.certificationName} - {cert.issuingOrganization}
                      </li>
                    ))}
                  </ul>
                </TableCell>

                {/* Training Expertise */}
                <TableCell className="text-left px-4 border-gray-200">
                  <ul className="">
                    {trainer.trainingExpertise
                      .slice(0, 2)
                      .map((expertise, idx) => (
                        <li key={idx}>
                          {expertise.name}
                          {expertise.otherInformation
                            ? `: ${expertise.otherInformation}`
                            : ""}
                        </li>
                      ))}
                  </ul>
                </TableCell>

                {/* Training Methods */}
                <TableCell className="text-left px-4 border-gray-200">
                  <div className="flex gap-2">
                    {trainer.trainingMethods.map((method, idx) => (
                      <Tooltip
                        className="text-black"
                        key={idx}
                        content={<span>{method.name}</span>}
                        placement="top"
                      >
                        <span>
                          {method.name.toLowerCase() === "in-person" ? (
                            <Building className="w-5 h-5 text-gray-600" />
                          ) : method.name.toLowerCase() === "online" ? (
                            <Monitor className="w-5 h-5 text-gray-600" />
                          ) : null}
                        </span>
                      </Tooltip>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
    </div>
  );
}
