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
import { useState, useMemo } from "react";
import { trainers } from "./data/trainers";

// Tasks:
// 7. Switch to Cursor
export default function Home() {
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value.trimStart());
  };

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  // Extract unique expertise and certifications
  const expertise = Array.from(
    new Set(
      trainers.flatMap((trainer) =>
        trainer.trainingExpertise.map((exp) => exp.name)
      )
    )
  );

  const certifications = Array.from(
    new Set(
      trainers.flatMap((trainer) =>
        trainer.certifications.map((cert) => cert.certificationName)
      )
    )
  );

  // Function to filter trainers based on selected filters & search term, current issue is search if you type omer customer also falls into omer
  const getFilteredTrainers = () => {
    let filtered = [...trainers];

    if (selectedExpertise) {
      //first it goes thruogh the expertise to see if its null or not, if it is then it wont change filtered array
      filtered = filtered.filter((trainer) =>
        trainer.trainingExpertise.some((expertise) =>
          expertise.name.includes(selectedExpertise)
        )
      );
    }

    //this now checks through the modified array of just 10 trainers who have 'Quality' in their expertise
    if (selectedCertification) {
      //same as expertise logic, it only filters if certification exists and is found
      filtered = filtered.filter((trainer) =>
        trainer.certifications.some((certification) =>
          certification.certificationName.includes(selectedCertification)
        )
      );
    }

    //now trainers is narrowed down to 4 trainers in the array
    if (search.trim() !== "") {
      //need to make trim more efficient so empty space cant be entered period
      const searchLower = search.toLowerCase();

      filtered = filtered.filter((trainer) => {
        //filter applies on all 4 trainers. filter parameter is if search term exists in any of the other columns, it returns true for them and keeps them in the array
        return (
          `${trainer.firstName} ${trainer.lastName}`
            .toLowerCase()
            .includes(searchLower) ||
          trainer.professionalProfile?.toLowerCase().includes(searchLower) ||
          trainer.city?.toLowerCase().includes(searchLower) ||
          trainer.education.some((edu) =>
            `${edu.degreeType} ${edu.institution} ${edu.fieldOfStudy}`
              .toLowerCase()
              .includes(searchLower)
          ) ||
          trainer.certifications.some((cert) =>
            `${cert.certificationName} ${cert.issuingOrganization}`
              .toLowerCase()
              .includes(searchLower)
          ) ||
          trainer.workExperience.some((exp) =>
            `${exp.position} ${exp.organization}`
              .toLowerCase()
              .includes(searchLower)
          ) ||
          trainer.trainingExpertise.some((exp) =>
            `${exp.name} ${exp.otherInformation || ""}`
              .toLowerCase()
              .includes(searchLower)
          ) ||
          trainer.trainingMethods.some((method) =>
            `${method.name} ${method.otherInformation || ""}`
              .toLowerCase()
              .includes(searchLower)
          )
        );
      });
    }

    return filtered;
  } 

  return (
    <div className="flex flex-col min-h-screen max-w-screen bg-white lg:overflow-x-hidden lg:overflow-y-hidden ">
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
            <div> Total: {getFilteredTrainers.length} {getFilteredTrainers.length ===1 ? "user": "users"} </div>
          </div>
        </div>

        <Table
          isHeaderSticky
          isStriped
          className="w-full table-fixed overflow-y-visible "
        >
          <TableHeader className="w-screen text-md bg-white">
            <TableColumn className="text-left text-gray-600 bg-gray-200 font-medium text-md pr-4">
              {" "}
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
              <Dropdown>
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
                  {certifications.map((cert, idx) => (
                    <DropdownItem
                      key={idx}
                      onClick={() =>
                        setSelectedCertification(
                          selectedCertification === cert ? null : cert
                        )
                      }
                    >
                      {cert}
                    </DropdownItem>
                  ))}
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
            {getFilteredTrainers().map((trainer, index) => (
              <TableRow
                data-hover
                className="text-gray-700 hover:bg-blue-200 odd:bg-white even:bg-gray-100"
                key={index}
              >
                <TableCell className="text-left border-gray-200">
                  <div
                    onClick={() => toggleRow(index)}
                    className="cursor-pointer flex items gap-2 text-gray-700 hover:text-blue-600 transition duration-200"
                  >
                    <ChevronDown
                      className={`transition-transform duration-300 ${
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
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      expandedRow === index
                        ? "max-h-[400px] opacity-100 translate-y-0"
                        : "max-h-12 opacity-100 translate-y-0"
                    }`}
                  >
                    {expandedRow === index ? (
                      <p className="text-gray-600">
                        {trainer.professionalProfile}
                      </p>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="font-medium line-clamp-1">
                          {trainer.professionalProfile}
                        </span>
                        <ChevronDown
                          className={`transition-transform duration-300 ${
                            expandedRow === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Education */}
                <TableCell className="text-left px-4 border-gray-200">
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      expandedRow === index
                        ? "max-h-[400px] opacity-100 translate-y-0"
                        : "max-h-[4.5rem] opacity-100 translate-y-0"
                    }`}
                  >
                    <ul>
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
                  </div>
                </TableCell>

                {/* Certifications */}
                <TableCell className="text-left border-gray-200">
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      expandedRow === index
                        ? "max-h-[400px] opacity-100 translate-y-0"
                        : "max-h-[4.5rem] opacity-100 translate-y-0"
                    }`}
                  >
                    <ul>
                      {expandedRow === index
                        ? trainer.certifications.map((cert, idx) => (
                            <li
                              className="flex items-center gap-2 py-1"
                              key={idx}
                            >
                              <BadgeCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-gray-600" />
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
                        : trainer.certifications
                            .slice(0, 2)
                            .map((cert, idx) => (
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
                  </div>
                </TableCell>

                {/* Training Expertise */}
                <TableCell className="text-left px-4 border-gray-200">
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      expandedRow === index
                        ? "max-h-[400px] opacity-100 translate-y-0"
                        : "max-h-[4.5rem] opacity-100 translate-y-0"
                    }`}
                  >
                    <ul>
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
                  </div>
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
