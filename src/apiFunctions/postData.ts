import axios from "axios";

export const getPosts = async (userId: string, page = 0, limit = 10) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`, {
            params: { userId, page, limit }
        });
        const posts = response.data;

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const getTimelinePosts = async (userId: string, page = 0, limit = 10) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/timeline`, {
            params: { userId, page, limit }
        });
        const posts = response.data;

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const getOnePost = async (postId: string, userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`, {
            params: { userId }
        });
        const post = response.data;
console.log(post)
        return post;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};

export const getPostShares = async (postId: string, excludePostIds = '') => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/share/${postId}`, {
            params: {
                exclude: excludePostIds
            }
        });
        const postShares = response.data;

        return postShares;
    }
    catch (error) {
        console.error("Error fetching post shares:", error);
        return null;
    }
};

export const createPost = async (postData: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`, postData);
        const newPost = response.data;

        return newPost;
    }
    catch (error) {
        console.error("Error creating post:", error);
        return null;
    }
};

export const updatePost = async (postId: string, updateData: any) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`, updateData);
        const updatedPost = response.data;

        return updatedPost;
    }
    catch (error) {
        console.error("Error updating post:", error);
        return null;
    }
};

export const deletePost = async (postId: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting post:", error);
        return null;
    }
};
