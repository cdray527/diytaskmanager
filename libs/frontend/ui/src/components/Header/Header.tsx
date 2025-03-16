'use client';
import { useGlobalContext } from '../../providers/GlobalProvider';

function Header() {
    const { toggleSidebar } = useGlobalContext();

    return (
        <header className="w-full bg-gray-800 text-white p-4 shadow-md">
            <div className="container flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden p-2 rounded text-white hover:bg-gray-700"
                        onClick={toggleSidebar}
                        aria-label="Toggle Sidebar"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>

                    <h1 className="text-xl font-semibold text-left">
                        <a href="#" className="link link-hover">
                            DIY TASK MANAGER
                        </a>
                    </h1>
                </div>

                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <a href="#" className="link">
                                About
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
