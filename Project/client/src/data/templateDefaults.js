export const templateDefaults = {
    // DEFAULT / FALLBACK
    'default': {
        personalInfo: {
            fullName: 'Your Name',
            email: 'email@example.com',
            phone: '(555) 123-4567',
            address: 'City, State',
            title: 'Professional Title',
            summary: "Experienced professional with a proven track record of success. Dedicated to continuous learning and contributing to team goals.",
            linkedin: "linkedin.com/in/yourname",
            github: "github.com/yourname",
            website: "yourportfolio.com"
        },
        experience: [
            { id: 'e1', title: 'Position Title', company: 'Company Name', duration: '2020 - Present', description: "• Achieved key milestone X, resulting in Y% improvement.\n• Led a team of Z people to complete project.\n• Implemented new process that increased efficiency." }
        ],
        education: [
            { id: 'ed1', degree: 'Bachelor of Science', school: 'University Name', year: '2016 - 2020' }
        ],
        skills: [
            { category: "Core Skills", items: ['Skill 1', 'Skill 2', 'Skill 3'] }
        ],
        certifications: []
    },

    // 1. TECHNOLOGY (Senior Full Stack Developer)
    'modern-tech': {
        personalInfo: {
            fullName: 'Ravi Raj',
            email: 'raviraj829499@gmail.com',
            phone: '+1 (415) 555-0100',
            address: 'San Francisco, CA',
            title: 'Senior Full Stack Developer',
            summary: "Innovative Senior Full Stack Developer with over 7 years of experience. Specialist in building high-performance web applications using React and Node.js. Proven track record of leading cross-functional teams in agile environments.",
            linkedin: "linkedin.com/in/raviraj",
            github: "github.com/raviraj",
            website: "raviraj.dev"
        },
        experience: [
            {
                id: 'exp1',
                title: 'Senior Software Engineer',
                company: 'TechFlow Solutions',
                duration: '2021 - Present',
                description: "• Industry Focus (Tech): Architected migration from monolithic to microservices using Node.js and Docker, improving reliability by 40%.\n• Leadership: Mentored a team of 5 junior developers and implemented code review best practices.\n• Performance: Optimized MongoDB queries, reducing API response times by 300ms."
            },
            {
                id: 'exp2',
                title: 'Software Developer',
                company: 'Innovatex Inc.',
                duration: '2018 - 2021',
                description: "• Industry Focus (Finance/Medical): Developed interactive dashboards used by 10,000+ daily active users.\n• Security/Compliance: Integrated Stripe payment gateways and implemented OAuth2 authentication flows.\n• Design Excellence: Collaborated with UI/UX designers for pixel-perfect feature implementation."
            }
        ],
        education: [
            { id: 'ed1', degree: 'B.S. Computer Science', school: 'University', year: '2014 - 2018' }
        ],
        skills: [
            { category: "Languages", items: ['JavaScript (ES6+)', 'TypeScript'] },
            { category: "Frameworks", items: ['React', 'Node.js'] },
            { category: "Database", items: ['MongoDB'] },
            { category: "Cloud/DevOps", items: ['AWS', 'Docker'] },
            { category: "Soft Skills", items: ['Agile Methodology', 'Team Leadership', 'Mentorship'] }
        ],
        certifications: [
            { name: "AWS Certified Developer", issuer: "Amazon", year: "2023" },
            { name: "Oracle Certified Professional", issuer: "Oracle", year: "2022" }
        ]
    },

    // 2. FINANCE (Investment & Risk Management)
    'corporate-finance': {
        personalInfo: {
            fullName: 'Ravi Raj',
            email: 'raviraj829499@gmail.com',
            phone: '+1 (415) 555-0100',
            address: 'San Francisco, CA',
            title: 'Senior Professional',
            summary: "Senior Professional with 7+ years of experience in financial systems and secure transactional architecture.",
            linkedin: "linkedin.com/in/raviraj-fin",
            github: "",
            website: ""
        },
        experience: [
            {
                id: 'exp1',
                title: 'Senior Financial Systems Lead',
                company: 'Global Banking Corp',
                duration: '2020 - Present',
                description: "• Experience: Integrated third-party payment gateways ensuring 100% secure transaction flows for 10,000+ daily users.\n• Achievements: Optimized financial database queries to reduce transaction processing latency by 300ms.\n• Leadership: Led a team of 5 in auditing legacy monolithic systems and migrating to secure, scalable microservices."
            }
        ],
        education: [
            { id: 'ed1', degree: 'B.S. Computer Science', school: 'University', year: '2014 - 2018' }
        ],
        skills: [
            { category: "Finance Core Skills", items: ['Risk Assessment', 'Financial Modeling', 'Quantitative Analysis', 'PCI-DSS Compliance', 'FinTech Integration'] },
            { category: "Tools", items: ['Bloomberg Terminal', 'Advanced Excel (VBA)', 'SQL', 'Stripe API'] }
        ],
        certifications: []
    },

    // 3. MEDICAL (Healthcare Operations & HealthTech)
    'healthcare-pro': {
        personalInfo: {
            fullName: 'Ravi Raj',
            email: 'raviraj829499@gmail.com',
            phone: '+1 (415) 555-0100',
            address: 'San Francisco, CA',
            title: 'Senior Healthcare Specialist',
            summary: "Senior Healthcare Operations Specialist dedicated to optimizing clinical user experiences and data reliability.",
            linkedin: "linkedin.com/in/raviraj-med",
            github: "",
            website: ""
        },
        experience: [
            {
                id: 'exp1',
                title: 'Clinical Systems Lead',
                company: 'HealthTech Solutions',
                duration: '2019 - Present',
                description: "• Experience: Collaborated with medical UX/UI designers to implement pixel-perfect diagnostic dashboards for healthcare providers.\n• Achievements: Improved clinical system reliability by 40% through the migration of legacy patient-record databases.\n• Leadership: Mentored clinical support teams and implemented best practices for data handling and secure authentication."
            }
        ],
        education: [
            { id: 'ed1', degree: 'B.S. Computer Science', school: 'University', year: '2014 - 2018' }
        ],
        skills: [
            { category: "Healthcare Skills", items: ['HIPAA Compliance', 'Clinical Workflow Optimization', 'EHR Systems', 'Data Privacy', 'Patient Experience Design'] }
        ],
        certifications: [
            { name: "Medical Data Security", issuer: "HealthBoard", year: "2023" },
            { name: "HIPAA Professional", issuer: "Compliance Org", year: "2022" }
        ]
    },

    // 4. MANAGEMENT (Operations & Project Leadership)
    'executive-lead': {
        personalInfo: {
            fullName: 'Ravi Raj',
            email: 'raviraj829499@gmail.com',
            phone: '+1 (415) 555-0100',
            address: 'San Francisco, CA',
            title: 'Senior Manager',
            summary: "Innovative Senior Manager with over 7 years of experience leading cross-functional teams to deliver high-performance solutions.",
            linkedin: "linkedin.com/in/raviraj-mgmt",
            github: "",
            website: ""
        },
        experience: [
            {
                id: 'exp1',
                title: 'Senior Operations Manager',
                company: 'Enterprise Corp',
                duration: '2018 - Present',
                description: "• Experience: Spearheaded the delivery of large-scale interactive platforms utilized by 10,000+ daily active users.\n• Achievements: Directed system-wide migrations that improved operational reliability by 40% and reduced response times.\n• Leadership: Mentored 5 junior leads, conducted performance reviews, and optimized team workflows in fast-paced environments."
            }
        ],
        education: [
            { id: 'ed1', degree: 'B.S. Computer Science', school: 'University', year: '2014 - 2018' }
        ],
        skills: [
            { category: "Leadership Skills", items: ['Strategic Planning', 'Agile Project Management', 'Stakeholder Relations', 'Team Mentorship', 'Resource Allocation'] },
            { category: "Frameworks", items: ['Scrum', 'Kanban', 'SDLC'] }
        ],
        certifications: []
    },

    // DESIGN (Included for completeness)
    'creative-design': {
        personalInfo: {
            fullName: 'Jordan Lee',
            email: 'jordan@design.com',
            phone: '555-0199',
            address: 'New York, NY',
            title: 'Lead Product Designer',
            summary: "Award-winning designer creating intuitive digital experiences.",
            linkedin: "linkedin.com/in/jordan",
            github: "dribbble.com/jordan",
            website: "jordan.design"
        },
        experience: [],
        education: [],
        skills: [
            { category: "Design Tools", items: ['Figma', 'Adobe CC', 'Sketch'] },
            { category: "Methodologies", items: ['User Research', 'Prototyping', 'Design Systems'] }
        ],
        certifications: []
    }
};

export const getTemplateDefault = (id) => {
    // Force specific mapping based on ID substrings
    if (id.includes('tech') || id.includes('startup')) return templateDefaults['modern-tech'];
    if (id.includes('finance')) return templateDefaults['corporate-finance'];
    if (id.includes('healthcare') || id.includes('medical')) return templateDefaults['healthcare-pro'];
    if (id.includes('executive') || id.includes('manager')) return templateDefaults['executive-lead'];
    if (id.includes('design') || id.includes('creative')) return templateDefaults['creative-design'];

    return templateDefaults['default'];
};
