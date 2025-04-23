import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { FaCloud, FaCalculator, FaGithub, FaNewspaper } from "react-icons/fa";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Genomics and Data Analytics Core",
  tagline: "",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.gedac.org/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "CSI-Genomics-and-Data-Analytics-Core", // Usually your GitHub org/user name.
  projectName: "gedac-website", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * Required for any multi-instance plugin
         */
        id: "news",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "news",
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: "./news",
      },
    ],
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-45MVK0RVRW",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "favicon.ico",
    navbar: {
      title: "Genomics and Data Analytics Core",
      logo: {
        alt: "Genomics and Data Analytics Core",
        src: "img/csi_nus_logo.png",
        style: { height: "40px" }, // Increase the size of the logo
      },
      items: [
        { to: "/news", label: "News", position: "right" },
        {
          to: "/category/services",
          sidebarId: "tutorialSidebar",
          position: "right",
          label: "Services",
        },
        {
          to: "/Research/Publications",
          sidebarId: "tutorialSidebar",
          position: "right",
          label: "Research",
        },
        {
          type: "dropdown",
          label: "Tools",
          position: "right",
          items: [
            {
              to: "/Helper",
              label: "Resource Helper",
            },
            {
              to: "/s3",
              label: "S3 Calculator",
            },
            {
              href: "https://cloudflow.gedac.org",
              label: "Cloudflow",
            },
          ],
        },
        // {
        //   to: "/Team",
        //   sidebarId: "tutorialSidebar",
        //   position: "right",
        //   label: "Team",
        // },
        // {
        //   to: "/Contact",
        //   sidebarId: "tutorialSidebar",
        //   position: "right",
        //   label: "Contact",
        // },
        {
          href: "https://github.com/CSI-Genomics-and-Data-Analytics-Core",
          label: "GitHub",
          position: "right",
        },
        // {
        //   href: "https://cloudflow.gedac.org",
        //   label: "Cloudflow",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Site",
          items: [
            {
              label: "Services",
              to: "/category/services",
            },
            {
              label: "Research",
              to: "/Research/Publications",
            },
            {
              label: "Resource Helper",
              to: "/Helper",
            },
          ],
        },
        {
          title: "Connect",
          items: [
            {
              label: "Twitter",
              href: "https://x.com/csi_singapore",
            },
            {
              label: "GitHub",
              href: "https://github.com/CSI-Genomics-and-Data-Analytics-Core",
            },
            {
              label: "Cloudflow",
              href: "https://cloudflow.gedac.org",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "News",
              to: "/news",
            },
            {
              label: "CSI Singapore",
              href: "https://csi.nus.edu.sg/",
            },
            {
              label: "NUS",
              href: "https://nus.edu.sg/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CSI - Genomics and Data Analytics Core, National University of Singapore. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  scripts: [
    {
      src: "https://widget.freshworks.com/widgets/150000001296.js",
      async: true,
      defer: true,
    },
    // For inline scripts, use this format instead
    {
      src: "/freshworks-init.js",
      async: false,
    },
  ],
};

export default config;
