'use client'

import { getCompanyByName } from '@/apiFunctions/companyData';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { IoSearch } from "react-icons/io5";
import { useSelector } from 'react-redux';

const CompanySearch = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // const user = useSelector((state: any) => state.user.user);

    const fetchCompanies = async () => {
        if (searchTerm.length < 3) {
            setResults([]);
            return;
        }

        setLoading(true);
        const companies = await getCompanyByName(searchTerm);
        setResults(companies);
        setLoading(false);
        setShowDropdown(companies.length > 0);
    };

    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            fetchCompanies();
        }, 500);

        return () => clearTimeout(debounceFetch);
    }, [searchTerm]);

    const handleInputChange = (event: any) => {
        setSearchTerm(event.target.value);
        setShowDropdown(true);
    };

    const handleSearchClick = () => {
        if (searchTerm.length >= 3) {
            fetchCompanies();
        }
    };

    const handleCompanySelect = (company: any) => {
        handleSelectContact(company._id)
        setSearchTerm('');
        setResults([]);
        setShowDropdown(false);
    };

    const handleSelectContact = async (companyId: string) => {
        router.push(`/company?id=${companyId}`);
    };

    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full border rounded-lg shadow">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search by name..."
                className="w-full h-12 p-2 rounded-lg outline-none"
            />
            <button
                onClick={handleSearchClick}
                className=" absolute top-3 right-2 h-7 w-7 p-1 rounded-full bg-sky-500 hover:bg-sky-600 text-white"
            >
                <IoSearch size={18} />
            </button>

            {loading &&
                <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 z-10 p-2 text-center text-gray-500">
                    Loading...
                </div>
            }
            
            {showDropdown && results?.length > 0 ? (
                <div
                    ref={dropdownRef}
                    className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 z-[60]"
                >
                    {results.map((company: any) => (
                        <div
                            key={company._id}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCompanySelect(company)}
                        >
                            {company.companyProfileImage && (
                                <img
                                    src={company.companyProfileImage}
                                    alt={`${company.companyName}'s profile`}
                                    className="w-10 h-10 rounded-full mr-2 object-cover object-top"
                                />
                            )}
                            <span>{company.companyName}</span>
                        </div>
                    ))}
                </div>
            ) : (
                showDropdown && searchTerm.length >= 3 && !loading && (
                    <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 z-10 p-2 text-center text-gray-500">
                        No company found
                    </div>
                )
            )}
        </div>
    );
};

export default CompanySearch;