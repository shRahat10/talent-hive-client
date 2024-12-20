'use client'

import { deleteJobPost } from '@/apiFunctions/jobpostData';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import JobPostingModal from '../jobs-posting/JobPostingModal';
import { removePost } from '@/redux/jobPostSlice';

const JobEditAndDelete = ({ jobPost }) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteJobPost = async () => {
        try {
            const res = await deleteJobPost(jobPost._id);

            if (res) {
                dispatch(removePost({ jobPostId: jobPost._id }))
                router.push(`/company?id=${jobPost.companyId._id}`);
            }
        }
        catch (error) {
            console.log('Failed to delete job post', error);
            toast.error('Failed to delete job post');
        }
    }

    return (
        <>
            {(jobPost.companyId.employerId === user._id) &&
                <div className='flex gap-2'>
                    <button onClick={() => setIsModalOpen(true)} className='text-xs text-sky-500 font-bold hover:text-sky-600'>Edit</button>
                    <p>|</p>
                    <button onClick={() => setShowDeleteModal(true)} className='text-xs text-red-500 font-bold hover:text-red-600'>Delete</button>
                </div>
            }

            <JobPostingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                companyId={jobPost.companyId._id}
                jobPost={jobPost}
                handleAddJobPost={null}
            />

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteJobPost}
                title="Delete Job Post?"
                message="Are you sure you want to delete this Job Post? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
            />
        </>
    );
};

export default JobEditAndDelete;
