const { connectDB } = require('./config/db');
const Career = require('./models/Career');
const UserProfile = require('./models/UserProfile');
const LearningPath = require('./models/LearningPath');
const Progress = require('./models/Progress');

const seed = async () => {
  await connectDB();

  await Career.deleteMany({});
  await UserProfile.deleteMany({});
  await LearningPath.deleteMany({});
  await Progress.deleteMany({});

  const career = await Career.create({
    title: 'Full Stack Developer',
    description: 'Build web applications from front to back',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML', 'CSS'],
    avgSalary: '$120,000',
  });

  await Career.create({
    title: 'Data Scientist',
    description: 'Analyze data and build ML models',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'R'],
    avgSalary: '$130,000',
  });

  await UserProfile.create({
    userId: 'user1',
    currentSkills: ['JavaScript', 'HTML', 'CSS'],
    targetCareer: career._id,
    gap: ['React', 'Node.js', 'MongoDB'],
  });

  await LearningPath.create({
    careerId: career._id,
    steps: [
      { title: 'Learn React Basics', resources: ['React docs', 'Online course'], duration: '2 weeks' },
      { title: 'Build a React App', resources: ['Tutorial project'], duration: '3 weeks' },
      { title: 'Learn Node.js & Express', resources: ['Node.js docs'], duration: '3 weeks' },
      { title: 'Learn MongoDB', resources: ['MongoDB University'], duration: '2 weeks' },
    ],
  });

  console.log('Seed complete');
  process.exit(0);
};

seed();
