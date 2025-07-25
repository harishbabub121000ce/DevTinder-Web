import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { setFeed } from "../store/feedSlice";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const getFeed = async () => {
        try {
            const response = await fetch(`${BASE_URL}/feed`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            if (data.success) {
                dispatch(setFeed(data.users));
                setCurrentIndex(0); // Reset to first user when new feed loads
            }
        } catch (error) {
            console.error("Error fetching feed:", error);
        }
    };

    const handleLike = async () => {
        const data = await handleRequest("interested");
        if (data && data.success) {
            toast.success("Interest sent successfully");
            // change the current index to the next user
            if (currentIndex < feed.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        } else {
            toast.error("Error sending request");
        }
    }

    const handleDislike = async () => {
        const data = await handleRequest("ignored");
        if (data && data.success) {
            console.log("ignored successfully");
            // change the current index to the next user
            if (currentIndex < feed.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        } else {
            toast.error("Error sending request");
        }
    }

    const handleRequest = async (status) => {
       // /request/:status/:toUserId
       // status: interested, ignored
        try {
            const response = await fetch(`${BASE_URL}/request/${status}/${feed[currentIndex]._id}`, {
                method: "POST",
                credentials: "include",
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error sending request:", error);
            return { success: false, message: "Network error" };
        }
    }

    useEffect(() => {
        if (!feed) {
            getFeed();
        }
    }, []);

    const handleNext = () => {
        if (currentIndex < feed.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Show loading state
    if (!feed) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    // Show no users state
    if (feed.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="text-6xl mb-4">💔</div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">No people to match</h2>
                    <p className="text-gray-600 mb-6">Check back later for new developers to connect with!</p>
                    <button 
                        onClick={getFeed}
                        className="btn btn-primary"
                    >
                        Refresh Feed
                    </button>
                </div>
            </div>
        );
    }

    const currentUser = feed[currentIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="container mx-auto max-w-md">
                {/* User Card */}
                <div className="card bg-white shadow-xl">
                    {/* Profile Image */}
                    <figure className="px-0 pt-0">
                        <img
                            src={currentUser.photoUrl || "https://via.placeholder.com/400x500?text=No+Image"}
                            alt={`${currentUser.firstName} ${currentUser.lastName}`}
                            className="w-full h-96 object-cover rounded-t-2xl"
                        />
                    </figure>
                    
                    {/* User Info */}
                    <div className="card-body">
                        <h2 className="card-title text-2xl">
                            {currentUser.firstName} {currentUser.lastName}
                            {currentUser.age && <span className="text-lg text-gray-600">, {currentUser.age}</span>}
                        </h2>
                        
                        {currentUser.about && (
                            <p className="text-gray-700 mb-4">{currentUser.about}</p>
                        )}
                        
                        {currentUser.skills && currentUser.skills.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Skills:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {currentUser.skills.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="badge badge-primary badge-outline"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {currentUser.gender && (
                            <p className="text-sm text-gray-500 mb-4">
                                Gender: {currentUser.gender}
                            </p>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="card-actions justify-center mt-6">
                            <button className="btn btn-circle btn-error btn-lg" onClick={handleDislike}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button className="btn btn-circle btn-success btn-lg" onClick={handleLike}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-6">
                    <button 
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="btn btn-circle btn-outline"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <div className="text-center">
                        <span className="text-sm text-gray-600">
                            {currentIndex + 1} of {feed.length}
                        </span>
                    </div>
                    
                    <button 
                        onClick={handleNext}
                        disabled={currentIndex === feed.length - 1}
                        className="btn btn-circle btn-outline"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Feed;