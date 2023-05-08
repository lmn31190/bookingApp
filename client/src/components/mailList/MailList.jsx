import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Gagnez du temps, économisez de l'argent !</h1>
      <span className="mailDesc">
        Inscrivez-vous et nous vous enverrons les meilleures offres
      </span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Votre Email" />
        <button>S'abonner</button>
      </div>
    </div>
  );
};

export default MailList;
