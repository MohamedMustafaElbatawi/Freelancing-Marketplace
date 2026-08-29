import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import ContactInfo from "./components/ContactInfo";
import SocialLinks from "./components/SocialLinks";
import AvailabilityCard from "./components/AvailabilityCard";
import { useEffect, useState } from "react";
import axios from "axios";
const skills = [
  "React.js",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
];

const projects = [
  {
    title: "Travel Booking Platform",
    description:
      "A full-stack travel booking platform where users can search and book hotels and manage their reservations.",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Freelancing Marketplace",
    description:
      "A freelancing platform connecting clients with freelancers to post jobs, submit proposals and manage projects.",
    technologies: ["React", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Dashboard System",
    description:
      "A modern responsive dashboard with statistics, charts, notifications and user management.",
    technologies: ["React", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const experiences = [
  {
    position: "Full Stack Developer",
    company: "Freelance",
    period: "2025 - Present",
    description:
      "Building modern web applications using React, Node.js, Express and MongoDB.",
  },
];

const education = [
  {
    degree: "Computer Science",
    university: "Faculty of Computers and Information",
    period: "2023 - Present",
  },
];

export default function ProfileFreelancer() {
  const URL = import.meta.env.VITE_API_URL;
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/auth/me`, {
          withCredentials: true,
        });
        if (response.data.user) {
          setProfile(response.data.user);
        }
      } catch (error) {
        console.error("Get freelancer profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URL}/api/freelancer/projects`,
          {
            withCredentials: true,
          },
        );
        if (response.data.projects) {
          setProjects(response.data.projects);
        }
      } catch (error) {
        console.error("Get freelancer projects error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }
  // console.log(profile);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ================= Profile Header ================= */}
      <ProfileHeader profile={profile} />
      {/* هرجعله تاني */}
      <ProfileStats profile={profile} />

      {/* ================= Main Content ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= Left ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <AboutSection profile={profile} />
          {/* Skills */}
          <SkillsSection skills={skills} profile={profile} />
          {/* واقف هنا */}
          {/* Projects */}
          <ProjectsSection projects={projects} loading={loading} profile={profile} />
          {/* Work Experience */}
          <ExperienceSection
            experiences={[
              {
                position: profile.professionalTitle,
                company: "Freelance",
                period: `${profile.yearsOfExperience} Years`,
                description: profile.bio,
              },
            ]}
          />
          {/* Education */}
          <EducationSection education={education} loading={loading} />
        </div>

        {/* ================= Right ================= */}
        <div className="space-y-6">
          {/* Contact */}
          <ContactInfo profile={profile} loading={loading} />

          {/* Links */}
          <SocialLinks profile={profile} loading={loading} />

          {/* Availability */}
          <AvailabilityCard />
        </div>
      </div>
    </div>
  );
}
