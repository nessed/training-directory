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
import { useState, useMemo, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

// Tasks:
// 7. Switch to Cursor
export default function Home() {
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null);

  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const fetchData = async () => {
      const { data, error } = await supabase.from("trainers").select(`
        *,
        education (*),
        training_expertise (*),
        training_methods (*),
        work_experience (*),
        certifications (*)
      `);
      

      if (error) {
        console.error("Supabase error:", error);
      } else {
        const formatted = data.map((trainer) => ({
          ...trainer,
          firstName: trainer.first_name,
          lastName: trainer.last_name,
          professionalProfile: trainer.professional_profile,
          linkedinUrl: trainer.linkedin_url,
        
          education: trainer.education?.map((edu) => ({
            degreeType: edu.degree_type,
            institution: edu.institution,
            fieldOfStudy: edu.field_of_study,
            country: edu.country,
          })) || [],
        
          workExperience: trainer.work_experience?.map((work) => ({
            position: work.position,
            organization: work.organization,
            dateStart: work.date_start,
            dateEnd: work.date_end,
            yearsOfExperience: work.years_of_experience,
          })) || [],
        
          trainingExpertise: trainer.training_expertise?.map((exp) => ({
            name: exp.name,
            otherInformation: exp.other_information,
          })) || [],
        
          trainingMethods: trainer.training_methods?.map((method) => ({
            name: method.name,
            otherInformation: method.other_information,
          })) || [],
        
          certifications: trainer.certifications?.map((cert) => ({
            certificationName: cert.certification_name,
            issuingOrganization: cert.issuing_organization,
          })) || [],
        }));        

        setTrainers(formatted);
      }
    };

    fetchData();
  }, []);

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
  };

  return (
    <div className="flex flex-col min-h-screen max-w-screen bg-gray-50 text-gray-800">
    <div className="flex flex-col justify-between gap-2 px-10 p-2">
      <div className="w-full flex flex-row justify-between gap-2 p-1">
        <div className="w-full flex">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={handleSearch}
            size="lg"
            startContent={<Search className="text-blue-600" size={16} />}
            className="rounded-full text-xl w-8/12 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button size="lg" className="bg-blue-100 text-blue-800">
                Status
                <ChevronDown className="text-blue-600" size={100} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="active">Active</DropdownItem>
              <DropdownItem key="paused">Paused</DropdownItem>
              <DropdownItem key="vacation">Vacation</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button size="lg" className="bg-blue-100 text-blue-800">
                Columns
                <ChevronDown className="text-blue-600" size={100} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="id">ID</DropdownItem>
              <DropdownItem key="avatar">Avatar</DropdownItem>
              <DropdownItem key="name">Name</DropdownItem>
              <DropdownItem key="role">Role</DropdownItem>
              <DropdownItem key="status">Status</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button size="lg" className="bg-blue-600 text-white">
                Add User
                <Plus className="text-white" size={26} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="add-new">Add New User</DropdownItem>
              <DropdownItem key="import">Import Users</DropdownItem>
              <DropdownItem key="export">Export Users</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

        <div className="flex flex-row justify-between gap-2 text-gray-400 font-light p-2 ">
          <div className="flex flex-row ">
            <div>
              {" "}
              Total: {getFilteredTrainers().length}{" "}
              {getFilteredTrainers.length === 1 ? "user" : "users"}{" "}
            </div>
          </div>
        </div>

        <Table
  isHeaderSticky
  isStriped
  className="w-full table-fixed overflow-y-visible"
>
  <TableHeader className="w-screen text-md bg-blue-100">
    <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4"> </TableColumn>
    <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
      FULL NAME-{selectedExpertise}
    </TableColumn>
    <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
      PROFILE
    </TableColumn>
    <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
      EDUCATION
    </TableColumn>
    <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
      <Dropdown>
        <DropdownTrigger>
          <Button size="lg" className="text-blue-800 bg-blue-200 font-medium text-md">
            CERTIFICATIONS
            <ChevronDown className="text-indigo-500" size={100} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="text-blue-800 max-h-32 overflow-y-auto">
          {certifications.map((cert, idx) => (
            <DropdownItem key={idx} onClick={() => setSelectedCertification(selectedCertification === cert ? null : cert)}>
              {cert}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </TableColumn>
    <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
      <Dropdown>
        <DropdownTrigger>
          <Button size="lg" className="text-blue-800 bg-blue-200 font-medium text-md">
            EXPERTISE
            {selectedExpertise && (
              <Button
                size="sm"
                onClick={() => setSelectedExpertise(null)}
                className="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 focus:ring-2 focus:ring-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 shadow-md"
              >
                <X />
              </Button>
            )}
            <ChevronDown className="text-indigo-500" size={100} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="text-blue-800 max-h-32 overflow-y-auto">
          {expertise.map((expertise, idx) => (
            <DropdownItem key={idx} onClick={() => setSelectedExpertise(expertise)}>
              {expertise}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </TableColumn>
    <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-16 w-1/4">
      TRAINING METHODS
    </TableColumn>
  </TableHeader>

  <TableBody emptyContent="No rows to display.">
    {getFilteredTrainers().map((trainer, index) => (
      <TableRow
        data-hover
        className="text-blue-900 hover:bg-blue-50 odd:bg-white even:bg-slate-50 border-b border-blue-200"
        key={index}
      >
        <TableCell className="text-left border-blue-200 text-slate-600">
          <div
            onClick={() => toggleRow(index)}
            className="cursor-pointer flex items gap-2 text-slate-600 hover:text-blue-600 transition duration-200"
          >
            <ChevronDown className={`transition-transform duration-300 ${expandedRow === index ? 'rotate-180' : ''}`} />
          </div>
        </TableCell>

        <TableCell className="text-left font-semibold px-4 border-blue-200">
          <div className="flex flex-row items-center gap-2">
            <Image className="rounded-lg" src={trainer.image || avatar} alt="Avatar" width={50} height={50} />
            <div className="flex flex-col">
              {trainer.firstName} {trainer.lastName}
              {expandedRow === index && trainer.linkedinUrl && (
                <div className="flex items-center gap-2">
                  <a
                    href={trainer.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5 text-indigo-500" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </TableCell>

        <TableCell className="text-left px-4 border-blue-200 relative py-2">
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              expandedRow === index ? 'max-h-[400px] opacity-100 translate-y-0' : 'max-h-12 opacity-100 translate-y-0'
            }`}
          >
            {expandedRow === index ? (
              <p className="text-blue-700">{trainer.professionalProfile}</p>
            ) : (
              <div className="flex items-center gap-2 text-blue-800">
                <span className="font-medium line-clamp-1">{trainer.professionalProfile}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${expandedRow === index ? 'rotate-180' : ''}`}
                />
              </div>
            )}
          </div>
        </TableCell>

        <TableCell className="text-left px-4 border-blue-200">
          <ul>
            {(expandedRow === index ? trainer.education : trainer.education.slice(0, 2)).map((edu, idx) => (
              <li className="flex gap-2 py-1" key={idx}>
                <GraduationCap className="w-5 h-5 text-indigo-500" />
                <span className="text-slate-600">
                  {edu.degreeType} {edu.fieldOfStudy}
                </span>
              </li>
            ))}
          </ul>
        </TableCell>

        <TableCell className="text-left border-blue-200">
          <ul>
            {(expandedRow === index ? trainer.certifications : trainer.certifications.slice(0, 2)).map((cert, idx) => (
              <li className="flex items-center gap-2 py-1" key={idx}>
                <BadgeCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-indigo-500" />
                <span className="flex-grow">{cert.certificationName}</span>
                {cert.issuingOrganization && (
                  <span className="ml-1 text-blue-600">- {cert.issuingOrganization}</span>
                )}
              </li>
            ))}
          </ul>
        </TableCell>

        <TableCell className="text-left px-4 border-blue-200">
          <ul>
            {(expandedRow === index ? trainer.trainingExpertise : trainer.trainingExpertise.slice(0, 2)).map(
              (expertise, idx) => (
                <li className="flex gap-2 py-1" key={idx}>
                  <ClipboardCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-indigo-500" />
                  <span>{expertise.name}</span>
                  {expertise.otherInformation && <span>: {expertise.otherInformation}</span>}
                </li>
              )
            )}
          </ul>
        </TableCell>

        <TableCell className="text-left px-4 border-blue-200 align-middle">
          <div className="flex gap-2 justify-start">
            {trainer.trainingMethods.map((method, idx) => (
              <Tooltip key={idx} content={<span>{method.name}</span>} placement="top">
                <span>
                  {method.name.toLowerCase() === 'in-person' ? (
                    <Building className="w-5 h-5 text-indigo-500" />
                  ) : method.name.toLowerCase() === 'online' ? (
                    <Monitor className="w-5 h-5 text-indigo-500" />
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
