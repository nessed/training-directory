"use client";
import avatar from "@/public/profilepicdefault.png";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import {
  BadgeCheck,
  Building,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  Monitor,
  Search,
  X,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { trainers } from "./data/trainers";

// Tasks:
// 1. Combine filteredByExpertise and searchedResults into a search function
// 5. Show total users on top left instead of WIP
// 7. Switch to Cursor
export default function Home() {
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  //contains all the expertise of all trainers, unduplicated
  const expertise = Array.from(
    new Set(
      trainers.flatMap((trainer) =>
        trainer.trainingExpertise.map((expertise) => expertise.name)
      )
    )
  );

  const filteredByExpertise = selectedExpertise
    ? trainers.filter((trainer) =>
        trainer.trainingExpertise.some(
          (expertise) => expertise.name === selectedExpertise
        )
      )
    : trainers;

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase()); //ensures the data entered in search is entered in lowercase only
  };

  //checks searchedResults array for any matches with the search value
  const searchedResults = filteredByExpertise.filter(
    (trainer) =>
      `${trainer.firstName} ${trainer.lastName}`
        .toLowerCase()
        .includes(search) ||
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
      <div className="text-white"> HELLO</div>
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
            <div>Total:</div>
            <div> WIP users</div>
          </div>
        </div>

        <Table
          isHeaderSticky
          isStriped
          className="w-full table-fixed overflow-y-visible "
        >
          <TableHeader className="w-screen text-md bg-white">
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-4">
            </TableColumn>
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-4 w-1/4">
              FULL NAME-{selectedExpertise}
            </TableColumn>

            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-4 w-1/4">
              PROFILE
            </TableColumn>

            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-4 w-1/4">
              EDUCATION
            </TableColumn>

            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-4 w-1/4">
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

            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-4 w-1/4">
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
                        <X />
                      </Button>
                    )}
                    <ChevronDown className="text-gray-500" size={100} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="text-gray-700 max-h-32 overflow-y-auto">
                  {expertise.map((expertise, idx) => (
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

            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-16 w-1/4">
              TRAINING METHODS
            </TableColumn>
          </TableHeader>

          <TableBody emptyContent={"No rows to display."}>
            {trainersToDisplay.map((trainer, index) => (
              <TableRow
                data-hover
                className="text-gray-700 hover:bg-blue-200 odd:bg-white even:bg-gray-100"
                key={index}
              >
                {/* Expand Row */}
                <TableCell className="text-left border-gray-200">
                  <div
                    onClick={() => toggleRow(index)}
                    className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-600 transition duration-200"
                  >
                    <ChevronDown
                      className={`transition-transform duration-200 ${
                        expandedRow === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </TableCell>

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
                      {expandedRow === index && trainer.linkedinUrl && (
                        <div className="flex items-center gap-2">
                          <a
                            href={trainer.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-600 hover:text-blue-800 transition-colors"
                          >
                            <FaLinkedin className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Profile */}
                <TableCell className="text-left px-4 border-gray-200 relative py-2">
                  {/* Collapsed Profile (One-Line Clamped) */}
                  {expandedRow !== index && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-medium line-clamp-1">
                        {trainer.professionalProfile}
                      </span>
                      <ChevronDown
                        className={`transition-transform duration-1000 ${
                          expandedRow === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  )}

                  {/* Expanded Profile (Full Text) */}
                  {expandedRow === index && (
                    <div className="max-h-full opacity-100 py-2 visible">
                      <p className="text-gray-600">
                        {trainer.professionalProfile}
                      </p>
                    </div>
                  )}
                </TableCell>

                {/* Education */}
                <TableCell className="text-left px-4 border-gray-200">
                  <ul>
                    {/* Slice logic for collapsed vs expanded */}
                    {expandedRow === index
                      ? trainer.education.map((edu, idx) => (
                          <li className="flex gap-2 py-1" key={idx}>
                            <GraduationCap className="w-5 h-5 text-gray-600" />
                            <span>
                              {edu.degreeType} {edu.fieldOfStudy}
                            </span>
                          </li>
                        ))
                      : trainer.education.slice(0, 2).map((edu, idx) => (
                          <li className="flex gap-2 py-1" key={idx}>
                            <GraduationCap className="w-5 h-5 text-gray-600" />
                            <span>
                              {edu.degreeType} {edu.fieldOfStudy}
                            </span>
                          </li>
                        ))}
                  </ul>
                </TableCell>

                {/* Certifications */}
                <TableCell className="text-left border-gray-200">
                  <ul>
                    {/* Slice logic for collapsed vs expanded */}
                    {expandedRow === index
                      ? trainer.certifications.map((cert, idx) => (
                          <li
                            className="flex items-center gap-2 py-1"
                            key={idx}
                          >
                            <BadgeCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-gray-900" />
                            <span className="flex-grow">
                              {cert.certificationName}
                            </span>
                            {cert.issuingOrganization && (
                              <span className="ml-1 text-gray-500">
                                - {cert.issuingOrganization}
                              </span>
                            )}
                          </li>
                        ))
                      : trainer.certifications.slice(0, 2).map((cert, idx) => (
                          <li
                            className="flex items-center gap-2 py-1"
                            key={idx}
                          >
                            <BadgeCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-gray-600" />
                            <span className="flex-grow">
                              {cert.certificationName}
                            </span>
                          </li>
                        ))}
                  </ul>
                </TableCell>

                {/* Training Expertise */}
                <TableCell className="text-left px-4 border-gray-200">
                  <ul>
                    {/* Slice logic for collapsed vs expanded */}
                    {expandedRow === index
                      ? trainer.trainingExpertise.map((expertise, idx) => (
                          <li className="flex gap-2 py-1" key={idx}>
                            <ClipboardCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-gray-600" />
                            <span>{expertise.name}</span>
                            {expertise.otherInformation && (
                              <span>: {expertise.otherInformation}</span>
                            )}
                          </li>
                        ))
                      : trainer.trainingExpertise
                          .slice(0, 2)
                          .map((expertise, idx) => (
                            <li className="flex gap-2 py-1" key={idx}>
                              <ClipboardCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-gray-600" />
                              <span>{expertise.name}</span>
                            </li>
                          ))}
                  </ul>
                </TableCell>

                {/* Training Methods */}
                <TableCell className="text-left px-4 border-gray-200 align-middle">
                  <div className="flex gap-2 justify-start">
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
