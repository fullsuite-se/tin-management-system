import React from 'react';

interface Props {
    name: string,
    email: string,
    avatar: string,
}

const Profile: React.FC<Props> = ({ name, email, avatar }) => {
    return (
        <div className="flex items-center space-x-2 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-lg px-3 py-1.5 text-white shadow-lg">
            <img src={avatar} alt="avatar" />
            <div>
                <span className="text-xs font-medium">{name}</span>
                <div className="text-xs opacity-90">{email}</div>
            </div>
        </div>
    );
}

export default Profile;