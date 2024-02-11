import React from "react";
import UserAlt from "../../assets/user-circle.svg";
import Calander from "../../assets/calender-alt-2.svg";
import { Link } from "react-router-dom";
import CompanyTemplate from "./CompanyTemplate";
import { useParams } from "react-router-dom";
import JobDetails from "../components/JobDetails";
const DisplayApplicants = () => {
  const Applicants = [
    {
      name: "Julia Davis",
      job: "Front-End Developer",
      description:
        "Julia is a front-end developer with a strong foundation in HTML, CSS, and JavaScript. She specializes in creating responsive and interactive web experiences.",
      skills: ["React", "Vue.js", "Bootstrap"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Michael Clark",
      job: "Back-End Developer",
      description:
        "Michael is a back-end developer adept at server-side logic and database management. He has experience with Node.js, Express.js, and MongoDB.",
      bookingLink: "#",
      skills: ["Node.js", "Express.js", "MongoDB"],
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Olivia Taylor",
      job: "Graphic Designer",
      description:
        "Olivia is a graphic designer with a portfolio that showcases her ability to create visually appealing designs. She is proficient in Adobe Photoshop, Illustrator, and InDesign.",
      skills: ["Photoshop", "Illustrator", "InDesign"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Alice Johnson",
      job: "Frontend Developer",
      description:
        "Alice is a passionate frontend developer with experience in creating beautiful and responsive user interfaces. She is dedicated to writing clean and maintainable code.",
      skills: ["React", "Css", "Javascript"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Bob Smith",
      job: "Product Manager",
      description:
        "Bob is an experienced product manager with a track record of delivering successful products. He is skilled in defining product strategy and leading cross-functional teams.",
      skills: ["Angular", "C#", "Java"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Alice Johnson",
      job: "Software Engineer",
      description:
        "Alice is a proficient software engineer specializing in backend development. She excels in creating robust and scalable systems.",
      skills: ["Python", "JavaScript", "Ruby"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Charlie Brown",
      job: "UX Designer",
      description:
        "Charlie is a user experience designer dedicated to creating intuitive and engaging interfaces. Her work focuses on improving user satisfaction and retention.",
      skills: ["Sketch", "Adobe XD", "Figma"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "David Green",
      job: "Data Scientist",
      description:
        "David is a data scientist with expertise in machine learning and statistical analysis. He leverages data to drive business decisions and predict market trends.",
      skills: ["R", "SQL", "SAS"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Eva White",
      job: "Project Manager",
      description:
        "Eva is a project manager known for her ability to manage complex projects efficiently. She ensures timely delivery while maintaining high quality standards.",
      skills: ["Agile", "Scrum", "Kanban"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Frank Black",
      job: "DevOps Engineer",
      description:
        "Frank is a DevOps engineer who bridges the gap between development and operations. His role involves automating processes and enhancing system reliability.",
      skills: ["Docker", "Kubernetes", "Ansible"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Grace Lee",
      job: "QA Tester",
      description:
        "Grace is a QA tester with a keen eye for detail. She ensures that software meets functional requirements and provides a seamless user experience.",
      skills: ["Jira", "TestComplete", "Selenium"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Henry Miller",
      job: "Database Administrator",
      description:
        "Henry is a database administrator responsible for managing and optimizing databases. He ensures data integrity and performance across various applications.",
      skills: ["MySQL", "PostgreSQL", "MongoDB"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
    {
      name: "Isabella Rodriguez",
      job: "Content Strategist",
      description:
        "Isabella is a content strategist who develops and implements content plans to achieve brand goals. She creates engaging content that resonates with audiences.",
      skills: ["SEO", "Content Planning", "Copywriting"],
      bookingLink: "#",
      resumeLink: "#",
      profileLink: "#",
    },
  ];
  const { id, title } = useParams();

  return (
    <CompanyTemplate>
      <div
        role="tablist"
        className="tabs tabs-boxed items-center bg-white border-0 w-full"
      >
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-sans  text-blue-600 font-medium text-base md:text-3xl min-w-[100px]"
          aria-label="Job Details"
        />
        <div
          role="tabpanel"
          className="tab-content bg-white border-base-300 rounded-box p-6"
        >
          <JobDetails
            title="Senior Frontend Engineer"
            salary="15$ per hour"
            skills={["MySQL", "PostgreSQL", "MongoDB"]}
            description="We are looking for a Senior Frontend Engineer to join our
team. You will be responsible for architecting and
implementing the user interface of our next-generation web
applications. The ideal candidate is a self-starter who is
comfortable working in a dynamic environment and has a passion
for building elegant user interfaces."
          />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-sans text-blue-600 font-medium text-base md:text-3xl min-w-[100px]"
          aria-label="Top 10 Applicants"
          checked
        />
        <div
          role="tabpanel"
          className="tab-content bg-white border-base-300 rounded-box p-6"
        >
          <div className="flex mx-auto w-full items-center justify-center px-4">
            <div className="mt-10">
              <div className="my-6 space-y-5">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Top 10 Applicants
                </h1>
                <p className="text-gray-500 text-2xl dark:text-gray-400">
                  Here are the top 10 individuals who applied for the{" "}
                  <span className="font-extrabold text-gray-800">{title}</span>{" "}
                  job at your company.
                </p>
              </div>
              <div className="space-y-10">
                <div className="grid gap-4 sm:grid-cols-1 xl:grid-cols-2">
                  {Applicants.map((applicant, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <div className="rounded-lg overflow-hidden max-w-lg bg-gray-100 shadow-sm">
                          <div className="flex items-center p-4">
                            <div className="flex justify-center w-10 h-10 bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
                              <img alt="Avatar" src={UserAlt} />
                            </div>
                            <div className="ml-4">
                              <h2 className="text-2xl font-bold">
                                <Link href={applicant.profileLink}>
                                  {applicant.name}
                                </Link>
                              </h2>
                              <p className="text-md text-gray-700">
                                {applicant.job}
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <p>{applicant.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {applicant.skills.map((skill, skillIndex) => {
                                return (
                                  <span
                                    key={skillIndex}
                                    className="inline-flex items-center px-3 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800"
                                  >
                                    {skill}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className="bg-gray-100 p-4 rounded-b-lg">
                            <div className="flex justify-center gap-2">
                              <Link
                                className="flex p-2 items-center justify-center rounded-md border border-gray-200 bg-gray-700 text-white px-4 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                href={applicant.bookingLink}
                              >
                                <img
                                  src={Calander}
                                  alt="Calander"
                                  className="w-5 h-5"
                                />
                                Book
                              </Link>
                              <Link
                                className="flex p-2 items-center justify-center rounded-md border border-gray-200 bg-gray-700 text-white px-4 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                href={applicant.resumeLink}
                              >
                                Resume
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CompanyTemplate>
  );
};

export default DisplayApplicants;
