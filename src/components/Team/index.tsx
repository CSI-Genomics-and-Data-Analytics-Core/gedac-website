import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';
import { CardActionArea } from '@mui/material';

type TeamMember = {
  name: string;
  position: string;
  image: string;
};

let hero = "/img/hero.png";

const facilityHead: TeamMember[] = [
  {
    name: "Jason Pitt",
    position: "Principal Investigator",
    image: hero,
  },
];

const serviceLeads: TeamMember[] = [
  {
    name: "Henry Yang",
    position: "Associate Professor",
    image: hero,
  },
  {
    name: "Kumaran Mande",
    position: "Senior Research Scientist",
    image: hero,
  },
  {
    name: "Tony Tan",
    position: "Senior Research Scientist",
    image: hero,
  },
  {
    name: "CK Ong",
    position: "IT Manager",
    image: hero,
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Li Ying",
    position: "IT Manager",
    image: hero,
  },
  {
    name: "Linganesan Mani",
    position: "Software Engineer",
    image: hero,
  },
  {
    name: "Chris Dean",
    position: "Research Fellow",
    image: hero,
  },
  {
    name: "Hannan Wong",
    position: "Research Fellow",
    image: hero,
  },
  {
    name: "Chia Y. Keng",
    position: "IT Analyst",
    image: hero,
  },
];

const TeamCard: React.FC<TeamMember> = ({ name, position, image }) => {
  return(
      <Card sx={{ width: 200, height: 250, display: 'flex', flexDirection: 'column' }}>
        <CardMedia 
          sx={{ height: 200 }}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
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
    <div className={styles.teamContainer}>
      <section className={styles.teamSection}>
        <h1 className={styles.sectionTitle}>Facility Head</h1>
        <div className={styles.teamGrid}>
          {facilityHead.map((member) => (
            <TeamCard key={member.name} {...member}/>
          ))}
        </div>
      </section>

      <section className={styles.teamSection}>
        <h1 className={styles.sectionTitle}>Service Leads</h1>
        <div className={styles.teamGrid}>
          {serviceLeads.map((member) => (
            <TeamCard key={member.name} {...member}/>
          ))}
        </div>
      </section>

      <section className={styles.teamSection}>
        <h1 className={styles.sectionTitle}>Team Members</h1>
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <TeamCard key={member.name} {...member}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamPagePeople;
