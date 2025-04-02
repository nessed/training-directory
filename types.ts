
   type Education = {
    degree_type: string;
    institution: string;
    field_of_study: string;
    country: string;
  };
  
  type WorkExperience = {
    position: string;
    organization: string;
    date_start: string;
    date_end: string;
    years_of_experience: number;
  };
  
  type TrainingExpertise = {
    name: string;
    other_information: string;
  };
  
  type TrainingMethod = {
    name: string;
    other_information: string;
  };
  
  type Certification = {
    certification_name: string;
    issuing_organization: string;
  };
  
  type Trainer = {
    first_name: string;
    last_name: string;
    professional_profile: string;
    linkedin_url: string;
    education?: Education[];
    work_experience?: WorkExperience[];
    training_expertise?: TrainingExpertise[];
    training_methods?: TrainingMethod[];
    certifications?: Certification[];
  };
  type FormattedTrainer = {
    firstName: string;
    lastName: string;
    professionalProfile: string;
    linkedinUrl: string;
    city?: string;
    image?: string;
    education: {
      degreeType: string;
      institution: string;
      fieldOfStudy: string;
      country: string;
    }[];
    workExperience: {
      position: string;
      organization: string;
      dateStart: string;
      dateEnd: string;
      yearsOfExperience: number;
    }[];
    trainingExpertise: {
      name: string;
      otherInformation: string;
    }[];
    trainingMethods: {
      name: string;
      otherInformation: string;
    }[];
    certifications: {
      certificationName: string;
      issuingOrganization: string;
    }[];
  };
  