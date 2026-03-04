/*
Sidebar.jsx functionality:
  - Represents the entire sidebar displayed in the ChatArea
  - Allows for chat creation
  - Allows for chat deletion

Last edited: 2/27/2026
*/

import { useState } from 'react';
import { chatState } from '../../state/state';
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarLeftCollapse,
} from 'react-icons/tb';
import { CiWarning } from 'react-icons/ci';
import { RiChatNewLine } from 'react-icons/ri';
import Modal from '../Modal';
import ChatList from './ChatList';

const MOBILE_BREAKPOINT = 640; // px based off of tailwind breakpoint

const Sidebar = () => {
  const { createChat, removeChat } = chatState();

  // Collapsed: Dynamically set to False if on mobile, otherwise set to True to show full sidebar.
  const [collapsed, setCollapsed] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false,
  );
  const [deleting, setDeleting] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTitleId, setEditingTitleId] = useState('');
  const [newTitle, setNewTitle] = useState('');

  // Calls Zustand state that creates a new chat
  const handleCreateChat = () => {
    createChat();
  };

  // Deletes chat from state upon user approval
  const handleOnModalConfirm = (chatId) => {
    removeChat(chatId);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div
      className={`h-dvh z-999 text-white flex flex-col transition-all duration-300 ease-in-out
                md:bg-zinc-800        
                ${collapsed ? 'w-16' : 'w-64'}
                `}
    >
      <div
        className={`h-dvh w-2/3 flex flex-col justify-start items-center gap-2 p-2 text-white
                  md:bg-zinc-800 md:w-full transition-all duration-200
                  ${!collapsed && 'md:w-1/6 bg-zinc-800 '}
        `}
      >
        <div
          className={`w-full flex ${collapsed ? 'md:flex-col ' : ' flex-row'} justify-between items-center p-2 gap-5`}
        >
          {/* <div
            aria-label="company-logo"
            className={`${collapsed && 'hidden md:block'} transition-all duration-200`}
          >
            <img
              src={logo}
              className={`${collapsed && 'hidden'}`}
              alt="Cognizant"
            />
            <img
              src={plainLogo}
              className={`${!collapsed && 'hidden md:hidden'} md:block w-7`}
              alt="Cognizant"
            />
          </div> */}
          <button
            onClick={handleCreateChat}
            className={`
            md:block
            hover:cursor-pointer
            ${!collapsed ? 'block' : 'hidden'}
            `}
          >
            <RiChatNewLine size={24} />
          </button>
          <div
            onClick={() => setCollapsed((prev) => !prev)}
            className="cursor-pointer"
          >
            {!collapsed ? (
              <TbLayoutSidebarLeftCollapse
                aria-label="close-sidebar-button"
                size={24}
              />
            ) : (
              <TbLayoutSidebarRightCollapse
                aria-label="open-sidebar-button"
                size={24}
              />
            )}
          </div>
        </div>
        {!collapsed && (
          <ChatList
            collapsed={collapsed}
            editingTitleId={editingTitleId}
            setEditingTitleId={setEditingTitleId}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            setIsModalOpen={setIsModalOpen}
            setDeleting={setDeleting}
          />
        )}
        {isModalOpen && (
          <Modal
            onConfirm={() => handleOnModalConfirm(deleting.id)}
            onClose={() => setIsModalOpen((prev) => !prev)}
            text={deleting.title}
            leftBtn={{ text: 'Delete', color: 'bg-red-800' }}
            rightBtn={{ text: 'Keep', color: 'bg-blue-800' }}
            modalTitle={'Are you sure you want to delete:'}
            logo={{
              element: <CiWarning size={50} color="red" />,
              bgColor: 'bg-red-900/20',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
