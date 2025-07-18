import { TimelineEvent, PersonalInfo, Skill, Achievement, Education, WorkExperience } from '../models/Timeline';

export const personalInfo: PersonalInfo = {
    name: 'André Paulo',
    title: 'Full Stack Developer & Software Engineer',
    bio: 'Passionate developer with over 5 years of experience creating innovative solutions. Specialized in React, Node.js, and modern architectures, always striving for technical excellence and positive impact through code.',
    location: 'Campina Grande, Brazil',
    email: 'acode775@gmail.com',
    phone: '+55 (83) 991779519',
    website: 'https://andre-portfolio.vercel.app',
    avatar: '/profile-avatar.png',
    coverImage: '/cover-photo.jpg',
    yearsOfExperience: 5,
    projectsCompleted: 5,
    technologiesLearned: 25,
    certifications: 8
};

export const skills: Skill[] = [
    // Frontend
    {
        id: 'react',
        name: 'React',
        category: 'frontend',
        level: 5,
        yearsOfExperience: 4,
        icon: '⚛️',
        color: 'text-blue-500',
        description: 'Development of SPAs and reusable components'
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        category: 'frontend',
        level: 5,
        yearsOfExperience: 3,
        icon: '🔷',
        color: 'text-blue-600',
        description: 'Static typing for JavaScript'
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        category: 'frontend',
        level: 4,
        yearsOfExperience: 2,
        icon: '⚡',
        color: 'text-gray-800',
        description: 'React framework for production'
    },
    {
        id: 'tailwind',
        name: 'TailwindCSS',
        category: 'frontend',
        level: 5,
        yearsOfExperience: 2,
        icon: '💨',
        color: 'text-cyan-500',
        description: 'Utility-first CSS framework'
    },

    // Backend
    {
        id: 'nodejs',
        name: 'Node.js',
        category: 'backend',
        level: 4,
        yearsOfExperience: 4,
        icon: '🟢',
        color: 'text-green-600',
        description: 'JavaScript runtime for server-side applications'
    },
    {
        id: 'python',
        name: 'Python',
        category: 'backend',
        level: 4,
        yearsOfExperience: 3,
        icon: '🐍',
        color: 'text-blue-500',
        description: 'Versatile language for backend and AI'
    },
    {
        id: 'express',
        name: 'Express.js',
        category: 'backend',
        level: 4,
        yearsOfExperience: 3,
        icon: '🚂',
        color: 'text-gray-700',
        description: 'Web framework for Node.js'
    },

    // Database
    {
        id: 'mysql',
        name: 'MySQL',
        category: 'database',
        level: 4,
        yearsOfExperience: 3,
        icon: '🛢️',
        color: 'text-blue-600',
        description: 'Open-source relational database'
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'database',
        level: 3,
        yearsOfExperience: 2,
        icon: '🐘',
        color: 'text-blue-700',
        description: 'Relational database'
    },

    // DevOps
    {
        id: 'docker',
        name: 'Docker',
        category: 'devops',
        level: 3,
        yearsOfExperience: 2,
        icon: '🐳',
        color: 'text-blue-500',
        description: 'Application containerization'
    },
    {
        id: 'aws',
        name: 'AWS',
        category: 'devops',
        level: 3,
        yearsOfExperience: 2,
        icon: '☁️',
        color: 'text-orange-500',
        description: 'Amazon cloud services'
    },

    // Soft Skills
    {
        id: 'leadership',
        name: 'Leadership',
        category: 'soft',
        level: 4,
        yearsOfExperience: 3,
        icon: '👥',
        color: 'text-purple-600',
        description: 'Team and project leadership'
    },
    {
        id: 'communication',
        name: 'Communication',
        category: 'soft',
        level: 5,
        yearsOfExperience: 5,
        icon: '💬',
        color: 'text-blue-600',
        description: 'Effective communication with stakeholders'
    }
];

export const education: Education[] = [
    {
        id: 'computer-science',
        institution: 'University of São Paulo (USP)',
        degree: 'Bachelor',
        field: 'Computer Science',
        startDate: '2018-02-01',
        endDate: '2021-12-15',
        location: 'São Paulo, SP',
        gpa: '8.5/10',
        description: 'Solid foundation in computer science fundamentals, algorithms, data structures, and software engineering.',
        achievements: [
            'Graduated with academic honors',
            'Final project awarded in national competition',
            'Teaching assistant for Object-Oriented Programming'
        ],
        coursework: [
            'Algorithms and Data Structures',
            'Software Engineering',
            'Databases',
            'Computer Networks',
            'Artificial Intelligence',
            'Web Programming'
        ]
    },
    {
        id: 'tech-course',
        institution: 'SENAI Technical School',
        degree: 'Technical',
        field: 'Internet Information Technology',
        startDate: '2016-02-01',
        endDate: '2017-12-15',
        location: 'São Paulo, SP',
        description: 'Technical course focused on web development and internet technologies.',
        achievements: [
            'Best student in the class',
            'Outstanding capstone project'
        ]
    }
];

