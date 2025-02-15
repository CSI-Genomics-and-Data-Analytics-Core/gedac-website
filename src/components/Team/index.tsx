import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
//import styles from './styles.module.css';

type TeamMember = {
  name: string;
  github: string;
  scholar: string;
  position: string;
  image: string;
};

const team: TeamMember[] = [
  {
    name: "Chris Dean",
    github: "https://github.com/alicejohnson",
    scholar: "https://scholar.google.com/citations?user=alice123",
    position: "Data Scientist",
    image: "",
  },
  {
    name: "Mani L.",
    github: "https://github.com/bsmith",
    scholar: "https://scholar.google.com/citations?user=bob456",
    position: "Software Engineer",
    image: "",
  },
  {
    name: "Kumar A.",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "Researcher",
    image: "",
  },
];

const TeamCard: React.FC<TeamMember> = ({ name, github, scholar, position }) => {
  return(
    <div className="max-w-sm p-6 bg-white border border-gray-400 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{position}</p>
    </div>
  );
};
  /*return (
    <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-2xl max-w-xs">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-500">{position}</p>
      <div className="mt-4 flex flex-col gap-2">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          GitHub Profile
        </a>
        <a
          href={scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Google Scholar
        </a>
      </div>
    </div>
  );
};*/

const TeamPagePeople: React.FC = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-6 p-6">
      {team.map((member) => (
        <TeamCard key={member.name} {...member} />
      ))}
    </div>
  );
};

export default TeamPagePeople;
