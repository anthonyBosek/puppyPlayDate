import Card from "../components/Card";

const Matches = () => {
  const matches = JSON.parse(localStorage.matches || "[]");
  const userDog = JSON.parse(localStorage.dog || "{}");

  const allMatches = matches.map((match) => {
    return <Card key={match.id} dog={match} />;
  });

  return userDog.id ? (
    <div className="view-all">
      <h1>My matches</h1>
      <div className="all-cards">{allMatches}</div>
    </div>
  ) : (
    // snackbar
    <h1>You Must Sign Up To Access This Page</h1>
  );
};

export default Matches;
