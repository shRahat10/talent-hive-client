'use client';

import React, { useEffect, useRef } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '@/redux/navbarSlice';
import Link from 'next/link';
import MessagingBadge from './icon-with-badge/MessagingBadge';
import NotificationsBadge from './icon-with-badge/NotificationsBadge';
import NavbarDrawer from './NavbarDrawer';

const navItems = [
    { path: '/', label: 'Home', icon: <FaHome size={22} /> },
    { path: '/jobs', label: 'Jobs', icon: <MdWork size={22} /> },
    { path: '/my-connections', label: 'My Connections', icon: <TiGroup size={22} /> },
    { path: '/messaging', label: 'Messaging', icon: <MessagingBadge /> },
    { path: '/notifications', label: 'Notifications', icon: <NotificationsBadge /> },
];

const NavItem = ({ path, label, icon, onClick }: any) => {
    const pathName = usePathname();
    const isLoading = useSelector((state: any) => state.loading.isLoading);

    const getLinkClass = () => {
        return pathName === path && isLoading === false
            ? 'text-black font-bold border-b-2 border-black'
            : 'text-gray-600 border-b-2 border-white';
    };

    return (
        <li className="cursor-pointer">
            <Link
                className={`flex items-center gap-2 text-xs ${getLinkClass()}`}
                href={path}
                onClick={onClick}
            >
                {icon}{label}
            </Link>
        </li>
    );
};

const NavbarItems = () => {
    const dispatch = useDispatch();
    const menuOpen = useSelector((state: any) => state.navbar.menuOpen);
    const menuRef = useRef<HTMLUListElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            if (menuOpen) {
                dispatch(toggleMenu());
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div>
            {/* small device */}
            <ul
                ref={menuRef}
                className={`flex flex-col duration-500 ease-in-out bg-white border px-10 w-4/5 md:w-1/3 lg:hidden gap-4 font-semibold absolute top-0 h-screen z-20 ${menuOpen ? "left-0" : "-left-[500px]"} -ml-4 md:-ml-5 border-none shadow`}
            >

                <div className="flex gap-2 items-center">
                    <div className="lg:hidden ">
                        <NavbarDrawer />
                    </div>
                    <Link href={'/'} className="text-xl font-bold text-sky-500 h-16 flex items-center">
                        Talent Hive
                    </Link>
                </div>

                {navItems.map(item => (
                    <NavItem key={item.path} {...item} onClick={() => dispatch(toggleMenu())} />
                ))}
            </ul>

            {/* large device */}
            <ul className="hidden lg:flex gap-10 font-semibold relative">
                {navItems.map(item => (
                    <NavItem key={item.path} {...item} />
                ))}
            </ul>
        </div>
    );
};

export default NavbarItems;
