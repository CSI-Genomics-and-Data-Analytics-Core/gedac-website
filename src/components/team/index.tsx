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
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2022/12/image7-150x150-1.png',
  },
];

const serviceLeads: TeamMember[] = [
  {
    name: "Henry Yang",
    position: "Associate Professor",
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2022/12/henry-150x150-1.png',
  },
  {
    name: "Tony Tan",
    position: "Senior Research Scientist",
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2022/12/Tony-TAN-150x150-1.jpg',
  },
  {
    name: "CK Ong",
    position: "IT Manager",
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2022/12/ck-1-150x150-1.jpg',
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Li Ying",
    position: "IT Manager",
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2022/12/Wordpress-671-x-515-px-5-150x150-1.png',
  },
  {
    name: "Linganesan Mani",
    position: "Software Engineer",
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2022/12/Linganesan-Kularatnarajah-GeDaC-150x150-1.jpg',
  },
  {
    name: "Chris Dean",
    position: "Research Fellow",
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2024/09/Wordpress-671-x-515-px-91.png',
  },
  {
    name: "Hannan Wong",
    position: "Research Fellow",
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2022/11/JP-Hannan-Wong-PhD-Student-1.jpg',
  },
  {
    name: "Chia Y. Keng",
    position: "IT Analyst",
    image: 'https://csi.nus.edu.sg/wp-content/uploads/2022/12/PHOTO_20210918_103645-03-150x150-1.jpeg',
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
