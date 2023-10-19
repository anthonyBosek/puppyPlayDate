const PlayEvent = ({ title, date, location, description, image, ifr }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="card-img" />
      <div className="event-details">
        <span className="card-title">{title}</span>
        <span className="card-date">{new Date(date).toDateString()}</span>
        <div className="card-loc">{location}</div>
        <div className="card-desc">{description}</div>
        <iframe
          src={ifr}
          title={title}
          frameBorder="1"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default PlayEvent;
