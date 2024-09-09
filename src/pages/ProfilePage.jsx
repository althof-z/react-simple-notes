import React from 'react';
import LocaleContext from '../contexts/LocaleContext';
import ProfileForm from '../components/Profile/ProfileForm';

function ProfilePage() {
  const { locale } = React.useContext(LocaleContext);

  return (
    <main>
      <h2>{locale === 'id' ? 'Halaman Profil' : 'Profile Page'}</h2>
      <ProfileForm />
    </main>
  );
}

export default ProfilePage;
