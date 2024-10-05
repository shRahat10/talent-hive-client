'use client'

import React, { useContext } from 'react';
import { TbUserEdit } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Tooltip } from '@nextui-org/react';
import { AuthContextValues } from '@/types/auth/auth.types';
import { AuthContext } from '@/provider/AuthProvider';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const LeftBar = () => {
    const user = useSelector((state: any) => state.user.user);
    const { logout } = useContext(AuthContext) as AuthContextValues;

    const handleLogout = async () => {
        await logout();
    };

    return (
        <>
            <div className='fixed h-3/4 bg-sky-500 -ml-1 md:-ml-6 text-white p-1 lg:p-2 rounded-r-lg 2xl:rounded-lg flex flex-col justify-between items-center top-1/2 transform -translate-y-1/2'>
                <div className='pt-32'>
                    <Link
                        href={user?.facebookLink?.startsWith('http') ? user.facebookLink : `https://${user.facebookLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Tooltip placement="right-end" content="Facebook">
                            <div>
                                <FaFacebook className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                            </div>
                        </Tooltip>
                    </Link>

                    <Link
                        href={user?.linkedInLink?.startsWith('http') ? user.linkedInLink : `https://${user.linkedInLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Tooltip placement="right-end" content="LinkedIn">
                            <div>
                                <FaLinkedin className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                            </div>
                        </Tooltip>
                    </Link>

                    <Link href={`mailto:${user?.email}`}>
                        <Tooltip placement="right-end" content="Email">
                            <div>
                                <MdEmail className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                            </div>
                        </Tooltip>
                    </Link>
                </div>

                <div className='space-y-3 pb-6'>
                    <Link href={"/edit-profile"}>
                        <Tooltip placement="right-end" content="Edit Profile">
                            <div>
                                <TbUserEdit className='cursor-pointer text-xl lg:text-3xl xl:text-4xl' />
                            </div>
                        </Tooltip>
                    </Link>

                    <Tooltip placement="right-end" content="Logout">
                        <div>
                            <MdLogout onClick={handleLogout} className=' cursor-pointer text-xl lg:text-3xl xl:text-4xl' />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default LeftBar;
