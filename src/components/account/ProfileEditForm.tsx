
import React from 'react';
import { Check, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile } from "@/hooks/useProfileState";

interface ProfileEditFormProps {
  profile: Profile;
  profileImage: string | null;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  profile,
  profileImage,
  onProfileChange,
  onProfileSubmit,
  onCancel,
  onImageUpload
}) => {
  return (
    <form onSubmit={onProfileSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <div className="relative">
          <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center ${profileImage ? '' : 'bg-muwakkil-purple bg-opacity-20 text-muwakkil-purple dark:bg-muwakkil-purple/40'}`}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-semibold">{profile.name.charAt(0)}</span>
            )}
          </div>
          <label htmlFor="profile-image" className="absolute -right-1 -bottom-1 bg-muwakkil-purple text-white rounded-full p-1 cursor-pointer hover:bg-muwakkil-purple/90">
            <Upload size={12} />
            <input 
              type="file" 
              id="profile-image" 
              className="hidden" 
              accept="image/*" 
              onChange={onImageUpload}
            />
          </label>
        </div>
        <div className="ml-4 flex-1">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name"
              value={profile.name} 
              onChange={onProfileChange} 
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          value={profile.email} 
          onChange={onProfileChange} 
          className="max-w-sm"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input 
          id="phone" 
          name="phone"
          value={profile.phone} 
          onChange={onProfileChange} 
          className="max-w-sm"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="bg-muwakkil-purple hover:bg-muwakkil-purple/90">
          <Check className="mr-1 h-4 w-4" /> Save Changes
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
