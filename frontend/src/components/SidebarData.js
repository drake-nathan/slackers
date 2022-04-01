import React from 'react';
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
// import * as BiIcons from 'react-icons/bi';
// import * as TiIcons from 'react-icons/ti';
import * as HiIcons from 'react-icons/hi';

export const SidebarData = [
  {
    title: 'Channels',
    path: '#',
    iconClosed: <RiIcons.RiArrowRightSFill />,
    iconOpened: <RiIcons.RiArrowDownSFill />,
    subNav: [
      {
        title: 'private-channel',
        path: '#',
        icon: <AiIcons.AiOutlineLock />,
      },
      {
        title: 'general',
        path: '#',
        icon: <HiIcons.HiOutlineHashtag />,
      },
      {
        title: 'slackers',
        path: '#',
        icon: <HiIcons.HiOutlineHashtag />,
      },
    ],
  },
];
