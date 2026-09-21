import Landing from '../pages/Landing'
import Register from '../pages/Register'
import Login from '../pages/Login'
import CareerProfile from '../pages/CareerProfile'
import ResumeUpload from '../pages/ResumeUpload'
import JobDescription from '../pages/JobDescription'
import MatchResult from '../pages/MatchResult'
import SkillGap from '../pages/SkillGap'
import Dashboard from '../pages/Dashboard'
import Settings from '../pages/Settings'

export const publicRoutes = [
  { path: '/', element: Landing },
  { path: '/register', element: Register },
  { path: '/login', element: Login },
]

export const dashboardRoutes = [
  { path: '/dashboard', element: Dashboard },
  { path: '/career-profile', element: CareerProfile },
  { path: '/resume-upload', element: ResumeUpload },
  { path: '/job-description', element: JobDescription },
  { path: '/match-result', element: MatchResult },
  { path: '/skill-gap', element: SkillGap },
  { path: '/settings', element: Settings },
]
