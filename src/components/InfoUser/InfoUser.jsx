import React from 'react';
import './InfoUser.css';

function InfoUser({ name, email, buttonText, onSubmit }) {
  const onClick = () => {
    onSubmit(true);
  };

  return (
    <div className="info-user">
      <div className="info-user__field">
        <p>Имя</p>
        <p>{name}</p>
      </div>
      <div className="info-user__field info-user__field_email">
        <p>E-mail</p>
        <p>{email}</p>
      </div>
      <button
        type="submit"
        className={`info-user__button-edit`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default InfoUser;
