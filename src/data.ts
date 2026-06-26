export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  overview: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  accent: string;
  repository: string;
};

export const projects: Project[] = [
  {
    id: "signtalk",
    title: "SignTalk",
    category: "Embedded AI • Assistive Technology",
    year: "2024",
    tagline: "AI-Powered Sign Language Translation Glove for accessible communication.",
    overview:
      "SignTalk is an award-winning wearable communication system designed to bridge the gap between sign language users and non-sign language users. The glove utilizes multi-sensor fusion and embedded processing to recognize hand gestures and convert them into real-time text output.",
    architecture: [
      "Multi-sensor fusion for gesture detection",
      "Embedded processing for real-time translation",
      "Wearable glove with sensor integration",
      "Text output interface for communication",
    ],
    metrics: [
      { label: "Award", value: "Best Socially Relevant Project" },
      { label: "Recognition", value: "Real-time" },
      { label: "Technology", value: "Wearable" },
      { label: "Impact", value: "Assistive" },
    ],
    stack: ["C++", "Arduino", "IoT", "Sensor Fusion", "Embedded Systems"],
    accent: "#5B8CFF",
    repository: "https://github.com/AnupamMI/Smart-Glove-Safety-Device",
  },
  {
    id: "drqn-platform",
    title: "Deep RL Research Platform",
    category: "Artificial Intelligence • Research",
    year: "2026",
    tagline: "Deep Reinforcement Learning for partially observable environments.",
    overview:
      "A configurable research platform for studying decision-making in partially observable environments using Deep Reinforcement Learning. The project evaluates Deep Q-Networks (DQN) and Deep Recurrent Q-Networks (DRQN) across multiple experimental configurations.",
    architecture: [
      "DRQN-based framework with LSTM memory",
      "POMDP gridworld environment",
      "DQN baseline comparison",
      "16 experimental seed evaluation",
    ],
    metrics: [
      { label: "Award", value: "IEEE ICICGR 2026 Best Paper" },
      { label: "Improvement", value: "+23%" },
      { label: "Seeds", value: "16" },
      { label: "Framework", value: "POMDP" },
    ],
    stack: ["Python", "PyTorch", "LSTM", "Reinforcement Learning", "DRQN"],
    accent: "#7EE7FF",
    repository: "https://github.com/AnupamMI/DRQN_POMDP_Project",
  },
  {
    id: "carelink",
    title: "CareLink",
    category: "Healthcare Technology",
    year: "2024",
    tagline: "Intelligent Healthcare Companion with unified wellness management.",
    overview:
      "CareLink is a cross-platform healthcare application that combines medication management, fitness tracking, health analytics, and AI-assisted healthcare guidance into a single unified platform.",
    architecture: [
      "Six integrated healthcare modules",
      "Medication management system",
      "Fitness tracking integration",
      "AI-powered health assistant",
    ],
    metrics: [
      { label: "Award", value: "APPTHETICS 3.0 1st Place" },
      { label: "Modules", value: "6" },
      { label: "Platform", value: "Cross-platform" },
      { label: "AI", value: "Integrated" },
    ],
    stack: ["React Native", "Expo", "TypeScript"],
    accent: "#5B8CFF",
    repository: "https://github.com/AnupamMI/CareLink",
  },
  {
    id: "skill-gap-radar",
    title: "AI Skill Gap Radar",
    category: "Natural Language Processing",
    year: "2024",
    tagline: "Career development platform with intelligent competency analysis.",
    overview:
      "An intelligent career development platform that analyzes resumes, identifies competency gaps, and recommends personalized learning pathways aligned with target job roles.",
    architecture: [
      "Resume intelligence engine",
      "Competency mapping system",
      "Cosine similarity analysis",
      "Personalized recommendation algorithm",
    ],
    metrics: [
      { label: "Analysis", value: "Resume-based" },
      { label: "Mapping", value: "Competency" },
      { label: "Recommendations", value: "Personalized" },
      { label: "Pathways", value: "Career" },
    ],
    stack: ["Python", "NLP", "Machine Learning", "Cosine Similarity"],
    accent: "#7EE7FF",
    repository: "https://github.com/AnupamMI/skill-gap-radar",
  },
];

