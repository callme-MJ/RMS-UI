export default [
  {
    id: 1,
    name: "Admin",
    path: "/admin",
    tabs: [
      {
        id: 1,
        name: "Dashboard",
        icon: "/assets/png/dashboard.png",
        link: "/admin/dashboard",
        isVisible: true,
      },
      {
        id: 2,
        name: "Institutes",
        icon: "/assets/png/institutes.png",
        link: "/admin/institute",
        isVisible: true,
      },
      {
        id: 3,
        name: "Coordinators",
        icon: "/assets/png/coordinator.png",
        link: "/admin/institute/coordinators",
        isVisible: true,
      },
      {
        id: 4,
        name: "Candidates",
        icon: "/assets/png/candidates.png",
        link: "/admin/institute/candidates",
        isVisible: true,
      },
      {
        id: 5,
        name: "Programs",
        icon: "/assets/png/programs.png",
        link: "/admin/programs",
        isVisible: true,
        children: [
          {
            id: 1,
            name: "Programs",
            link: "/admin/programs",
            isVisible: true,
          },
          {
            id: 2,
            name: "Categories",
            link: "/admin/programs/categories",
            isVisible: true,
          },
          {
            id: 3,
            name: "Registered topics",
            link: "/admin/programs/registered_topics",
            isVisible: true,
          },
        ],
      },
      {
        id: 6,
        name: "Scoreboard",
        icon: "/assets/png/scoreboard.png",
        link: "/admin/scoreboard",
        isVisible: false,
      },
      {
        id: 7,
        name: "Utilities",
        icon: "/assets/png/utilities.png",
        link: "/admin/utilities",
        isVisible: false,
      },
      {
        id: 8,
        name: "Controllers",
        icon: "/assets/png/controllers.png",
        link: "/admin/controller",
        isVisible: true,
      },
      {
        id: 9,
        name: "Settings",
        icon: "/assets/png/settings.png",
        link: "/admin/settings",
        isVisible: false,
      },
      {
        id: 10,
        name: "search",
        icon: "/assets/png/search.png",
        link: "/admin/search",
        isVisible: true,
      },
      {
        id: 11,
        name: "Overview",
        icon: "/assets/png/overview.png",
        link: "/admin/overview",
        isVisible: true,
      },
    ],
  },
  {
    id: 2,
    name: "Institute",
    path: "/portal",
    tabs: [
      {
        id: 1,
        name: "Dashboard",
        icon: "/assets/png/dashboard.png",
        link: "/portal/dashboard",
        isVisible: false,
      },
      {
        id: 2,
        name: "Candidates",
        icon: "/assets/png/candidates.png",
        link: "/portal/candidates",
        isVisible: true,
      },

      {
        id: 3,
        name: "Programs",
        icon: "/assets/png/programs.png",
        link: "/portal/programs",
        isVisible: true,
        children: [
          // {
          //   id: 1,
          //   name: "Register programs",
          //   link: "/portal/programs/program_registration",
          //   isVisible: true,
          // },
          {
            id: 2,
            name: "Registered programs",
            link: "/portal/programs/registered_programs",
            isVisible: true,
          },
          {
            id: 3,
            name: "Topic registration",
            link: "/portal/programs/topic_registration",
            isVisible: true,
          },
        ],
      },

      {
        id: 4,
        name: "Scoreboard",
        icon: "/assets/png/scoreboard.png",
        link: "/portal/scoreboard",
        isVisible: false,
      },
      {
        id: 4,
        name: "Settings",
        icon: "/assets/png/settings.png",
        link: "/portal/settings",
        isVisible: false,
      },
      {
        id: 5,
        name: "Search",
        icon: "/assets/png/search.png",
        link: "/portal/search",
        isVisible: true,
      },
      {
        id: 4,
        name: "Overview",
        icon: "/assets/png/overview.png",
        link: "/portal/overview",
        isVisible: true,
      },
    ],
  },
  {
    id: 3,
    name: "controller",
    path: "/control",
    tabs: [
      {
        id: 1,
        name: "Dashboard",
        icon: "/assets/png/dashboard.png",
        link: "/control/dashboard",
        isVisible: true,
      },
      {
        id: 1,
        name: "Print judge form",
        icon: "/assets/png/scoreboard.png",
        link: "/control/print-judge-form",
        isVisible: true,
      },
      {
        id: 1,
        name: "Add Code Letter",
        icon: "/assets/png/scoreboard.png",
        link: "/control/code-letter",
        isVisible: true,
      },
      {
        id: 1,
        name: "Mark Entry",
        icon: "/assets/png/scoreboard.png",
        link: "/control/elimination_markEntry",
        isVisible: false,
      },
      {
        id: 1,
        name: "Mark Entry",
        icon: "/assets/png/scoreboard.png",
        link: "/control/final-mark-entry",
        isVisible: true,
      },
      {
        id: 2,
        name: "Candidate Selection",
        icon: "/assets/png/scoreboard.png",
        link: "/control/candidate-selection",
        isVisible: false,
      },
      {
        id: 2,
        name: "Add Position",
        icon: "/assets/png/scoreboard.png",
        link: "/control/set-position",
        isVisible: true,
      },
      {
        id: 3,
        name: "Publish Result",
        icon: "/assets/png/scoreboard.png",
        link: "/control/publish-elimination-result",
        isVisible: false,
      },
      {
        id: 3,
        name: "Publish Result",
        icon: "/assets/png/scoreboard.png",
        link: "/control/publish-final-result",
        isVisible: true,
      },
      {
        id: 3,
        name: "Institutions Result",
        icon: "/assets/png/scoreboard.png",
        link: "/control/institution-result",
        isVisible: true,
      },
      {
        id: 4,
        name: "Overview",
        icon: "/assets/png/overview.png",
        link: "/control/overview",
        isVisible: true,
      },
    ],
  },
  {
    id: 4,
    name: "media",
    path: "/media",
    tabs: [
      {
        id: 1,
        name: "Dashboard",
        icon: "/assets/png/dashboard.png",
        link: "/media/dashboard",
        isVisible: true,
      },
      {
        id: 2,
        name: "News",
        icon: "/assets/png/news.png",
        link: "/media/news",
        isVisible: true,
      },
      {
        id: 3,
        name: "Gallery",
        icon: "/assets/png/gallery.webp",
        link: "/media/gallery",
        isVisible: true,
      },
    ],
  },
  {
    id: 5,
    name: "Volunteer",
    path: "/volunteer",
    tabs: [
      {
        id: 1,
        name: "Dashboard",
        icon: "/assets/png/dashboard.png",
        link: "/volunteer/dashboard",
        isVisible: true,
      },
      {
        id: 2,
        name: "Add Judge",
        icon: "/assets/png/dashboard.png",
        link: "/volunteer/add-judge",
        isVisible: true,
      },
    ],
  },
];
