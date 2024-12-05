import useAxios from ".";

export const getWatchLaterVideos = async () => {
    try {
        const response = await useAxios.get("/watch-later", {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
    };

    export const addToWatchLater = async (contentId) => {
    try {
        const response = await useAxios.post(
        "/watch-later",
        { content_id: contentId },
        {
            headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
    };

    export const removeFromWatchLater = async (contentId) => {
    try {
        const response = await useAxios.delete(`/watch-later/${contentId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