export type Experience = {
  id: string;
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "AI/ML Researcher",
    org: "VIT-AP University",
    period: "2026 — Present",
    summary:
      "Conducting research in Deep Reinforcement Learning with a focus on belief-state learning in partially observable environments. Developed and evaluated DRQN-based architectures for sequential decision-making under uncertainty.",
    highlights: [
      "IEEE Best Paper Award – ICICGR 2026",
      "Achieved approximately 23% performance improvement over traditional DQN models",
      "Published research on DRQN-based belief-state learning for POMDP environments",
    ],
  },
  {
    id: "exp-2",
    role: "Technical Lead",
    org: "Microsoft Student Chapter, VIT-AP",
    period: "2025",
    summary:
      "Led technical initiatives, workshops, and collaborative development activities within the student chapter while mentoring peers on software engineering and emerging technologies.",
    highlights: [
      "Led technical activities for a 30+ member student community",
      "Organized workshops and technical sessions",
      "Promoted collaborative software development and peer learning",
    ],
  },
  {
    id: "exp-3",
    role: "Project Team Member",
    org: "Machine Learning Club, VIT-AP",
    period: "2025",
    summary:
      "Worked on applied machine learning projects involving Natural Language Processing, model evaluation, and recommendation systems.",
    highlights: [
      "Contributed to NLP-based intelligent systems",
      "Applied feature engineering and model evaluation techniques",
      "Collaborated on AI-driven student projects",
    ],
  },
  {
    id: "exp-4",
    role: "Winner – APPTHETICS 3.0",
    org: "CareLink Healthcare Platform",
    period: "2025",
    summary:
      "Designed and developed CareLink, an AI-powered healthcare application integrating medication tracking, fitness monitoring, accessibility features, and intelligent health assistance.",
    highlights: [
      "1st Place Winner at APPTHETICS 3.0",
      "Built six integrated healthcare modules",
      "Developed proprietary CareScore wellness metric",
    ],
  },
  {
    id: "exp-5",
    role: "Best Socially Relevant Project",
    org: "SignTalk – Smart Communication Glove",
    period: "2024",
    summary:
      "Developed a wearable assistive technology solution that translates sign language gestures into real-time text through multi-sensor fusion and embedded processing.",
    highlights: [
      "Best Socially Relevant Project Award",
      "Built real-time gesture translation system",
      "Integrated Arduino-based embedded hardware and sensor fusion",
    ],
  },
  {
    id: "exp-6",
    role: "B.Tech Computer Science Engineering (AI & ML)",
    org: "VIT-AP University",
    period: "2023 — Present",
    summary:
      "Building expertise across Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Reinforcement Learning, and Full Stack Development.",
    highlights: [
      "CGPA: 8.7 / 10",
      "IEEE Published Researcher",
      "Hackathon Winner & Technical Lead",
    ],
  },
];

export type SkillCategory = {
  id: string;
  label: string;
  radius: number;
  speed: number;
  tilt: number;
  skills: string[];
  color: string;
};

export const skillCategories: SkillCategory[] = [
  {
    id: "core-expertise",
    label: "Core Expertise",
    radius: 2.2,
    speed: 0.12,
    tilt: 0.3,
    color: "#DA3A16",
    skills: [
      "Deep Reinforcement Learning",
      "Natural Language Processing",
      "Machine Learning",
      "Research & Experimentation",
      "AI & Data Science",
      "PyTorch",
      "scikit-learn",
      "Sequence Modeling",
      "Feature Engineering",
      "Model Evaluation",
      "Data Analysis",
    ],
  },
  {
    id: "software-dev",
    label: "Software Development",
    radius: 2.8,
    speed: -0.08,
    tilt: -0.4,
    color: "#5B8CFF",
    skills: ["Python", "Java", "C++", "React Native", "TypeScript", "JavaScript"],
  },
  {
    id: "embedded-iot",
    label: "Embedded & IoT",
    radius: 3.4,
    speed: 0.06,
    tilt: 0.5,
    color: "#7EE7FF",
    skills: ["Arduino", "Raspberry Pi", "Sensor Fusion", "Embedded Systems", "IoT Development"],
  },
  {
    id: "engineering-foundations",
    label: "Engineering Foundations",
    radius: 4.0,
    speed: -0.05,
    tilt: -0.2,
    color: "#5B8CFF",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Git & GitHub",
      "Technical Writing",
      "Research Methodology",
    ],
  },
];

export const stats = [
  { label: "CGPA", value: "8.7", suffix: "/10" },
  { label: "Projects", value: "4", suffix: "" },
  { label: "Years", value: "4", suffix: "" },
  { label: "Awards", value: "3", suffix: "" },
];

export const navSections = [
  { id: "hero", label: "Index" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

export type ResearchPaper = {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  tags: string[];
  protocol: {
    seeds: number;
    episodes: number;
    gridSize: string;
    observationWindow: string;
    gamma: number;
    lstmHiddenSize: number;
  };
  performance: {
    drqnMeanReward: number;
    dqnMeanReward: number;
    netImprovement: number;
    pValue: number;
    cohenD: number;
  };
  insight: string;
};

export const researchPaper: ResearchPaper = {
  id: "drqn-paper",
  title: "Belief-State Learning in Partially Observable Environments using DRQN",
  subtitle: "A Deep Recurrent Q-Network (DRQN) framework for Partially Observable Markov Decision Processes (POMDPs)",
  context: "The study investigates how temporal memory influences decision-making under partial observability by comparing DQN and DRQN agents in a custom 8×8 gridworld where only a local 5×5 observation window is available. Across 16 independent training seeds, DRQN consistently outperformed DQN, achieving higher average rewards, lower variance, and approximately 23% performance improvement through LSTM-based belief-state formation.",
  tags: ["POMDPs", "DRQN", "LSTM", "Reinforcement Learning", "IEEE"],
  protocol: {
    seeds: 16,
    episodes: 600,
    gridSize: "8×8",
    observationWindow: "5×5",
    gamma: 0.99,
    lstmHiddenSize: 64,
  },
  performance: {
    drqnMeanReward: -39.67,
    dqnMeanReward: -51.63,
    netImprovement: 23.17,
    pValue: 0.020,
    cohenD: 0.65,
  },
  insight: "Temporal memory enables the agent to form implicit belief-state representations, resulting in faster convergence, reduced variance, and more reliable decision-making under partial observability.",
};
