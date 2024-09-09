import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { getPostShares } from '@/actions/postData';
import { addCachePost, selectManyPostById } from '@/redux/postSlice';
import { Image } from '@nextui-org/react';
import SharedPostContent from '../SharedPostContent';

const AllShares = ({ openShareList, toggleOpenShareList, post }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [shares, setShares] = useState([]);
    const [hasFetchedShares, setHasFetchedShares] = useState(false);
    const existingShares = useSelector(state => selectManyPostById(state, post._id));

    const [expandedPosts, setExpandedPosts] = useState({});
    // Content
    const toggleReadMore = (index) => {
        setExpandedPosts((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const renderContent = (content, index) => {
        const words = content.split(' ');
        const isExpanded = expandedPosts[index];

        if (words.length > 20) {
            return (
                <>
                    {isExpanded ? content : words.slice(0, 20).join(' ') + '...'}
                    <span
                        onClick={() => toggleReadMore(index)}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </span>
                </>
            );
        }
        return content;
    };

    const fetchPostShares = async () => {
        if (post._id && !hasFetchedShares) {
            try {
                let fetchedShares = [];
                if (existingShares?.length !== post.sharesCount) {
                    const excludePostIds = existingShares.map(post => post._id).join(',');
                    fetchedShares = await getPostShares(post._id, excludePostIds);
                    fetchedShares.forEach(postData => {
                        dispatch(addCachePost({ postData }));
                    });
                }
                setShares([...existingShares, ...fetchedShares]);
                setHasFetchedShares(true);
            }
            catch (error) {
                console.error('Error fetching post shares:', error);
            }
        }
    };

    const handleCloseShareListModal = () => {
        setShares([]);
        setHasFetchedShares(false);
        toggleOpenShareList();
    };

    useEffect(() => {
        if (openShareList && !hasFetchedShares) {
            fetchPostShares();
        }
    }, [openShareList]);

    if (!openShareList) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-1/2 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                <button
                    onClick={handleCloseShareListModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">All Shares</h2>
                <div className='overflow-y-scroll flex-1'>
                    {shares.map((post, index) =>
                        <div key={index} className='bg-white border border-gray-300 rounded-lg mt-10 pb-6'>
                            <div className=' flex items-start justify-between p-3'>
                                {/* User details */}
                                <div className='flex gap-2'>
                                    <Image
                                        src={post.userId.profileImage}
                                        alt={post.fullName}
                                        className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                                    />
                                    <div>
                                        <h1 className='font-semibold'>{post.userId.fullName}</h1>
                                        <p className='text-xs mt-2'>{post.updatedAt.slice(0, 10)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Post content */}
                            <div className='p-3'>
                                <p>{renderContent(post.content, index)}</p>
                            </div>
                            {/* Shared post content */}
                            {post.sharedPostId && post.sharedPostId !== '' &&
                                <SharedPostContent user={user} sharedPostContent={post.sharedPostId} />
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllShares;