export const workExperience: WorkExperience[] = [
    {
        id: 'senior-dev',
        company: 'Tech Innovations Ltd.',
        position: 'Senior Full Stack Developer',
        startDate: '2023-01-15',
        ongoing: true,
        location: 'São Paulo, SP (Remote)',
        description: 'Technical lead responsible for system architecture and mentoring junior developers.',
        responsibilities: [
            'Architecture and development of React/Node.js applications',
            'Mentoring a team of 5 developers',
            'Code review and establishing code standards',
            'Implementation of CI/CD and DevOps',
            'Direct communication with stakeholders'
        ],
        achievements: [
            'Reduced deployment time by 40%',
            'Implemented micro-frontend architecture',
            'Increased application performance by 25%',
            'Mentoring resulted in 3 team promotions'
        ],
        technologies: [
            'React', 'TypeScript', 'Node.js', 'MySQL', 'AWS', 'Docker', 'Next.js'
        ]
    },
    {
        id: 'full-stack-dev',
        company: 'Digital Solutions S.A.',
        position: 'Full Stack Developer',
        startDate: '2021-03-01',
        endDate: '2022-12-31',
        location: 'São Paulo, SP',
        description: 'Development of modern web applications for corporate clients.',
        responsibilities: [
            'Frontend development with React and TypeScript',
            'RESTful APIs with Node.js and Express',
            'Integration with SQL and NoSQL databases',
            'Participation in agile ceremonies',
            'Technical documentation'
        ],
        achievements: [
            'Delivered 8 projects on time',
            'Implemented automated testing',
            'Improved system UX by 30%'
        ],
        technologies: [
            'React', 'JavaScript', 'Node.js', 'PostgreSQL', 'MySQL', 'Git'
        ]
    },
    {
        id: 'junior-dev',
        company: 'StartUp Inovadora',
        position: 'Junior Frontend Developer',
        startDate: '2020-01-15',
        endDate: '2021-02-28',
        location: 'São Paulo, SP',
        description: 'First job as a developer, focused on frontend and user experience.',
        responsibilities: [
            'Development of responsive interfaces',
            'Implementation of Figma/Adobe XD designs',
            'Maintenance of legacy code',
            'Participation in daily meetings and retrospectives'
        ],
        achievements: [
            'Complete refactoring of the main UI',
            'Implementation of a design system',
            'Reduced UI bugs by 50%'
        ],
        technologies: [
            'React', 'JavaScript', 'CSS3', 'HTML5', 'SASS'
        ]
    }
];

export const achievements: Achievement[] = [
    {
        id: 'aws-certified',
        title: 'AWS Certified Solutions Architect',
        description: 'Official Amazon Web Services certification for solution architecture.',
        date: '2023-06-15',
        type: 'certification',
        icon: '☁️',
        color: 'text-orange-500',
        link: 'https://aws.amazon.com/certification/'
    },
    {
        id: 'hackathon-winner',
        title: 'TechSP 2023 Hackathon Winner',
        description: 'First place in the "Social Innovation" category with a community management app.',
        date: '2023-09-20',
        type: 'award',
        icon: '🏆',
        color: 'text-yellow-500'
    },
    {
        id: 'react-certified',
        title: 'React Professional Certification',
        description: 'Advanced certification in React.js and ecosystem.',
        date: '2022-11-10',
        type: 'certification',
        icon: '⚛️',
        color: 'text-blue-500'
    },
    {
        id: 'mentor-recognition',
        title: 'Mentor of the Year - Tech Company',
        description: 'Recognition for excellence in mentoring and talent development.',
        date: '2023-12-01',
        type: 'recognition',
        icon: '👨‍🏫',
        color: 'text-purple-500'
    }
];

