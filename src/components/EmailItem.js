const EmailItem = ({
  emailInfo,
  readedList = [],
  favorites = [],
  handleSelectEmail,
  isThisSelectedEmail,
}) => {
  const {
    id,
    date,
    from: { email, name },
    short_description,
    subject,
  } = emailInfo;

  return (
    <div
      className={`email-item-container ${
        readedList?.includes(id) ? "readed" : " "
      } ${isThisSelectedEmail === id ? "selected" : ""}`}
      onClick={() => handleSelectEmail({ id, date, name })}
    >
      <div className="author-profile">
        <span className="author-profile-img">{name[0]}</span>
      </div>
      <div className="email-info-container">
        <div className="email-header">
          <div className="email-sender-info">
            <span className="from-email">From:</span>
            <span className="from-text">
              {name} {`<${email}>`}
            </span>
          </div>
          <div className="email-subject-info">
            <span className="subject">Subject:</span>
            <span className="subject-text">{subject}</span>
          </div>
        </div>
        <div className="email-body">
          <div className="email-description-preview">{short_description}</div>
          {/* Format should be human readable and in this: 26/10/2023 10:30am */}
          <div className="email-time">
            <span>{new Date(date).toUTCString()}</span>
          </div>
          <div className="email-fav-info">
            <span className="email-fav-text">
              {favorites?.includes(id) ? "Favorite" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;
