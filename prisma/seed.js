const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing data
  await prisma.admin.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.portfolioContent.deleteMany({});
  await prisma.certificate.deleteMany({});

  // 2. Seed Admin
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      passwordHash,
    },
  });
  console.log('Admin user created:', admin.username);

  // 3. Seed Projects
  const projects = [
    {
      title: 'Hotel Management System',
      description: 'A comprehensive full-stack solution for managing hotel operations, including room bookings, billing, guest check-in/out, and staff allocation. Features an interactive dashboard with real-time statistics.',
      technologies: 'React.js, Node.js, Express.js, MongoDB, Chart.js',
      githubUrl: 'https://github.com/Raksha-Shetty18',
      liveUrl: 'https://github.com/Raksha-Shetty18',
      imageUrl: '/hotel-management.jpg',
    },
    {
      title: 'WeatherNow',
      description: 'A dynamic weather forecasting application that provides real-time weather details, 7-day forecasts, air quality indices, and severe weather alerts. Features a sleek responsive design with auto-updating backgrounds.',
      technologies: 'HTML5, CSS3, JavaScript, OpenWeatherMap API, Geolocation API',
      githubUrl: 'https://github.com/Raksha-Shetty18',
      liveUrl: 'https://github.com/Raksha-Shetty18',
      imageUrl: '/weathernow.jpg',
    },
    {
      title: 'Daily Planner',
      description: 'An elegant task management app to organize daily schedules. Includes priority labels, categorization, calendar sync, recurring tasks, drag-and-drop ordering, and progress visualizers.',
      technologies: 'React.js, LocalStorage API, CSS Grid, HTML5 Drag and Drop',
      githubUrl: 'https://github.com/Raksha-Shetty18',
      liveUrl: 'https://github.com/Raksha-Shetty18',
      imageUrl: '/daily-planner.jpg',
    },
  ];

  for (const proj of projects) {
    const created = await prisma.project.create({ data: proj });
    console.log('Project created:', created.title);
  }

  // 4. Seed Skills
  const skills = [
    // Frontend
    { name: 'HTML5 / CSS3', category: 'Frontend', iconName: 'Html5', proficiency: 95 },
    { name: 'JavaScript (ES6+)', category: 'Frontend', iconName: 'Js', proficiency: 90 },
    { name: 'TypeScript', category: 'Frontend', iconName: 'Type', proficiency: 85 },
    { name: 'React.js / Next.js', category: 'Frontend', iconName: 'React', proficiency: 90 },
    // Backend
    { name: 'Node.js', category: 'Backend', iconName: 'Node', proficiency: 88 },
    { name: 'Express.js', category: 'Backend', iconName: 'Express', proficiency: 85 },
    { name: 'REST APIs', category: 'Backend', iconName: 'Api', proficiency: 90 },
    // Databases
    { name: 'PostgreSQL', category: 'Database', iconName: 'Postgres', proficiency: 80 },
    { name: 'MongoDB', category: 'Database', iconName: 'Mongo', proficiency: 85 },
    { name: 'MySQL', category: 'Database', iconName: 'Mysql', proficiency: 82 },
    { name: 'SQLite', category: 'Database', iconName: 'Sqlite', proficiency: 85 },
    // Tools
    { name: 'Git / GitHub', category: 'Tools', iconName: 'Git', proficiency: 90 },
    { name: 'VS Code', category: 'Tools', iconName: 'Code', proficiency: 95 },
    { name: 'Postman', category: 'Tools', iconName: 'Terminal', proficiency: 88 },
    { name: 'Vercel / Netlify / Heroku', category: 'Tools', iconName: 'Cloud', proficiency: 85 },
  ];

  for (const sk of skills) {
    const created = await prisma.skill.create({ data: sk });
    console.log('Skill created:', created.name);
  }

  // 5. Seed PortfolioContent
  const contents = [
    { section: 'hero', key: 'name', value: 'Raksha' },
    { section: 'hero', key: 'title', value: 'Full Stack Developer' },
    { section: 'hero', key: 'tagline', value: 'Building elegant, high-performance web applications that bridge the gap between robust backends and premium user interfaces.' },
    { section: 'hero', key: 'resumeUrl', value: '/uploads/Raksha_Resume.pdf' },
    { section: 'about', key: 'introduction', value: 'Hello! I am Raksha, a passionate Full Stack Developer with a keen eye for clean aesthetics and high-performance code. I specialize in the Javascript/Typescript ecosystem, constructing complete web systems from schema design to smooth pixel-perfect animations.' },
    { section: 'about', key: 'education', value: 'Bachelor of Engineering in Computer Science' },
    { section: 'about', key: 'careerObjective', value: 'Seeking a challenging Full Stack Developer position where I can utilize my engineering skills to build scalable, interactive web solutions and contribute to product-driven growth.' },
    { section: 'about', key: 'interests', value: 'System Architecture, UI/UX Design, Web Animation, Cloud Infrastructure' },
  ];

  for (const content of contents) {
    const created = await prisma.portfolioContent.create({ data: content });
    console.log('Content created:', created.key);
  }

  const certificates = [
    {
      title: 'Full Stack Web Development Certification',
      issuer: 'Udemy Academic Program',
      date: '2025',
      credentialUrl: 'https://github.com/Raksha-Shetty18',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2026',
      credentialUrl: 'https://github.com/Raksha-Shetty18',
    },
    {
      title: 'Advanced React and Next.js Masterclass',
      issuer: 'Frontend Masters',
      date: '2026',
      credentialUrl: 'https://github.com/Raksha-Shetty18',
    },
  ];

  for (const cert of certificates) {
    const created = await prisma.certificate.create({ data: cert });
    console.log('Certificate created:', created.title);
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
