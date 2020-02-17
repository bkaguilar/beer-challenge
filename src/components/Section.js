const Section = props => (
  <section className="Section">
    <h2 className="Section__title">{props.name}</h2>
    {props.children}

    <style jsx>{`
      .Section {
        position: relative;
        margin-bottom: 70px;
      }
      .Section:nth-child(2) {
        z-index: 1;
      }
      .Section:last-child {
        z-index: 0;
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
