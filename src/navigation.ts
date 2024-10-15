import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Use Cases',
      href: getPermalink('/#use-cases'),
    },
    {
      text: 'Showcase',
      href: getPermalink('/#showcase'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'FAQ',
      href: getPermalink('/#faq'),
    },

  ],
  actions: [{ text: 'Cloud Flow', href: 'https://www.pipeline.gedac.org', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Features', href: '/#features' },
        { text: 'Team', href: '/#team' },
        { text: 'Usecase', href: '/#use-cases' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'GeDaC Cloud Flow', href: 'https://www.pipeline.gedac.org', target: '_blank' },
        { text: 'GeDaC Connect', href: 'https://connect.gedac.org/', target: '_blank' },
        { text: 'S3 Cost Analyzer', href: 'https://www.s3.gedac.org/', target: '_blank' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Desk',  href: '', id: 'help-desk-link' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '/#about' },
        { text: 'Blog', href: '/blog' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/csi_singapore' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/CSI-Genomics-and-Data-Analytics-Core' },
  ],
  footNote: ' &copy; 2024 GeDaC · All rights reserved',
};
