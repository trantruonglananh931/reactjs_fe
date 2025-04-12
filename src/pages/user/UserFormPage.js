import React from 'react';
import UserForm from '../../components/user/UserForm';

const UserFormPage = ({ isEdit }) => {
  return <UserForm isEdit={isEdit} />;
};

export default UserFormPage;