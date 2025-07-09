import React from 'react';

interface Props {
    name: string,
    email: string,
    avatar: string,
}

const Profile: React.FC<Props> = ({ name, email, avatar }) => {
    return (
        <div className="flex items-center space-x-2 py-1.5">
            <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full"/>
            <div>
                <span className="text-xs font-medium">{name}</span>
                <div className="text-xs opacity-80">
                    {email}
                </div>
            </div>
        </div>
    );
}

export default Profile;