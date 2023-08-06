import { useState, FormEvent, ChangeEvent } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import TextInput from "./components/TextInput";
import EmailInput from "./components/EmailInput";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./config/moment";
import DateInput from "./components/DateInput";
import TextAreaInput from "./components/TextAreaInput";
import PhoneNumberInput from "./components/PhoneNumberInput";
import FormData from "./interfaces/FormData";
import WorkExperience from "./interfaces/WorkExperience";
import EditWorkExperienceForm from "./components/EditWorkExperienceForm";
import CreateWorkExperienceForm from "./components/CreateWorkExperienceForm";
import WorkExperienceItem from "./components/WorkExperienceItem";
import EducationItem from "./components/EducationItem";
import Education from "./interfaces/Education";
import CreateEducationForm from "./components/CreateEducationForm";
import EditEducationForm from "./components/EditEducationForm";
import CourseExperienceItem from "./components/CourseExperienceItem";
import CourseExperience from "./interfaces/CourseExperience";
import CreateCourseExperienceForm from "./components/CreateCourseExperienceForm";
import EditCourseExperienceForm from "./components/EditCourseExperienceForm";
import ProjectExperienceItem from "./components/ProjectExperienceItem";
import ProjectExperience from "./interfaces/ProjectExperience";
import CreateProjectExperienceForm from "./components/CreateProjectExperienceForm";
import EditProjectExperienceForm from "./components/EditProjectExperienceForm";
import SkillItem from "./components/SkillItem";
import Skill from "./interfaces/Skill";
import CreateSkillForm from "./components/CreateSkillForm";
import CurriculumVitae from "./components/CurriculumVitae";

