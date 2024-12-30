import Graph from "@/components/Graph/Graph";
import "@/styles/main.scss";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Traversely</h1>
          <nav>{/*we can add algorithm selection here later*/}</nav>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <Graph />
        </div>
      </main>
    </div>
  );
}

export default App;