export const timelineEvents: TimelineEvent[] = [
    // Current Job
    {
        id: 'current-job',
        title: 'Senior Full Stack Developer',
        subtitle: 'Tech Innovations Ltd.',
        description: 'Leading a development team and architecting scalable systems. Responsible for implementing best practices and technical mentoring.',
        date: '2023-01-15',
        type: 'work',
        location: 'São Paulo, SP (Remote)',
        company: 'Tech Innovations Ltd.',
        technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'MySQL'],
        achievements: [
            'Reduced deployment time by 40%',
            'Mentored 5 developers',
            'Implemented micro-frontend architecture'
        ],
        icon: '💼',
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        ongoing: true,
        featured: true
    },

    // AWS Certification
    {
        id: 'aws-cert-timeline',
        title: 'AWS Certified Solutions Architect',
        subtitle: 'Amazon Web Services',
        description: 'Official certification in AWS cloud solution architecture.',
        date: '2023-06-15',
        type: 'certification',
        icon: '☁️',
        color: 'text-orange-500',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        link: 'https://aws.amazon.com/certification/',
        featured: true
    },

    // Hackathon
    {
        id: 'hackathon-timeline',
        title: 'TechSP 2023 Hackathon Winner',
        subtitle: 'Social Innovation Category',
        description: 'We developed a community management app that connects neighbors and facilitates local collaboration.',
        date: '2023-09-20',
        type: 'achievement',
        technologies: ['React Native', 'Firebase', 'Node.js'],
        icon: '🏆',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        featured: true
    },

    // Previous Job
    {
        id: 'previous-job',
        title: 'Full Stack Developer',
        subtitle: 'Digital Solutions S.A.',
        description: 'Development of modern web applications for corporate clients, focusing on performance and user experience.',
        date: '2021-03-01',
        endDate: '2022-12-31',
        type: 'work',
        location: 'São Paulo, SP',
        company: 'Digital Solutions S.A.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'MySQL'],
        achievements: [
            'Delivered 8 corporate projects',
            'Implemented automated testing',
            'Improved UX by 30%'
        ],
        icon: '💼',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },

    // Graduation
    {
        id: 'graduation',
        title: 'Bachelor in Computer Science',
        subtitle: 'University of São Paulo (USP)',
        description: 'Solid foundation in computer science fundamentals, with a final project awarded in a national competition.',
        date: '2018-02-01',
        endDate: '2021-12-15',
        type: 'education',
        location: 'São Paulo, SP',
        achievements: [
            'Graduated with academic honors',
            'Award-winning final project',
            'OOP teaching assistant for 2 semesters'
        ],
        icon: '🎓',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        featured: true
    },

    // First Job (hidden from frontend)
    {
        id: 'first-job',
        title: 'Junior Frontend Developer',
        subtitle: 'StartUp Inovadora',
        description: 'Beginning of professional career, focused on frontend development and learning agile methodologies.',
        date: '2020-01-15',
        endDate: '2021-02-28',
        type: 'work',
        location: 'São Paulo, SP',
        technologies: ['React', 'JavaScript', 'CSS3', 'HTML5'],
        achievements: [
            'Complete refactoring of the main UI',
            'Implementation of a design system',
            'Reduced UI bugs by 50%'
        ],
        icon: '🚀',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        hidden: true // Add this property to hide from frontend
    },

    // Technical Course
    {
        id: 'tech-course-timeline',
        title: 'Technical Course in Internet Information Technology',
        subtitle: 'SENAI São Paulo',
        description: 'Technical course that provided the foundation for a career in web development.',
        date: '2016-02-01',
        endDate: '2017-12-15',
        type: 'education',
        location: 'São Paulo, SP',
        achievements: [
            'Best student in the class',
            'Outstanding capstone project'
        ],
        icon: '🎓',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
    },

    // React Certification
    {
        id: 'react-cert-timeline',
        title: 'React Professional Certification',
        subtitle: 'Meta (Facebook)',
        description: 'Advanced certification in React.js and the entire development ecosystem.',
        date: '2022-11-10',
        type: 'certification',
        icon: '⚛️',
        color: 'text-blue-500',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },

    // Recognition
    {
        id: 'mentor-award',
        title: 'Mentor of the Year',
        subtitle: 'Tech Innovations Ltd.',
        description: 'Recognition for excellence in mentoring and developing new talent in technology.',
        date: '2023-12-01',
        type: 'achievement',
        icon: '👨‍🏫',
        color: 'text-purple-500',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    }
];

// Função para filtrar eventos da timeline
// Timeline event filter function
export const filterTimelineEvents = (
    events: TimelineEvent[],
    filter: { type?: string; featured?: boolean }
): TimelineEvent[] => {
    return events.filter(event => {
        if (filter.type && filter.type !== 'all' && event.type !== filter.type) {
            return false;
        }

        if (filter.featured !== undefined && event.featured !== filter.featured) {
            return false;
        }

        return true;
    });
};

// Timeline event sorting function
export const sortTimelineEvents = (
    events: TimelineEvent[],
    order: 'asc' | 'desc' = 'desc'
): TimelineEvent[] => {
    return [...events].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
};
