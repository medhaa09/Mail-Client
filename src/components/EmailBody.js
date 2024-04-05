const EmailBody = ({
  emailBody,
  favorites,
  handleMarkAsFavorite,
  selectedEmail,
}) => {
  const { id, body } = emailBody;
  const { name, date } = selectedEmail;

  const isFavourite = favorites?.includes(id);
  return (
    <div className="email-body-container">
      <div className="email-body-header">
        <div className="email-author-profile">
          <span className="author-profile-img">{name[0]}</span>
        </div>
        <div className="email-body-info-container">
          <div className="email-text-container">
            <h2 className="author-text">{name}</h2>
            <span className="email-date">{new Date(date).toUTCString()}</span>
          </div>
          <div className="email-action-container">
            <button
              className="email-action-btn"
              onClick={() => handleMarkAsFavorite(id)}
            >
              {!isFavourite ? "Mark as favorite" : "Mark as unfavorite"}
            </button>
          </div>
        </div>
      </div>
      <div className="email-body-description">
        <div
          className="description-container"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
    </div>
  );
};

export default EmailBody;
