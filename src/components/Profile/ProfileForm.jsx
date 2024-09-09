import React from 'react';
import { CgProfile } from 'react-icons/cg';
import LocaleContext from '../../contexts/LocaleContext';
import { getUserLogged } from '../../utils/api';

function ProfileForm() {
  const { locale } = React.useContext(LocaleContext);
  const [user, setUser] = React.useState([]);
  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <form className="profile-form">
      <div className="profile-icon">
        <CgProfile size={300} />
      </div>
      <div className="form-group">
        <h3 className="profile-label">Id</h3>
        <input type="text" id="id" value={user.id} disabled />
      </div>
      <div className="form-group">
        <h3 className="profile-label">{locale === 'id' ? 'Nama' : 'Name'}</h3>
        <input type="text" id="name" value={user.name} disabled />
      </div>
      <div className="form-group">
        <h3 className="profile-label">Email</h3>
        <input type="email" id="email" value={user.email} disabled />
      </div>
    </form>
  );
}

export default ProfileForm;
