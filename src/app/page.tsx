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
  Linkedin,
  X,
} from "lucide-react";
import { Plus } from "lucide-react";
import trainersData from "./data/trainers.json";
import Image from "next/image";
import avatar from "@/public/profilepicdefault.png";
import { useState } from "react";

export default function Home() {
  // main array that contains all trainer data imported from the json file
  const trainers = trainersData;
  const [selectedExpertise, setSelectedExpertise] = useState(null);

  // filteration by expertise
  const expertise = trainers.trainers.map(
    (trainer) => trainer.trainingExpertise.map((expertise) => expertise.name) //contains all the expertise of all trainers, unduplicated
  );
  const expertiseUnique = [...new Set(expertise.flat())]; //deduping expertise array by first turning expertise flat so all expertise are in one array, then using set to make unique, then spreading to turn to an array

  const filteredByExpertise = selectedExpertise
    ? trainers.trainers.filter((trainer) =>
        trainer.trainingExpertise.some(
          (expertise) => expertise.name === selectedExpertise
        )
      )
    : trainers.trainers;

  //Search bar logic
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase()); //ensures the data entered in search is entered in lowercase only
  };

  const searchedResults = filteredByExpertise.filter(
    (trainer) =>
      // Check full name
      `${trainer.firstName} ${trainer.lastName}`
        .toLowerCase()
        .includes(search) ||
      trainer.gender.toLowerCase().includes(search) ||
      trainer.professionalProfile.toLowerCase().includes(search) ||
      trainer.education.some((edu) =>
        `${edu.degreeType} ${edu.fieldOfStudy}`.toLowerCase().includes(search)
      ) ||
      trainer.certifications.some((cert) =>
        `${cert.certificationName} ${cert.issuingOrganization}`
          .toLowerCase()
          .includes(search)
      ) ||
      trainer.trainingExpertise.some((expertise) =>
        expertise.name.toLowerCase().includes(search)
      ) ||
      trainer.trainingMethods.some((method) =>
        method.name.toLowerCase().includes(search)
      )
  );

  //final array to be rendered to table
  const trainersToDisplay = search ? searchedResults : filteredByExpertise; //if search has a value, it will display the searched results, else it will display the filtered results which contains either trainers full or filtered set

  return (
    <div className="flex flex-col min-h-screen max-w-screen bg-white lg:overflow-x-hidden lg:overflow-y-hidden ">
      <div className="text-white"> HELLO </div>
      // & Search bar with icon
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
            <div> WIP users</div>
          </div>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" size="sm" className="font-semibold">
                  wip <ChevronDown className="text-gray-500" size={16} />
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
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-2">
              FULL NAME-{selectedExpertise}
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
                  <DropdownItem className="" key="active">
                    Active
                  </DropdownItem>
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
                    {selectedExpertise && (
                      <Button
                       size="sm"
                        onClick={() => setSelectedExpertise(null)}
                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-300 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 shadow-md"
                      >
                        <X/>
                      </Button>
                    )}
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
            {trainersToDisplay.map((trainer, index) => (
              <TableRow
                data-hover
                className="text-gray-700 hover:bg-blue-200 hover:cursor-pointer odd:bg-white even:bg-gray-100"
                key={index}
              >
                {/* Full Name */}
                <TableCell className="text-left font-semibold px-4 border-gray-200">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      className="rounded-lg"
                      src={avatar}
                      alt="Avatar"
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col">
                      {trainer.firstName} {trainer.lastName}
                      {/* LinkedIn URL and icon */}
                      {trainer.linkedinUrl && (
                        <div className="flex items-center gap-2">
                          {/* LinkedIn icon inside a gray circle */}
                          <a
                            href={trainer.linkedinUrl}
                            target="_blank"
                            className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full"
                          >
                            <Linkedin className="w-5 h-5 text-white" />
                          </a>

                          {/* LinkedIn URL */}
                          <a
                            href={trainer.linkedinUrl}
                            target="_blank"
                            className="font-medium text-gray-500 line-clamp-1"
                          >
                            {trainer.linkedinUrl}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
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
                    {trainer.trainingExpertise.map((expertise, idx) => (
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
