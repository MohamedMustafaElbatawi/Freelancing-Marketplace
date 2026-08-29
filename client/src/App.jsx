import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import Register from "./components/auth/Register";
import ClientDashboard from "./pages/client/dashboard/ClientDashboard";
import CompleteClientProfile from "./pages/client/ClientProfile/CompleteClientProfile";
import CompleteFreelancerProfile from "./pages/freelancers/FreelancerProfile/CompleteFreelancerProfile";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyResetCode from "./components/auth/VerifyResetCode";
import ClientSidebar from "./components/dashboard/client/ClientSidebar";
import FreelancerSidebar from "./components/dashboard/freelancer/FreelancerSidebar";
import MyJobs from "./pages/client/my-jobs/MyJobs";
import Settings from "./pages/client/Settings/Setting";
import ClientLayout from "./layouts/ClientLayout";
import Messages from "./pages/client/Messages/Messages";
import PostJob from "./pages/client/PostJob/PostJob";
import JobDetails from "./pages/client/my-jobs/components/JobDetails";
import EditJob from "./pages/client/my-jobs/components/EditJob";
import Notifications from "./pages/client/Notifications/Notifications";
import FreaalancerDashboaed from "./pages/freelancers/dashboard/FreaalancerDashboaed";
import FreelancerLayout from "./layouts/FreelancerLayout";
import FindJobs from "./pages/freelancers/jobs/FindJobs";
import MyProposals from "./pages/freelancers/proposals/MyProposals";
import FreelancerProjects from "./pages/freelancers/projects/FreelancerProjects";
import Earnings from "./pages/freelancers/earnings/Earnings";
import MessagesFreelancer from "./pages/freelancers/messages/MessagesFreelancer";
import NotificationsFreelancer from "./pages/freelancers/notifications/NotificationsFreelancer";
import SettingsFreelancer from "./pages/freelancers/settings/SettingsFreelancer";
import ProfileFreelancer from "./pages/freelancers/profile/ProfileFreelancer";
import DetailsJob from "./pages/freelancers/jobs/components/DetailsJob";
import ApplyJob from "./pages/freelancers/jobs/components/ApplyJob";
import ProposalaDetails from "./pages/freelancers/proposals/components/ProposalaDetails";
import ClientProposals from "./pages/client/proposals/ClientProposals";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset-code" element={<VerifyResetCode />} />
          {/* client */}
          <Route
            path="/complete-profile-client"
            element={<CompleteClientProfile />}
          />
          {/* freelancer */}
          <Route
            path="/complete-profile-freelancer"
            element={<CompleteFreelancerProfile />}
          />

          <Route path="/ClientSidebar" element={<ClientSidebar />} />
          {/*layout client */}
          <Route path="/client" element={<ClientLayout />}>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="jobs" element={<MyJobs />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="jobs/edit/:id" element={<EditJob />} />

            <Route path="messages" element={<Messages />} />
            <Route path="messages/:conversationId" element={<Messages />} />
            <Route path="post-job" element={<PostJob />} />

            {/* في انتظار اكمال المشروع  Notifications */}
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="proposals" element={<ClientProposals />} />


          </Route>

          <Route path="/FreelancerSidebar" element={<FreelancerSidebar />} />
          {/*layout freelancer */}
          <Route path="/freelancer" element={<FreelancerLayout />}>
            <Route path="dashboard" element={<FreaalancerDashboaed />} />
            <Route path="jobs" element={<FindJobs />} />
            <Route path="proposals" element={<MyProposals />} />
            <Route path="projects" element={<FreelancerProjects />} />
            <Route path="notifications" element={<NotificationsFreelancer />} />
            {/* <Route path="earnings" element={<Earnings />} /> */}
            <Route path="profile" element={<ProfileFreelancer />} />
            <Route path="settings" element={<SettingsFreelancer />} />
            <Route path="details-job/:id" element={<DetailsJob />} />
            <Route path="apply-job/:id" element={<ApplyJob />} />
            <Route path="proposals/:id" element={<ProposalaDetails />} />
            <Route path="messages" element={<MessagesFreelancer />} />
            {/* <Route path="messages" element={<Messages />} /> */}
            <Route
              path="messages/:conversationId"
              element={<MessagesFreelancer />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
