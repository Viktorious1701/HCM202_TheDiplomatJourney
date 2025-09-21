// path: the-diplomats-journey/src/components/header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/logo';
import { Menu, X } from 'lucide-react';

// Custom navigation link component that handles both router and anchor links
const NavLink = ({ href, children, className, ...props }: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  'aria-label'?: string;
}) => {
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} {...props}>
      {children}
    </Link>
  );
};

const menuItems = [
    { name: 'Missions', href: '/game' }, // Direct link to start the game
    { name: 'Timeline', href: '/timeline' },
    { name: 'Biography', href: '#biography' }, // Anchor link
    { name: 'Learn More', href: '#about' }, // Anchor link
];

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false);
    return (
        <header>
            <nav
                data-state={menuState ? 'active' : ''}
                className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
                <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
                    <div className="relative flex items-center justify-between py-3 lg:py-4">
                        <div className="flex items-center">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>
                        </div>

                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                            <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                            <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                        </button>

                        <div className="hidden lg:block ml-auto">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <NavLink
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={`bg-background lg:flex mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent ${menuState ? 'block' : 'hidden'}`}>
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <NavLink
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};