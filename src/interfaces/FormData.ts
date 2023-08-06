import CourseExperience from "./CourseExperience";
import Education from "./Education";
import ProjectExperience from "./ProjectExperience";
import Skill from "./Skill";
import WorkExperience from "./WorkExperience";

export default interface FormData {
  description: string;
  name: string;
  email: string;
  birthplace: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  linkedinId: string;
  educations: Education[];
  workExperiences: WorkExperience[];
  courseExperiences: CourseExperience[];
  projectExperiences: ProjectExperience[];
  skills: Skill[];
}
