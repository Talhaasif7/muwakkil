
import React from 'react';
import { User } from 'lucide-react';
import ProfileEditForm from './ProfileEditForm';
import { useProfileState, Profile } from '@/hooks/useProfileState';

interface ProfileSectionProps {
  initialProfile: Profile;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ initialProfile }) => {
  const {
    profile,
    isEditing,
    setIsEditing,
    profileImage,
    handleProfileChange,
    handleProfileSubmit,
    handleImageUpload
  } = useProfileState(initialProfile);

  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      {isEditing ? (
        <ProfileEditForm
          profile={profile}
          profileImage={profileImage}
          onProfileChange={handleProfileChange}
          onProfileSubmit={handleProfileSubmit}
          onCancel={() => setIsEditing(false)}
          onImageUpload={handleImageUpload}
        />
      ) : (
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-muwakkil-purple bg-opacity-20 text-muwakkil-purple dark:bg-muwakkil-purple/40">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={28} />
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium dark:text-white">{profile.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
            <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">{profile.phone}</p>
          </div>
          <button 
            className="ml-auto px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
