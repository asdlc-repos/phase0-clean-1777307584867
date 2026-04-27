import './App.css';

/**
 * Top-level application component. Renders a centered "Hello World" heading
 * using semantic HTML so screen readers announce it correctly.
 */
function App() {
  return (
    <main className="app" role="main">
      <section className="app__content" aria-labelledby="greeting">
        <h1 id="greeting" className="app__heading">
          Hello World
        </h1>
        <p className="app__subtitle">
          Welcome to the Hello World web application.
        </p>
      </section>
    </main>
  );
}

export default App;
