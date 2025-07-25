import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { setPendingRequests } from "../store/pendingRequests";
import { toast } from "react-hot-toast";

const PendingRequests = () => {
    const dispatch = useDispatch();
    const pendingRequests = useSelector((store) => store.pendingRequests);
    const [loading, setLoading] = useState(true);

    const getPendingRequests = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/user/requests`, {
                method: "GET",
                credentials: "include",
            });
            const res = await response.json();
            if (res.success) {
                dispatch(setPendingRequests(res.data));
            } else {
                toast.error("Failed to fetch pending requests");
            }
        } catch (error) {
            console.error("Error fetching pending requests:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleRequestAction = async (request, action) => {
        try {
            const response = await fetch(`${BASE_URL}/request/review/${action}/${request.fromUser._id}`, {
                method: "POST",
                credentials: "include",
            });
            const res = await response.json();
            
            if (res.success) {
                toast.success(`Request ${action}ed successfully`);
                // Remove the request from the list after action
                const updatedRequests = pendingRequests.filter(req => req._id !== request._id);
                dispatch(setPendingRequests(updatedRequests));
            } else {
                toast.error(res.message || `Failed to ${action} request`);
            }
        } catch (error) {
            console.error(`Error ${action}ing request:`, error);
            toast.error("Something went wrong");
        }
    };

    const handleAccept = (request) => {
        handleRequestAction(request, "accepted");
    };

    const handleReject = (request) => {
        handleRequestAction(request, "rejected");
    };

    useEffect(() => {
        if (!pendingRequests) {
            getPendingRequests();
        } else {
            setLoading(false);
        }
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    // Show empty state
    if (!pendingRequests || pendingRequests.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📬</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">No Pending Requests</h2>
                        <p className="text-gray-600 mb-6">You're all caught up! No new connection requests at the moment.</p>
                        <button 
                            onClick={getPendingRequests}
                            className="btn btn-primary mr-4"
                        >
                            Refresh
                        </button>
                        <button 
                            onClick={() => window.location.href = '/feed'}
                            className="btn btn-outline"
                        >
                            Go to Feed
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const RequestCard = ({ request }) => {
        const [isProcessing, setIsProcessing] = useState(false);
        
        const handleAction = async (action) => {
            setIsProcessing(true);
            if (action === "accept") {
                await handleAccept(request);
            } else {
                await handleReject(request);
            }
            setIsProcessing(false);
        };

        return (
            <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body p-6">
                    <div className="flex items-center space-x-4">
                        {/* Profile Image */}
                        <div className="avatar">
                            <div className="w-20 h-20 rounded-full">
                                <img
                                    src={request.fromUser.photoUrl || "https://via.placeholder.com/120x120?text=No+Image"}
                                    alt={`${request.fromUser.firstName} ${request.fromUser.lastName}`}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">
                                {request.fromUser.firstName} {request.fromUser.lastName}
                                {request.fromUser.age && <span className="text-gray-500 font-normal">, {request.fromUser.age}</span>}
                            </h3>
                            
                            {request.fromUser.about && (
                                <p className="text-gray-600 mt-1 line-clamp-3">{request.fromUser.about}</p>
                            )}
                            
                            {request.fromUser.skills && request.fromUser.skills.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {request.fromUser.skills.slice(0, 4).map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="badge badge-primary badge-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {request.fromUser.skills.length > 4 && (
                                        <span className="text-xs text-gray-500">
                                            +{request.fromUser.skills.length - 4} more
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Request Date */}
                            <p className="text-xs text-gray-400 mt-2">
                                Sent {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2 min-w-[120px]">
                            <button 
                                onClick={() => handleAction("accept")}
                                disabled={isProcessing}
                                className="btn btn-success btn-sm"
                            >
                                {isProcessing ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Accept
                                    </>
                                )}
                            </button>
                            <button 
                                onClick={() => handleAction("reject")}
                                disabled={isProcessing}
                                className="btn btn-error btn-sm"
                            >
                                {isProcessing ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Reject
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Pending Requests</h1>
                    <p className="text-gray-600">People who are interested in connecting with you</p>
                    <div className="mt-4">
                        <span className="badge badge-primary badge-lg">
                            {pendingRequests.length} {pendingRequests.length === 1 ? 'Request' : 'Requests'}
                        </span>
                    </div>
                </div>

                {/* Requests List */}
                <div className="space-y-4">
                    {pendingRequests.map((request) => (
                        <RequestCard key={request._id} request={request} />
                    ))}
                </div>

                {/* Refresh Button */}
                <div className="text-center mt-8">
                    <button 
                        onClick={getPendingRequests}
                        className="btn btn-outline"
                    >
                        Refresh Requests
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PendingRequests;