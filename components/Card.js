const Card = props => (
  <article className="Card">
    <figure className="Card__image">
      <img src="" alt="" />
    </figure>
    <div className="Card__text">
      <h1 className="Card__text__name">{props.card.name}</h1>
      <span className="Card__text__ABV">{props.card.abv}</span>
      <p className="Card__text__description">{props.card.description}</p>
    </div>
  </article>
);

export default Card;
