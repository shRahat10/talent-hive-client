'use client';

import { getPendingRequests, acceptConnectionRequest, deleteConnectionRequest } from '@/apiFunctions/connection';
import { useDispatch, useSelector } from 'react-redux';
import { setReceivedRequests, removeReceivedRequest, setConnectionStatus, addConnection } from '@/redux/connectionSlice';
import MyConnectionProfileHeader from '../my-connections-shared-component/MyConnectionProfileHeader';
import React, { useEffect, useState } from 'react';

const ReceivedRequest = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const receivedRequests = useSelector((state: any) => state.connection.receivedRequests);
    const [buttonLoading1, setButtonLoading1] = useState(false);
    const [buttonLoading2, setButtonLoading2] = useState(false);

    const handleAcceptConnectionRequest = async (otherUserId: string) => {
        try {
            setButtonLoading1(true);

            const res = await acceptConnectionRequest(user._id, otherUserId);
            if (res) {
                dispatch(addConnection(res.senderInfo));
                dispatch(removeReceivedRequest(otherUserId));
                dispatch(setConnectionStatus({ userId: otherUserId, status: 'connected' }));
            }
        } catch (error) {
            console.log('Error accepting connection', error)
        }

        setButtonLoading1(false);
    };

    const handleDeleteConnectionRequest = async (otherUserId: string) => {
        try {
            setButtonLoading2(true);

            const res = await deleteConnectionRequest('reject', user._id, otherUserId);
            if (res) {
                dispatch(removeReceivedRequest(otherUserId));
                dispatch(setConnectionStatus({ userId: otherUserId, status: 'no_relationship' }));
            }
        } catch (error) {
            console.log('Error deleting connection', error)
        }

        setButtonLoading2(false);
    };

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const res = await getPendingRequests(user._id);
                dispatch(setReceivedRequests(res));
            } catch (error) {
                console.error('Error fetching received requests:', error);
            }
        };

        fetchPendingRequests();
    }, [user._id, dispatch]);

    return (
        <div>
            {receivedRequests?.length > 0 ? (
                <ul className='space-y-2'>
                    {receivedRequests?.map((request: any) => (
                        <li key={request.sender._id} className="border bg-white shadow rounded-lg p-3">
                            <MyConnectionProfileHeader userId={request.sender._id} profileImage={request.sender.profileImage} fullName={request.sender.fullName} email={request.sender.email} />
                            <div className='flex gap-2 justify-between mt-1 w-full'>
                                <button
                                    onClick={() => handleAcceptConnectionRequest(request.sender._id)}
                                    className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 bg-gray-600 text-white hover:bg-gray-500 flex gap-1 justify-center items-center font-bold'
                                    disabled={buttonLoading1}
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleDeleteConnectionRequest(request.sender._id)}
                                    className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                                    disabled={buttonLoading2}
                                >
                                    Cancel
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center'>No received requests.</p>
            )}
        </div>
    );
};

export default ReceivedRequest;
