import React, { useRef } from "react";

export default function ProfilePhotoUploader({ profilePhoto, setProfilePhoto }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="label">Foto de perfil</label>
      <div className="flex items-center space-x-4">
        {profilePhoto && (
          <img src={profilePhoto} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          Subir foto
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
