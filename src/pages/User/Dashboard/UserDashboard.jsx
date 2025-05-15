import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

import { ChevronRight } from 'lucide-react';
import FilterButton from '../../../components/common/DropdownFilter';
import Datepicker from '../../../components/common/Datepicker';
import AdvancedInterviewCalendar from './AdvancedInterviewCalendar';

function UserDashboard() {

  const { loggedUser } = useAuth();
  const navigate = useNavigate();
  console.log(loggedUser);
  useEffect(() => {
    if (loggedUser && loggedUser.isProfileComplete === false) {
      navigate('/applicant-form');
    }
  }, [loggedUser, navigate]);

  if (!loggedUser || loggedUser.isProfileComplete === false) {
    return null; // prevent UI flicker while redirecting
  }

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    position: "Software Developer",
    profileScore: 85,
    totalExams: 12,
    totalInterviews: 8,
    upcomingInterviews: [
      { id: 1, company: "Tech Corp", position: "Senior Developer", date: "May 10, 2025", time: "10:00 AM" },
      { id: 2, company: "Innovate Inc", position: "Lead Engineer", date: "May 15, 2025", time: "2:30 PM" },
      { id: 3, company: "Innovate Inc", position: "Lead Engineer", date: "May 15, 2025", time: "2:30 PM" }
    ]
  };

  // Stat Card Component
  const colorVariants = {
    violet: 'bg-violet-100 border-violet-500 text-violet-800',
    blue: 'bg-blue-100 border-blue-500 text-blue-800',
    green: 'bg-green-100 border-green-500 text-green-800',
    red: 'bg-red-100 border-red-500 text-red-800',
  };

  const StatCard = ({ title, value, variant = 'violet' }) => {
    const colors = colorVariants[variant] || colorVariants.violet;

    return (
      <div className={`rounded-lg shadow-md p-6 border-l-4 ${colors}`}>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    );
  };

  // Profile Detail Component
  const ProfileDetail = ({ label, value }) => {
    return (
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-black">{value}</p>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">

      </div>
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome back, {userData.name}</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
            <StatCard title="Profile Score" value={`${userData.profileScore}%`} variant="violet" />
            <StatCard title="Total Exams" value={userData.totalExams} variant="blue" />
            <StatCard title="Total Interviews" value={userData.totalInterviews} variant="green" />
            <StatCard title="Upcoming Interviews" value={userData.upcomingInterviews.length} variant="red" />
          </div>


          {/* Profile Details */}
          {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileDetail label="Name" value={userData.name} />
              <ProfileDetail label="Email" value={userData.email} />
              <ProfileDetail label="Position" value={userData.position} />
              <ProfileDetail label="Profile Completion" value={`${userData.profileScore}%`} />
            </div>
          </div> */}
          <div className='w-full flex items-center justify-center mb-4'>
            <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 backdrop-blur-md shadow-xl rounded-3xl p-8 md:p-12 border border-white/10 transition-all duration-300 hover:shadow-2xl fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* <!-- Left: Profile Section --> */}
                <div className="text-center space-y-4 fade-up">
                  <img src="https://i.pravatar.cc/200" className="w-40 h-40 rounded-full mx-auto border-4 border-white shadow-lg scale-hover transition-all duration-300" alt="Profile" />
                  <h2 className="text-3xl font-semibold text-white">John Doe</h2>
                  <p className="text-sm text-violet-200">john.doe@example.com</p>

                  {/* <!-- Social Icons --> */}
                  <div className="flex justify-center space-x-6 pt-4 text-violet-200">
                    <a href="#" className="hover:text-white transition ease-in-out duration-200"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.29 4.29 0 0 0 12 8.46a12.15 12.15 0 0 1-8.85-4.5 4.29 4.29 0 0 0 1.33 5.72A4.25 4.25 0 0 1 2 9.08v.05a4.29 4.29 0 0 0 3.44 4.2 4.3 4.3 0 0 1-1.94.07A4.29 4.29 0 0 0 8.29 18a8.6 8.6 0 0 1-6.29 1.5 12.15 12.15 0 0 0 6.63 1.95c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.32 8.32 0 0 0 22.46 6z" /></svg></a>
                    <a href="#" className="hover:text-white transition ease-in-out duration-200"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.3h-3v-5.5c0-1.379-.562-2.5-1.5-2.5s-1.5 1.121-1.5 2.5v5.5h-3v-10h3v1.357c.516-.787 1.363-1.357 2.5-1.357 2.071 0 3.5 1.792 3.5 4.5v5.5z" /></svg></a>
                    <a href="#" className="hover:text-white transition ease-in-out duration-200"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.111.793-.261.793-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.997.109-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 0 1 3.003-.404c1.018.005 2.044.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.656 1.653.244 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.104.823 2.222 0 1.604-.014 2.896-.014 3.286 0 .319.19.694.8.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></a>
                  </div>
                </div>

                {/* <!-- Right: Information Section --> */}
                <div className="md:col-span-2 space-y-6 text-white">
                  {/* <!-- Education Section --> */}
                  <div className="scroll-fade-up hover-section">
                    <h3 className="text-xl font-semibold mb-2">🎓 Education</h3>
                    <ul className="list-disc list-inside text-sm text-violet-100">
                      <li>BSc in Computer Science - ABC University (2022–Present)</li>
                      <li>High School - XYZ International (Graduated 2020)</li>
                    </ul>
                  </div>

                  {/* <!-- Experience Section --> */}
                  <div className="scroll-fade-up hover-section">
                    <h3 className="text-xl font-semibold mb-2">💼 Experience</h3>
                    <ul className="list-disc list-inside text-sm text-violet-100">
                      <li>Frontend Intern @ TechCorp (2024)</li>
                      <li>Open Source Contributor - Mozilla</li>
                      <li>Freelance Web Developer (2022–Present)</li>
                    </ul>
                  </div>

                  {/* <!-- Skills Section --> */}
                  <div className="scroll-fade-up hover-section">
                    <h3 className="text-xl font-semibold mb-2">✨ Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">React</span>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Tailwind</span>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Python</span>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">UI/UX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-[300px]">

            {/* Left - Interviews */}
            <div className="bg-violet-500 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Upcoming Interviews</h3>
              {userData.upcomingInterviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.upcomingInterviews.map(interview => (
                    <div
                      key={interview.id}
                      className="bg-violet-600 rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg">{interview.company}</h4>
                        <div className="bg-violet-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {interview.date}
                        </div>
                      </div>
                      <p className="font-medium mb-2">{interview.position}</p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-violet-200">{interview.time}</p>
                        <button className="bg-white text-violet-600 hover:bg-violet-100 px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors">
                          Details
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white">No upcoming interviews scheduled.</p>
              )}
            </div>

            {/* Right - Calendar */}
            <div className="rounded-lg shadow-md p-4">
              <AdvancedInterviewCalendar />
            </div>
          </div>


        </div>
      </div>

    </div >
  );
}

export default UserDashboard;