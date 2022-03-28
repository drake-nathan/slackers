import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as TiIcons from 'react-icons/ti';
import * as HiIcons from 'react-icons/hi';

export const SidebarData = [
  {
    title: 'Threads',
    path: '/threads',
    icon: <BiIcons.BiMessageAltDetail />,
  },
  {
    title: 'All DMs',
    path: '/direct-messages',
    icon: <TiIcons.TiMessages />,
  },
  {
    title: 'Mentions & reactions',
    path: '/mentions',
    icon: <HiIcons.HiAtSymbol />,
  },
  {
    title: 'Channels',
    path: '/channels',
    iconClosed: <RiIcons.RiArrowRightSFill />,
    iconOpened: <RiIcons.RiArrowDownSFill />,
    subNav: [
      {
        title: 'private-channel',
        path: '/private-channel',
        icon: <AiIcons.AiOutlineLock />,
      },
      {
        title: 'general',
        path: '/general',
        icon: <HiIcons.HiHashtag />,
      },
    ],
  },
  {
    title: 'Direct messages',
    path: 'direct-messages',
    iconClosed: <RiIcons.RiArrowRightSFill />,
    iconOpened: <RiIcons.RiArrowDownSFill />,
    subNav: [
      {
        title: 'message1',
        path: '/message1',
      },
      {
        title: 'message2',
        path: '/message2',
      },
    ],
  },
];
