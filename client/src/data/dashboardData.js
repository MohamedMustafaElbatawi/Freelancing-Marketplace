import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Mail,
  FolderKanban,
  Settings,
  CircleHelp,
  LogOut,
  FolderOpen,
  FileText,
  Bell,
  CircleCheck,
  CreditCard,
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/client/dashboard",
  },
  {
    title: "My Jobs",
    icon: Briefcase,
    path: "/client/jobs",
  },
  {
    title: "Post Job",
    icon: PlusCircle,
    path: "/client/post-job",
  },
  {
    title: "Messages",
    icon: Mail,
    path: "/client/messages",
  },
  {
    title: "proposals",
    icon: FolderKanban,
    path: "/client/proposals",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/client/notifications",
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/client/settings",
  },
];
export const bottomLinks = [
  {
    title: "Help Center",
    icon: CircleHelp,
  },
  {
    title: "Logout",
    icon: LogOut,
    type: "logout",
  },
];
export const sidebarLinksFreelancer = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/freelancer/dashboard",
  },
  {
    title: "Find Jobs",
    icon: FolderOpen,
    path: "/freelancer/jobs",
  },
  {
    title: "My Proposals",
    icon: FolderKanban,
    path: "/freelancer/proposals",
  },
  {
    title: "My Projects",
    icon: FileText,
    path: "/freelancer/projects",
  },
  {
    title: "Messages",
    icon: Mail,
    path: "/freelancer/messages",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/freelancer/notifications",
  },
  // {
  //   title: "Earnings",
  //   icon: CircleCheck,
  //   path: "/freelancer/earnings",
  // },
  {
    title: "Profile",
    icon: CreditCard,
    path: "/freelancer/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/freelancer/settings",
  },
];

export const stats = [
  {
    id: 1,
    title: "Total Jobs",
    value: 12,
    icon: Briefcase,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "+12%",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    title: "Active Jobs",
    value: 4,
    icon: FolderOpen,
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: "Active",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    title: "Pending Proposals",
    value: 28,
    icon: FileText,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    badge: "New",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 4,
    title: "Completed",
    value: 45,
    icon: CircleCheck,
    color: "bg-green-100",
    iconColor: "text-green-600",
    badge: "Done",
    badgeColor: "bg-green-100 text-green-700",
  },
];

export const projects = [
  {
    id: 1,
    title: "E-commerce Mobile App Redesign",
    freelancer: "Alex Rivera",
    skill: "Senior UI/UX",
    image: "https://i.pravatar.cc/150?img=12",
    progress: 75,
    deadline: "Due in 5 days",
  },

  {
    id: 2,
    title: "Fintech Backend API Integration",
    freelancer: "Sarah Jenkins",
    skill: "Node.js Architect",
    image: "https://i.pravatar.cc/150?img=47",
    progress: 30,
    deadline: "Due in 12 days",
  },

  {
    id: 3,
    title: "Social Media Marketing Campaign",
    freelancer: "David Chen",
    skill: "Growth Marketer",
    image: "https://i.pravatar.cc/150?img=33",
    progress: 92,
    deadline: "Due in 2 days",
  },
];
