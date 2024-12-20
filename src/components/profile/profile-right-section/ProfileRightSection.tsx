'use client'

import CompanySuggestions from '@/components/company/company-recommendations/CompanySuggestions';
import ConnectionsSuggestions from '@/components/connection-recommendations/ConnectionsSuggestions';
import React from 'react';

const ProfileRightSection = () => {
    return (
        <div className=' space-y-2'>
            <ConnectionsSuggestions />
            <CompanySuggestions />
        </div>
    );
};

export default ProfileRightSection;
