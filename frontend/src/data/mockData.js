// Mock data shaped to mirror the future database/API response formats
// described in the PrepToJob backend contract. Swap these for real
// service calls once the backend is available — the shapes should not change.

export const mockUser = {
  id: 'usr_001',
  name: 'Siddhartha Rao',
  email: 'siddhartha.rao@example.com',
}

export const mockProfile = {
  userId: 'usr_001',
  fullName: 'Siddhartha Rao',
  email: 'siddhartha.rao@example.com',
  education: [
    {
      id: 'edu_1',
      degree: 'B.Tech, Computer Science',
      institution: 'IIT Kanpur',
      graduationYear: '2026',
    },
  ],
  skills: ['C++', 'Java', 'Python', 'SQL', 'React', 'Node.js', 'Git'],
  projects: [
    {
      id: 'proj_1',
      name: 'Campus Marketplace',
      description: 'A peer-to-peer marketplace for college students to buy and sell used items.',
      technologies: 'React, Node.js, MongoDB',
    },
    {
      id: 'proj_2',
      name: 'Attendance Tracker',
      description: 'A facial-recognition based attendance system for classrooms.',
      technologies: 'Python, OpenCV, Flask',
    },
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Cloud Practitioner',
      organization: 'Amazon Web Services',
      year: '2025',
    },
  ],
  experience: [
    {
      id: 'exp_1',
      title: 'Software Engineering Intern',
      organization: 'Loopwave Technologies',
      duration: 'May 2025 – Jul 2025',
      description: 'Built internal tooling for data pipeline monitoring using Python and React.',
    },
  ],
  targetRole: 'Software Engineer',
  targetCompany: 'Google',
}

export const mockResume = {
  id: 'res_001',
  userId: 'usr_001',
  fileName: 'Siddhartha_Rao_Resume.pdf',
  fileSize: '412 KB',
  fileUrl: null,
  uploadedAt: '2026-08-29T10:12:00Z',
  analysisStatus: 'analyzed',
}

export const mockJob = {
  id: 'job_001',
  userId: 'usr_001',
  role: 'Software Engineer',
  company: 'Google',
  description:
    'We are looking for a Software Engineer with strong fundamentals in data structures and algorithms, experience building scalable systems, and familiarity with cloud infrastructure (AWS/GCP), containerization (Docker), and system design principles. Experience with distributed systems is a plus.',
  createdAt: '2026-08-29T10:20:00Z',
}

export const mockMatch = {
  resumeId: 'res_001',
  jobId: 'job_001',
  overallScore: 76,
  matchedSkills: ['C++', 'Java', 'SQL', 'Git'],
  missingSkills: ['AWS', 'Docker', 'System Design'],
  atsScore: 82,
  resumeStrength: 78,
  requirementBreakdown: [
    { label: 'Technical Skills', score: 80 },
    { label: 'Soft Skills', score: 70 },
    { label: 'Experience', score: 65 },
    { label: 'Education', score: 90 },
  ],
}

export const mockSkills = [
  { name: 'C++', score: 82, category: 'strong', lastUpdated: '2026-08-29' },
  { name: 'Java', score: 75, category: 'strong', lastUpdated: '2026-08-29' },
  { name: 'SQL', score: 71, category: 'strong', lastUpdated: '2026-08-29' },
  { name: 'Docker', score: 48, category: 'improve', lastUpdated: '2026-08-29' },
  { name: 'AWS', score: 42, category: 'improve', lastUpdated: '2026-08-29' },
  { name: 'System Design', score: 38, category: 'improve', lastUpdated: '2026-08-29' },
]

export const mockRecommendedFocus = ['System Design', 'AWS', 'Docker']

export const mockRecentActivity = [
  { id: 'act_1', label: 'Resume analyzed', timestamp: '2026-08-29T10:15:00Z' },
  { id: 'act_2', label: 'Job description analyzed', timestamp: '2026-08-29T10:22:00Z' },
  { id: 'act_3', label: 'Skill profile created', timestamp: '2026-08-29T10:25:00Z' },
]

export const sidebarComingSoon = ['Quiz', 'Interview', 'Roadmap', 'Analytics']
