
import { useState } from 'react';
import { useToast } from './use-toast';

export interface Profile {
  name: string;
  email: string;
  phone: string;
  notifications: {
    email: boolean;
    push: boolean;
  }
}

export function useProfileState(initialProfile: Profile) {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (type: 'email' | 'push', checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked
      }
    }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
      
      toast({
        title: "Image Uploaded",
        description: "Your profile picture has been updated",
      });
    }
  };
  
  return {
    profile,
    setProfile,
    isEditing,
    setIsEditing,
    profileImage,
    setProfileImage,
    handleProfileChange,
    handleNotificationChange,
    handleProfileSubmit,
    handleImageUpload
  };
}
