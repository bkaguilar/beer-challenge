const App = props => {
  return (
    <div className="App">
      {props.children}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&display=swap");
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        *::-moz-selection {
          // background: rgba(orange, 0.5);s
          color: white;
        }
        *::selection {
          // color: $sc-color;
          // background: rgba($brand-color_2, 0.5);
        }

        body {
          font-family: "Quicksand", sans-serif;
          line-height: 1.6;
          background: whitesmoke;
          color: #191919;
        }

        a {
          text-decoration: none;
        }

        button {
          cursor: pointer;
          outline: none;
          border: none;
        }

        ul {
          list-style: none;
        }

        .App {
          max-width: 1300px;
          margin: 0 auto;
        }

        .section__content {
          position: relative;
          min-height: 300px;
        }
      `}</style>
    </div>
  );
};

export default App;
