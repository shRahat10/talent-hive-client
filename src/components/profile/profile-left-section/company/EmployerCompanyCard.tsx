import { Image, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsDot } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import EditAndDeleteCompany from './EditAndDeleteCompany';

const EmployerCompanyCard = ({ userId, company, removeCompany, handleEditCompany }) => {
    const router = useRouter();

    const [isEditDeleteModalOpen, setIsEditDeleteModalOpen] = useState(false);

    const description = company?.companyDescription;
    const wordCount = description ? description.split(' ').length : 0;

    const handleInvalidLink = (message) => {
        toast.error(message);
    };

    const handleCompanyDetails = () => {
        router.push(`/company?id=${company._id}`);
    };

    const toggleEditDeleteModal = () => {
        setIsEditDeleteModalOpen(!isEditDeleteModalOpen);
    };

    return (
        <>
            <div className="relative h-64 flex flex-col items-center justify-start border p-3 rounded-lg shadow">
                {(userId === company.employerId._id || userId === company.employerId ) &&
                    <div>
                        <button onClick={toggleEditDeleteModal} className="absolute top-2 right-2 hover:bg-gray-200 py-1">
                            <CiMenuKebab />
                        </button>
                        {/* Edit delete modal */}
                        {isEditDeleteModalOpen && (
                            <EditAndDeleteCompany
                                company={company}
                                removeCompany={removeCompany}
                                handleEditCompany={handleEditCompany}
                            />
                        )}
                    </div>
                }

                <div className="w-20 h-20">
                    <Image
                        onClick={handleCompanyDetails}
                        src={company.companyProfileImage || "/assets/user.png"}
                        alt="Profile"
                        className="cursor-pointer rounded-full w-20 h-20 border border-gray-300 object-cover object-top"
                    />
                </div>

                <h1 onClick={handleCompanyDetails} className="text-xl font-semibold hover:underline cursor-pointer">
                    {company.companyName}
                </h1>

                <div className="flex gap-2 items-start text-gray-700">
                    {company.facebookLink?.startsWith('http') ? (
                        <Link href={company.facebookLink} target="_blank" rel="noopener noreferrer">
                            <Tooltip placement="top" content="Facebook">
                                <div>
                                    <FaFacebook className="cursor-pointer text-xl mb-3" />
                                </div>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Tooltip placement="top" content="Facebook">
                            <div onClick={() => handleInvalidLink('Facebook link not available')}>
                                <FaFacebook className="cursor-pointer text-xl mb-3" />
                            </div>
                        </Tooltip>
                    )}

                    {company.linkedInLink?.startsWith('http') ? (
                        <Link href={company.linkedInLink} target="_blank" rel="noopener noreferrer">
                            <Tooltip placement="top" content="LinkedIn">
                                <div>
                                    <FaLinkedin className="cursor-pointer text-xl mb-3" />
                                </div>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Tooltip placement="top" content="LinkedIn">
                            <div onClick={() => handleInvalidLink('LinkedIn link not available')}>
                                <FaLinkedin className="cursor-pointer text-xl mb-3" />
                            </div>
                        </Tooltip>
                    )}

                    <p><BsDot /></p>
                    <p className="text-sm">
                        {company.followers} {company.followers > 1 ? 'Followers' : 'Follower'}
                    </p>
                </div>

                <div>
                    <p>
                        {wordCount <= 10
                            ? description
                            : `${description.split(' ').slice(0, 10).join(' ')}...`}
                        {wordCount > 10 && (
                            <button onClick={handleCompanyDetails} className="text-sky-500 cursor-pointer ml-1">
                                Read More
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </>
    );
};

export default EmployerCompanyCard;
