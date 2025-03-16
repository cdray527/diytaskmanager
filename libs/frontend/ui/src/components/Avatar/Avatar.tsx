'use client';

interface AvatarProps {
    initials: string;
    name: string;
}

function Avatar({ initials, name }: AvatarProps) {
    return (
        <div className="flex items-center text-white p-2 rounded-md">
            <div className="w-14 h-14 bg-orange-600 text-white flex items-center justify-center rounded-full text-lg font-semibold">
                {initials}
            </div>
            <div className="ml-2">
                <p className="text-sm font-medium">{name}</p>
            </div>
        </div>
    );
}

export default Avatar;
