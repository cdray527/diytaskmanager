'use client';

import { useGlobalContext } from '../../providers/GlobalProvider';
import Avatar from '../Avatar/Avatar';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Sidebar() {
    const { isSidebarOpen, toggleSidebar } = useGlobalContext();

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
        >
            <div className="p-4 flex justify-between items-center">
                <Avatar initials="RS" name="Ray Siew" />
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 rounded text-white hover:bg-gray-700"
                    aria-label="Close Sidebar"
                >
                    <i className="fas fa-times text-xl"></i>
                </button>
            </div>
            <nav className="p-4">
                <ul className="space-y-4">
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                            <i className="fas fa-tasks mr-2"></i> Tasks
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                            <i className="fas fa-cog mr-2"></i> Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
