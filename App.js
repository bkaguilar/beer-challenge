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
          // background: #e8eff6;
          font-family: "Quicksand", sans-serif;
          line-height: 1.6;
          background: whitesmoke;
          color: #191919;
        }

        a {
          text-decoration: none;
        }

        button {
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
      `}</style>
    </div>
  );
};

export default App;
