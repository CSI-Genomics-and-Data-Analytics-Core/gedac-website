import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Services',
      href: getPermalink('/#features'),
      icon: 'tabler:settings',
    },
    {
      text: 'Use Cases',
      links: [
        {
          text: 'Hire Bioinformatician(s)',
          href: getPermalink('/consultation'),
          icon: 'tabler:user',
        },
        {
          text: 'CloudFlow',
          href: getPermalink('/cloudflow'),
          icon: 'tabler:cloud',
        },
        {
          text: 'Software Development',
          href: getPermalink('/software'),
          icon: 'tabler:code',
        },
        {
          text: 'Data Storage Solutions',
          href: getPermalink('/storage'),
          icon: 'tabler:database',
        }
      ],
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
      icon: 'tabler:book',
    },
    {
      text: 'FAQ',
      href: getPermalink('/#faq'),
      icon: 'tabler:help',
    },
  ],
  actions: [{ text: 'Cloud Flow', href: 'https://www.cloudflow.gedac.org', target: '_blank', icon: 'tabler:rocket', }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Bioinformatics Consultaitons', href: '/consultation' },
        { text: 'Software Development', href: '/software' },
        { text: 'Data Storage Solutions', href: '/storage' },

      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'GeDaC Cloud Flow', href: 'https://www.cloudflow.gedac.org', target: '_blank' },
        { text: 'GeDaC Connect', href: 'https://connect.gedac.org/', target: '_blank' },
        { text: 'S3 Cost Analyzer', href: 'https://www.s3.gedac.org/', target: '_blank' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Desk',  href: 'https://support.gedac.org/support/tickets/new', id: 'help-desk-link', target: '_blank' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', target:'_blank', href: 'https://csi.nus.edu.sg/' },
        { text: 'Blog', href: '/blog' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Team', target: '_blank', href: 'https://csi.nus.edu.sg/our-research/core-facilities/genomics-and-data-analytics-core-gedac/' },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/CSI-Genomics-and-Data-Analytics-Core' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/csi_singapore' },
  ],
  footNote: ' &copy; 2025 GeDaC · All rights reserved',
};
