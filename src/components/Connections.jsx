import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { setConnections } from "../store/connectionsSlice";
import { toast } from "react-hot-toast";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);
    const user = useSelector((store) => store.user);
    const [loading, setLoading] = useState(true);

    const getConnections = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/user/connections`, {
                method: "GET",
                credentials: "include",
            });
            const res = await response.json();
            if (res.success) {
                dispatch(setConnections(res.data));
            } else {
                toast.error("Failed to fetch connections");
            }
        } catch (error) {
            console.error("Error fetching connections:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!connections) {
            getConnections();
        } else {
            setLoading(false);
        }
    }, []);

    // Filter only accepted connections
    const acceptedConnections = connections ? connections.filter(connection => connection.status === "accepted") : [];

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    // Show empty state
    if (!acceptedConnections || acceptedConnections.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🤝</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">No Connections Yet</h2>
                        <p className="text-gray-600 mb-6">Start swiping to make connections with other developers!</p>
                        <button 
                            onClick={() => window.location.href = '/feed'}
                            className="btn btn-primary"
                        >
                            Go to Feed
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const ConnectionCard = ({ connection }) => {
        // Get the other user (not the current logged-in user)
        const otherUser = connection.fromUser._id === user._id 
            ? connection.toUser 
            : connection.fromUser;

        return (
            <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body p-6">
                    <div className="flex items-center space-x-4">
                        {/* Profile Image */}
                        <div className="avatar">
                            <div className="w-16 h-16 rounded-full">
                                <img
                                    src={otherUser.photoUrl || "https://via.placeholder.com/100x100?text=No+Image"}
                                    alt={`${otherUser.firstName} ${otherUser.lastName}`}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">
                                {otherUser.firstName} {otherUser.lastName}
                                {otherUser.age && <span className="text-gray-500 font-normal">, {otherUser.age}</span>}
                            </h3>
                            
                            {otherUser.about && (
                                <p className="text-gray-600 mt-1 line-clamp-2">{otherUser.about}</p>
                            )}
                            
                            {otherUser.skills && otherUser.skills.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {otherUser.skills.slice(0, 3).map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="badge badge-primary badge-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {otherUser.skills.length > 3 && (
                                        <span className="text-xs text-gray-500">
                                            +{otherUser.skills.length - 3} more
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Connection Date */}
                            <p className="text-xs text-gray-400 mt-2">
                                Connected on {new Date(connection.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Status Badge */}
                        <div className="text-right">
                            <span className="badge badge-success">
                                Connected
                            </span>
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Connections</h1>
                    <p className="text-gray-600">Your developer network</p>
                    <div className="mt-4">
                        <span className="badge badge-success badge-lg">
                            {acceptedConnections.length} {acceptedConnections.length === 1 ? 'Connection' : 'Connections'}
                        </span>
                    </div>
                </div>

                {/* Connections List */}
                <div className="space-y-4">
                    {acceptedConnections.map((connection) => (
                        <ConnectionCard key={connection._id} connection={connection} />
                    ))}
                </div>

                {/* Refresh Button */}
                <div className="text-center mt-8">
                    <button 
                        onClick={getConnections}
                        className="btn btn-outline"
                    >
                        Refresh Connections
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Connections;