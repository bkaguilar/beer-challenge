const Section = props => (
  <section className="Section">
    <h2 className="Section__title">{props.name}</h2>
    {props.children}

    <style jsx>{`
      .Section {
        margin-bottom: 70px;
      }

      .Section__title {
        color: #7b829f;
        font-size: 1.2em;
        margin-bottom: 30px;
      }
    `}</style>
  </section>
);

export default Section;
