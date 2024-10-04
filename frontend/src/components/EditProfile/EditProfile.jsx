import React, { useState } from 'react';
import styles from "./EditProfile.module.css";

const EditProfile = ({ user, onClose, onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user.img || "/images/userIcon1.jpeg");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userClass, setClass] = useState(user.class );
  const [school, setSchool] = useState(user.school);
  const [bio,setBio] = useState(user.bio);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    // Validate file type
    if (!file || !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setError('Please select a valid image file (jpg, jpeg, png).');
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB.');
      return;
    }
    setError('');
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    // if (!selectedFile) {
    //   setError('No file selected.');
    //   return;
    // }
    console.log(selectedFile)
    console.log(user.email,bio,userClass,school);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email', user.email);
    formData.append('bio',bio );
    formData.append('userClass', userClass);
    formData.append('school', school);

    setIsLoading(true);
    try {
      await onSave(formData); // Save to the database via parent component
      onClose(); // Close the edit page after save
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      setError('Error uploading profile photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.editProfileContainer}>
      <div className={styles.editProfile}>
        <h2>Edit Profile</h2>
        <div className={styles.formGroup}>
          <div className={styles.profileImage}>
            <img src={preview} alt='Profile preview' />
          </div>
          <label htmlFor="file" className={styles.label}>Profile Photo</label>
          <input
            type="file"
            name="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className={styles.input}
          />
        </div>
        

        <div className={styles.formGroup}>
          <label htmlFor="bio" className={styles.label}>Bio</label>
          <textarea
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="class" className={styles.label}>Class</label>
          <input
            type="text"
            name="class"
            value={userClass}
            onChange={(e) => setClass(e.target.value)}
            className={styles.input}
          />
        </div>


        <div className={styles.formGroup}>
          <label htmlFor="school" className={styles.label}>School</label>
          <input
            type="text"
            name="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className={styles.input}
          />
        </div>
        
        {error && <p className={styles.error}>{error}</p>}

        <br />

        <button className={styles.submit} onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        <button className={styles.cancel} onClick={onClose} disabled={isLoading}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
