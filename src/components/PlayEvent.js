const PlayEvent = ({ title, date, location, description, image, ifr }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="card-img" />
      <div className="event-details">
        <h2>{title}</h2>
        <p className="card-details">{new Date(date).toDateString()}</p>
        <p className="card-details">{location}</p>
        <p className="card-details">{description}</p>
        <iframe
          src={ifr}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default PlayEvent;
