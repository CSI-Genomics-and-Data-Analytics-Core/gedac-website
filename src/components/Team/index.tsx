import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';

type TeamMember = {
  name: string;
  github: string;
  scholar: string;
  position: string;
  image: string;
};

const team: TeamMember[] = [
  {
    name: "Person 1",
    github: "https://github.com/alicejohnson",
    scholar: "https://scholar.google.com/citations?user=alice123",
    position: "Prinicpal Investigator",
    image: "",
  },
  {
    name: "Person 2",
    github: "https://github.com/bsmith",
    scholar: "https://scholar.google.com/citations?user=bob456",
    position: "Research Associate Professor",
    image: "",
  },
  {
    name: "Person 3",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "Senior Research Scientist",
    image: "",
  },
  {
    name: "Person 4",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "Senior Research Scientist",
    image: "",
  },
  {
    name: "Person 5",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "IT Manager",
    image: "",
  },
  {
    name: "Person 6",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "Research Associate",
    image: "",
  },
  {
    name: "Person 7",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "Software Engineer",
    image: "",
  },
  {
    name: "Person 8",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "Research Fellow",
    image: "",
  },
  {
    name: "Person 9",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "Research Fellow",
    image: "",
  },
  {
    name: "Person 10",
    github: "https://github.com/catlee",
    scholar: "https://scholar.google.com/citations?user=cat789",
    position: "IT Analyst",
    image: "",
  },
];

const TeamCard: React.FC<TeamMember> = ({ name, github, scholar, position }) => {
  return(
      <Card sx={{ maxWidth: 200 }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { name }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            { position }
          </Typography>
        </CardContent>
      </Card>
  );
};

const TeamPagePeople: React.FC = () => {
  return (
    <div className={styles.flexContainer}>
      {team.map((member) => (
        <TeamCard key={member.name} {...member} />
      ))}
    </div>
  );
};

export default TeamPagePeople;
