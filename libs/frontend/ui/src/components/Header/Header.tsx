'use client';

function Header() {
    return (
        <header className="w-full bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold">
                    <a href="#" className="link link-hover">
                        DIY TASK MANAGER
                    </a>
                </h1>
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