function App() {
  // dipake semua
  const [formData, setFormData] = useState<FormData>({
    description: "",
    name: "",
    email: "",
    birthplace: "",
    birthdate: "",
    address: "",
    phoneNumber: "",
    linkedinId: "",
    educations: [],
    workExperiences: [],
    courseExperiences: [],
    projectExperiences: [],
    skills: [],
  });

  const [isDone, setIsDone] = useState(false);

  // const [isEditMode, setIsEditMode] = useState(false);
  // const [openedForm, setOpenedForm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDone(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleResetForm = () => {
    setFormData({
      description: "",
      name: "",
      email: "",
      birthplace: "",
      birthdate: "",
      address: "",
      phoneNumber: "",
      linkedinId: "",
      educations: [],
      workExperiences: [],
      courseExperiences: [],
      projectExperiences: [],
      skills: [],
    });
    setIsDone(false);
  };
  // work experiences
  const [workIndexToEdit, setWorkIndexToEdit] = useState<number | null>(null);
  const [isWorkFormOpen, setIsWorkFormOpen] = useState<boolean>(false);
  const addWorkExperience = (workExperience: WorkExperience) => {
    if (workExperience.stillWorkingHere === true) {
      workExperience.workEndDate = "";
    }
    setFormData((currentData) => ({
      ...currentData,
      workExperiences: [...currentData.workExperiences, workExperience],
    }));
    setIsWorkFormOpen(false);
  };
  const deleteWorkExperience = (idx: number) => {
    setFormData((currentData) => {
      const newExperiences = [...currentData.workExperiences];
      newExperiences.splice(idx, 1);
      return { ...currentData, workExperiences: newExperiences };
    });
  };
  const editWorkExperience = (updatedExperience: WorkExperience) => {
    if (updatedExperience.stillWorkingHere === true) {
      updatedExperience.workEndDate = "";
    }
    setFormData((prevFormData) => {
      const updatedExperiences = [...prevFormData.workExperiences];
      if (workIndexToEdit !== null) {
        updatedExperiences[workIndexToEdit] = updatedExperience;
      }
      return { ...prevFormData, workExperiences: updatedExperiences };
    });
    setIsWorkFormOpen(false);
    setWorkIndexToEdit(null);
  };
  const moveWorkExperienceUp = (index: number) => {
    if (index > 0) {
      setFormData((prevFormData) => {
        const updatedExperiences = [...prevFormData.workExperiences];
        const temp = updatedExperiences[index - 1];
        updatedExperiences[index - 1] = updatedExperiences[index];
        updatedExperiences[index] = temp;
        return { ...prevFormData, workExperiences: updatedExperiences };
      });
    }
  };
  const moveWorkExperienceDown = (index: number) => {
    if (index < formData.workExperiences.length - 1) {
      setFormData((prevFormData) => {
        const updatedExperiences = [...prevFormData.workExperiences];
        const temp = updatedExperiences[index + 1];
        updatedExperiences[index + 1] = updatedExperiences[index];
        updatedExperiences[index] = temp;
        return { ...prevFormData, workExperiences: updatedExperiences };
      });
    }
  };
  const startCreateWork = () => {
    setIsWorkFormOpen(true);
  };
  const cancelCreateWork = () => {
    setIsWorkFormOpen(false);
  };
  const startEditWork = (index: number) => {
    setIsWorkFormOpen(true);
    setWorkIndexToEdit(index);
  };
  const cancelEditWork = () => {
    setIsWorkFormOpen(false);
    setWorkIndexToEdit(null);
  };
  // education
  const [educationIndexToEdit, setEducationIndexToEdit] = useState<
    number | null
  >(null);
  const [isEducationFormOpen, setIsEducationFormOpen] =
    useState<boolean>(false);
  const addEducation = (education: Education) => {
    if (education.stillStudyingHere === true) {
      education.endDate = "";
    }
    setFormData((currentData) => ({
      ...currentData,
      educations: [...currentData.educations, education],
    }));
    setIsEducationFormOpen(false);
  };
  const deleteEducation = (idx: number) => {
    setFormData((currentData) => {
      const newEducations = [...currentData.educations];
      newEducations.splice(idx, 1);
      return { ...currentData, educations: newEducations };
    });
  };
  const editEducation = (updatedEducation: Education) => {
    if (updatedEducation.stillStudyingHere === true) {
      updatedEducation.endDate = "";
    }
    setFormData((prevFormData) => {
      const updatedEducations = [...prevFormData.educations];
      if (educationIndexToEdit !== null) {
        updatedEducations[educationIndexToEdit] = updatedEducation;
      }
      return { ...prevFormData, educations: updatedEducations };
    });
    setEducationIndexToEdit(null);
    setIsEducationFormOpen(false);
  };
  const moveEducationUp = (index: number) => {
    if (index > 0) {
      setFormData((prevFormData) => {
        const updatedEducations = [...prevFormData.educations];
        const temp = updatedEducations[index - 1];
        updatedEducations[index - 1] = updatedEducations[index];
        updatedEducations[index] = temp;
        return { ...prevFormData, educations: updatedEducations };
      });
    }
  };
  const moveEducationDown = (index: number) => {
    if (index < formData.educations.length - 1) {
      setFormData((prevFormData) => {
        const updatedEducations = [...prevFormData.educations];
        const temp = updatedEducations[index + 1];
        updatedEducations[index + 1] = updatedEducations[index];
        updatedEducations[index] = temp;
        return { ...prevFormData, educations: updatedEducations };
      });
    }
  };
  const startCreateEducation = () => {
    setIsEducationFormOpen(true);
  };
  const cancelCreateEducation = () => {
    setIsEducationFormOpen(false);
  };
  const startEditEducation = (index: number) => {
    setIsEducationFormOpen(true);
    setEducationIndexToEdit(index);
  };
  const cancelEditEducation = () => {
    setIsEducationFormOpen(false);
    setEducationIndexToEdit(null);
  };
  // course experience
  const [courseIndexToEdit, setCourseIndexToEdit] = useState<number | null>(
    null
  );
  const [isCourseFormOpen, setIsCourseFormOpen] = useState<boolean>(false);
  const addCourse = (course: CourseExperience) => {
    if (course.stillCourseHere === true) {
      course.courseEndDate = "";
    }
    setFormData((currentData) => ({
      ...currentData,
      courseExperiences: [...currentData.courseExperiences, course],
    }));
    setIsCourseFormOpen(false);
  };
  const deleteCourse = (idx: number) => {
    setFormData((currentData) => {
      const newCourses = [...currentData.courseExperiences];
      newCourses.splice(idx, 1);
      return { ...currentData, courseExperiences: newCourses };
    });
  };
  const editCourse = (updatedCourse: CourseExperience) => {
    if (updatedCourse.stillCourseHere === true) {
      updatedCourse.courseEndDate = "";
    }
    setFormData((prevFormData) => {
      const updatedCourses = [...prevFormData.courseExperiences];
      if (courseIndexToEdit !== null) {
        updatedCourses[courseIndexToEdit] = updatedCourse;
      }
      return { ...prevFormData, courseExperiences: updatedCourses };
    });
    setCourseIndexToEdit(null);
    setIsCourseFormOpen(false);
  };
  const moveCourseUp = (index: number) => {
    if (index > 0) {
      setFormData((prevFormData) => {
        const updatedCourse = [...prevFormData.courseExperiences];
        const temp = updatedCourse[index - 1];
        updatedCourse[index - 1] = updatedCourse[index];
        updatedCourse[index] = temp;
        return { ...prevFormData, courseExperiences: updatedCourse };
      });
    }
  };
  const moveCourseDown = (index: number) => {
    if (index < formData.courseExperiences.length - 1) {
      setFormData((prevFormData) => {
        const updatedCourses = [...prevFormData.courseExperiences];
        const temp = updatedCourses[index + 1];
        updatedCourses[index + 1] = updatedCourses[index];
        updatedCourses[index] = temp;
        return { ...prevFormData, courseExperiences: updatedCourses };
      });
    }
  };
  const startCreateCourse = () => {
    setIsCourseFormOpen(true);
  };
  const cancelCreateCourse = () => {
    setIsCourseFormOpen(false);
  };
  const startEditCourse = (index: number) => {
    setIsCourseFormOpen(true);
    setCourseIndexToEdit(index);
  };
  const cancelEditCourse = () => {
    setIsCourseFormOpen(false);
    setCourseIndexToEdit(null);
  };
  // project experience
  const [projectIndexToEdit, setProjectIndexToEdit] = useState<number | null>(
    null
  );
  const [isProjectFormOpen, setIsProjectFormOpen] = useState<boolean>(false);
  const addProject = (project: ProjectExperience) => {
    if (project.stillWorkingInThisProject === true) {
      project.projectEndDate = "";
    }
    setFormData((currentData) => ({
      ...currentData,
      projectExperiences: [...currentData.projectExperiences, project],
    }));
    setIsProjectFormOpen(false);
  };
  const deleteProject = (idx: number) => {
    setFormData((currentData) => {
      const newProjects = [...currentData.projectExperiences];
      newProjects.splice(idx, 1);
      return { ...currentData, projectExperiences: newProjects };
    });
  };
  const editProject = (updatedProject: ProjectExperience) => {
    if (updatedProject.stillWorkingInThisProject === true) {
      updatedProject.projectEndDate = "";
    }
    setFormData((prevFormData) => {
      const updatedProjects = [...prevFormData.projectExperiences];
      if (projectIndexToEdit !== null) {
        updatedProjects[projectIndexToEdit] = updatedProject;
      }
      return { ...prevFormData, ProjectExperiences: updatedProjects };
    });
    setProjectIndexToEdit(null);
    setIsProjectFormOpen(false);
  };
  const moveProjectUp = (index: number) => {
    if (index > 0) {
      setFormData((prevFormData) => {
        const updatedProject = [...prevFormData.projectExperiences];
        const temp = updatedProject[index - 1];
        updatedProject[index - 1] = updatedProject[index];
        updatedProject[index] = temp;
        return { ...prevFormData, projectExperiences: updatedProject };
      });
    }
  };
  const moveProjectDown = (index: number) => {
    if (index < formData.projectExperiences.length - 1) {
      setFormData((prevFormData) => {
        const updatedProjects = [...prevFormData.projectExperiences];
        const temp = updatedProjects[index + 1];
        updatedProjects[index + 1] = updatedProjects[index];
        updatedProjects[index] = temp;
        return { ...prevFormData, projectExperiences: updatedProjects };
      });
    }
  };
  const startCreateProject = () => {
    setIsProjectFormOpen(true);
  };
  const cancelCreateProject = () => {
    setIsProjectFormOpen(false);
  };
  const startEditProject = (index: number) => {
    setIsProjectFormOpen(true);
    setProjectIndexToEdit(index);
  };
  const cancelEditProject = () => {
    setIsProjectFormOpen(false);
    setProjectIndexToEdit(null);
  };
  // skills
  // const [isSkillFormActive, setIsSkillFormActive] = useState<boolean>(true)
  const addSkill = (skill: Skill) => {
    setFormData((currentData) => ({
      ...currentData,
      skills: [...currentData.skills, skill],
    }));
  };
  const deleteSkill = (idx: number) => {
    setFormData((currentData) => {
      const newSkills = [...currentData.skills];
      newSkills.splice(idx, 1);
      return { ...currentData, skills: newSkills };
    });
  };
  // const disableSkillForm = () => {
  //   setIsSkillFormActive(false)
  // }
  return (
    <>
      <h1>Formulir Curriculum Vitae</h1>
      <Container>
        <div style={{ marginTop: 100 }}>
          {!isDone ? (
            <Form onSubmit={handleSubmit}>
              <h2>Data diri</h2>
              <TextAreaInput
                title="Deskripsikan diri Anda"
                id="description"
                onChange={handleChange}
              />
              <TextInput title="Nama" id="name" onChange={handleChange} />
              <Row>
                <Col xs={6}>
                  <TextInput
                    title="Tempat lahir"
                    id="birthplace"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6}>
                  <DateInput
                    id="birthdate"
                    title="Tanggal lahir"
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <TextAreaInput
                title="Alamat rumah"
                id="address"
                onChange={handleChange}
              />
              <EmailInput onChange={handleChange} />
              <PhoneNumberInput onChange={handleChange} />
              <TextInput
                id="linkedinId"
                title="ID LinkedIn (linkedin.com/in/...)"
                onChange={handleChange}
              />
              <div className="my-5">
                <h2>Pengalaman Kerja</h2>
                <div className="my-3">
                  {formData.workExperiences.length > 0 ? (
                    formData.workExperiences.map((exp, idx) => (
                      <WorkExperienceItem
                        data={exp}
                        key={idx}
                        index={idx}
                        totalLength={formData.workExperiences.length}
                        onEditButton={startEditWork}
                        onDeleteButton={deleteWorkExperience}
                        onUpButton={moveWorkExperienceUp}
                        onDownButton={moveWorkExperienceDown}
                      />
                    ))
                  ) : (
                    <p className="text-center my-5">
                      Belum ada data pengalaman kerja.
                    </p>
                  )}
                </div>
                {/* create */}
                {isWorkFormOpen && workIndexToEdit === null && (
                  <CreateWorkExperienceForm
                    onSave={addWorkExperience}
                    onCancel={cancelCreateWork}
                  />
                )}
                {/* edit one */}
                {isWorkFormOpen && workIndexToEdit !== null && (
                  <div className="my-3">
                    <EditWorkExperienceForm
                      experience={formData.workExperiences[workIndexToEdit]}
                      onSave={editWorkExperience}
                      onCancel={cancelEditWork}
                    />
                  </div>
                )}
                {!isWorkFormOpen && workIndexToEdit === null && (
                  <div className="d-grid gap-2">
                    <Button type="button" onClick={startCreateWork}>
                      Tambah baru
                    </Button>
                  </div>
                )}
              </div>
              <div className="my-5">
                <h2>Pendidikan</h2>
                <div className="my-3">
                  {formData.educations.length > 0 ? (
                    formData.educations.map((edu, idx) => (
                      <EducationItem
                        data={edu}
                        key={idx}
                        index={idx}
                        totalLength={formData.educations.length}
                        onEditButton={startEditEducation}
                        onDeleteButton={deleteEducation}
                        onUpButton={moveEducationUp}
                        onDownButton={moveEducationDown}
                      />
                    ))
                  ) : (
                    <p className="text-center my-5">
                      Belum ada data pendidikan.
                    </p>
                  )}
                </div>
                {/* create */}
                {isEducationFormOpen && educationIndexToEdit === null && (
                  <CreateEducationForm
                    onSave={addEducation}
                    onCancel={cancelCreateEducation}
                  />
                )}
                {/* edit one */}
                {isEducationFormOpen && educationIndexToEdit !== null && (
                  <div className="my-3">
                    <EditEducationForm
                      education={formData.educations[educationIndexToEdit]}
                      onSave={editEducation}
                      onCancel={cancelEditEducation}
                    />
                  </div>
                )}
                {!isEducationFormOpen && educationIndexToEdit === null && (
                  <div className="d-grid gap-2">
                    <Button type="button" onClick={startCreateEducation}>
                      Tambah baru
                    </Button>
                  </div>
                )}
              </div>
              <div className="my-5">
                <h2>Pengalaman Pelatihan</h2>
                <div className="my-3">
                  {formData.courseExperiences.length > 0 ? (
                    formData.courseExperiences.map((course, idx) => (
                      <CourseExperienceItem
                        data={course}
                        key={idx}
                        index={idx}
                        totalLength={formData.courseExperiences.length}
                        onEditButton={startEditCourse}
                        onDeleteButton={deleteCourse}
                        onUpButton={moveCourseUp}
                        onDownButton={moveCourseDown}
                      />
                    ))
                  ) : (
                    <p className="text-center my-5">
                      Belum ada data pengalaman pelatihan.
                    </p>
                  )}
                </div>
                {/* create */}
                {isCourseFormOpen && courseIndexToEdit === null && (
                  <CreateCourseExperienceForm
                    onSave={addCourse}
                    onCancel={cancelCreateCourse}
                  />
                )}
                {/* edit one */}
                {isCourseFormOpen && courseIndexToEdit !== null && (
                  <div className="my-3">
                    <EditCourseExperienceForm
                      course={formData.courseExperiences[courseIndexToEdit]}
                      onSave={editCourse}
                      onCancel={cancelEditCourse}
                    />
                  </div>
                )}
                {!isCourseFormOpen && courseIndexToEdit === null && (
                  <div className="d-grid gap-2">
                    <Button type="button" onClick={startCreateCourse}>
                      Tambah baru
                    </Button>
                  </div>
                )}
              </div>
              <div className="my-5">
                <h2>Pengalaman Projek</h2>
                <div className="my-3">
                  {formData.projectExperiences.length > 0 ? (
                    formData.projectExperiences.map((project, idx) => (
                      <ProjectExperienceItem
                        data={project}
                        key={idx}
                        index={idx}
                        totalLength={formData.projectExperiences.length}
                        onEditButton={startEditProject}
                        onDeleteButton={deleteProject}
                        onUpButton={moveProjectUp}
                        onDownButton={moveProjectDown}
                      />
                    ))
                  ) : (
                    <p className="text-center my-5">
                      Belum ada data pengalaman projek.
                    </p>
                  )}
                </div>
                {/* create */}
                {isProjectFormOpen && projectIndexToEdit === null && (
                  <CreateProjectExperienceForm
                    onSave={addProject}
                    onCancel={cancelCreateProject}
                  />
                )}
                {/* edit one */}
                {isProjectFormOpen && projectIndexToEdit !== null && (
                  <div className="my-3">
                    <EditProjectExperienceForm
                      project={formData.projectExperiences[projectIndexToEdit]}
                      onSave={editProject}
                      onCancel={cancelEditProject}
                    />
                  </div>
                )}
                {!isProjectFormOpen && projectIndexToEdit === null && (
                  <div className="d-grid gap-2">
                    <Button type="button" onClick={startCreateProject}>
                      Tambah baru
                    </Button>
                  </div>
                )}
              </div>
              {/* <SkillItem /> */}
              <div className="my-5">
                <h2>Skill</h2>
                {formData.skills.length > 0 ? (
                  formData.skills.map((skl, idx) => (
                    <SkillItem
                      key={idx}
                      idx={idx}
                      data={skl}
                      onDelete={deleteSkill}
                    />
                  ))
                ) : (
                  <p className="text-center my-3">Belum ada data skill.</p>
                )}
              </div>
              <div className="my-3">
                <CreateSkillForm onSave={addSkill} />
              </div>
              <div className="d-grid gap-2">
                <Button type="submit" className="btn-success">
                  Submit
                </Button>
              </div>
            </Form>
          ) : (
            <CurriculumVitae data={formData} onReset={handleResetForm} />
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
