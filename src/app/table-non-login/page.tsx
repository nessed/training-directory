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
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Tasks:
// 7. Switch to Cursor
export default function Home() {
  
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null);
  const [trainers, setTrainers] = useState<FormattedTrainer[]>([]);

  useEffect(() => { //useEffect used so that the data only makes a call to supabase on the first render rather than everytime theres a re render in the app. the dependency array is empty because we dont want it to re call async in general just once in the start
    const supabase = createBrowserClient(  //supabase client is created with the url and anon key
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const fetchData = async () => {
      setLoading(true); //loading state is set to true so that the skeleton loaders are shown as soon as async is called before await
      //using sql type code to select all columns from the trainers table in the supabase db, their linked to trainers cuz thats the master table await just waits for the data to be fetched from supabase 
      //data, error is just two values that can be for this function, data is the data fetched from the db and error is the error if there is one
      const { data, error } = await supabase.from("trainers").select(` 
        *,
        education (*), 
        training_expertise (*),
        training_methods (*),
        work_experience (*),
        certifications (*)
      `).limit(30); //we're using the exact names we used in the supabase db so that we can map the data to the correct keys in the object * means call all columns
      if (error) {
        console.error("Supabase error:", error);
      } else { //formatted assigns local values to data from the db 
        const formatted = data.map((trainer: Trainer) => ({
          ...trainer,
          firstName: trainer.first_name,
          lastName: trainer.last_name,
          professionalProfile: trainer.professional_profile,
          linkedinUrl: trainer.linkedin_url, 
          education:
            trainer.education?.map((edu: Education) => ({
              degreeType: edu.degree_type,
              institution: edu.institution,
              fieldOfStudy: edu.field_of_study,
              country: edu.country,
            })) || [],

          workExperience:
            trainer.work_experience?.map((work: WorkExperience) => ({
              position: work.position,
              organization: work.organization,
              dateStart: work.date_start,
              dateEnd: work.date_end,
              yearsOfExperience: work.years_of_experience,
            })) || [],

          trainingExpertise:
            trainer.training_expertise?.map((exp: TrainingExpertise) => ({
              name: exp.name,
              otherInformation: exp.other_information,
            })) || [],

          trainingMethods:
            trainer.training_methods?.map((method: TrainingMethod) => ({
              name: method.name,
              otherInformation: method.other_information,
            })) || [],

          certifications:
            trainer.certifications?.map((cert: Certification) => ({
              certificationName: cert.certification_name,
              issuingOrganization: cert.issuing_organization,
            })) || [],
        }));

        setTrainers(formatted);
      }
      setLoading(false); 
    };

    fetchData();
  }, []);
console.log(trainers)

  const handleSearch = (e: any) => {
    setSearch(e.target.value.trimStart());
  };

  const toggleRow = (index: number | null) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 text-gray-800">
      <div className="flex flex-col justify-between gap-2 px-10 p-2">
        <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border-blue-100 mb-6">
          <div className="flex flex-wrap justify-between gap-0 items-center">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={handleSearch}
              size="lg"
              startContent={<Search className="text-blue-600" size={16} />}
              className="rounded-full text-xl w-full md:w-6/12 focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-wrap gap-2 justify-end">
              {/* Status Dropdown */}
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

              {/* Columns Dropdown */}
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

              {/* Add User */}
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
        </div>
        
        <div className="h-[calc(100vh-200px)] overflow-y-auto w-full">
          <Table isStriped isHeaderSticky removeWrapper className="min-w-full">
            <TableHeader className="sticky bg-blue-100 shadow-sm rounded-t-xl">
              <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4">
                {" "}
              </TableColumn>
              <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
                ID
              </TableColumn>
              <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
                Trainer
              </TableColumn>
              <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
                EDUCATION
              </TableColumn>
              <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      size="lg"
                      className="text-blue-800 bg-blue-200 font-medium text-md"
                    >
                      CERTIFICATIONS
                      <ChevronDown className="text-indigo-500" size={100} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu className="text-blue-800 max-h-32 overflow-y-auto">
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
              <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-4 w-1/4">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      size="lg"
                      className="text-blue-800 bg-blue-200 font-medium text-md"
                    >
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
              <TableColumn className="text-left text-blue-800 bg-blue-200 font-medium text-md pr-16 w-1/4">
                TRAINING METHODS
              </TableColumn>
            </TableHeader>

             <TableBody //empty content is a prop by nextui that renders an empty row value and we have conditionally rendered its value to be undefined if loading is true
              emptyContent={loading ? undefined : "No rows to display."}>
              {loading //if loading state is true then show skeleton loaders
                ? [...Array(5)].map((_, index) => ( //first an empty array of 5 undefined elements is generated, then it is spread out to be turned to 5 arrays. these arrays serve as the number of rows the table cells below will appear
                   //underscore is a placeholder for the current element in the array, index is the index of the current element
                   <TableRow key={index} className="border-b border-blue-200">
                      <TableCell>
                        <Skeleton circle width={24} height={24} />
                      </TableCell>
                      <TableCell>
                        <Skeleton count={1} height={22} />
                      </TableCell>
                      <TableCell>
                        <Skeleton count={1} height={22} />
                      </TableCell>
                      <TableCell>
                        <Skeleton count={2} height={12} />
                      </TableCell>
                      <TableCell>
                        <Skeleton count={2} height={12} />
                      </TableCell>
                      <TableCell>
                        <Skeleton count={2} height={12} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-3">
                          <Skeleton circle width={20} height={20} />
                          <Skeleton circle width={20} height={20} />
                        </div>
                      </TableCell>
                    </TableRow> ))
                :  getFilteredTrainers().map((trainer, index) => ( //else if loading it renders the other version of rows 
                    <TableRow
                      data-hover
                      key={index}
                      className={`text-blue-900 hover:bg-blue-50 odd:bg-white even:bg-slate-50 border-b border-blue-200 animate-fade-in ${
                        index > 20 ? "blur-sm pointer-events-none select-none" : ""
                      }`}                  

                    >
                        
                      <TableCell className="text-left border-blue-200">
                        <div
                          onClick={() => toggleRow(index)}
                          className="cursor-pointer flex items gap-2 text-blue-800 hover:text-blue-600 transition duration-200"
                        >
                          <ChevronDown
                            className={`transition-transform duration-300 ${expandedRow === index ? "rotate-180" : ""}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-left border-blue-200">
                        <div
                          className="cursor-pointer flex gap-2 text-blue-800 hover:text-blue-600 transition duration-200"
                        >
                          {index + 1}
                        </div>
                      </TableCell>

                      <TableCell className="text-left px-4 border-blue-200">
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            className="rounded-lg"
                            src={trainer.image || avatar}
                            alt="Avatar"
                            width={50}
                            height={50}
                          />
                          <div className="flex flex-col font-semibold ">
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
                          <div
                          className={`transition-all duration-500 ease-in-out  ${
                            expandedRow === index
                              ? "max-h-[400px] opacity-100 translate-y-0"
                              : "max-h-12 opacity-100 translate-y-0"
                          }`}
                        >
                          {expandedRow === index ? (
                            <p className="text-slate-600">
                              {trainer.professionalProfile}
                            </p>
                          ) : (
                            <div className="flex items-center gap-2 text-slate-600 font-medium">
                              <span className=" line-clamp-3">
                                {trainer.professionalProfile}
                              </span>
                              <ChevronDown
                                className={`transition-transform duration-300 ${expandedRow === index ? "rotate-180" : ""}`}
                              />
                            </div>
                          )}
                        </div>
                        </div>
                      </TableCell>

                    

                      <TableCell className="text-left px-4 border-blue-200 border-r border-l border-blue-100 pr-4">
                        <ul>
                          {(expandedRow === index
                            ? trainer.education
                            : trainer.education.slice(0, 2)
                          ).map((edu, idx) => (
                            <li className="flex gap-2 py-1" key={idx}>
                              <GraduationCap className="w-5 h-5 text-indigo-500" />
                              <span className="text-slate-600">
                                {edu.degreeType} {edu.fieldOfStudy}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </TableCell>

                      <TableCell className="text-left border-blue-200 border-r border-blue-100 pr-4">
                        <ul>
                          {(expandedRow === index
                            ? trainer.certifications
                            : trainer.certifications.slice(0, 2)
                          ).map((cert, idx) => (
                            <li
                              className="flex items-center gap-2 py-1"
                              key={idx}
                            >
                              <BadgeCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-indigo-500" />
                              <span className="flex-grow">
                                {cert.certificationName}
                              </span>
                              {cert.issuingOrganization && (
                                <span className="ml-1 text-blue-600">
                                  - {cert.issuingOrganization}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </TableCell>

                      <TableCell className="text-left px-4 border-blue-200 border-r border-blue-100 pr-4">
                        <ul>
                          {(expandedRow === index
                            ? trainer.trainingExpertise
                            : trainer.trainingExpertise.slice(0, 2)
                          ).map((expertise, idx) => (
                            <li className="flex gap-2 py-1" key={idx}>
                              <ClipboardCheck className="max-w-5 max-h-5 min-w-5 min-h-5 text-indigo-500" />
                              <span>{expertise.name}</span>
                              {expertise.otherInformation && (
                                <span>: {expertise.otherInformation}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </TableCell>

                      <TableCell className="text-left px-4 border-blue-200 align-middle">
                        <div className="flex gap-2 justify-start">
                          {trainer.trainingMethods.map((method, idx) => (
                            <Tooltip
                              key={idx}
                              content={<span>{method.name}</span>}
                              placement="top"
                            >
                              <span>
                                {method.name.toLowerCase() === "in-person" ? (
                                  <Building className="w-5 h-5 text-indigo-500" />
                                ) : method.name.toLowerCase() === "online" ? (
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
