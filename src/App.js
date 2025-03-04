import { useState } from "react";
import Login from "./componentes/Login";
import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="container">
            {isAuthenticated ? (
                <div className="ui message success">
                    <h2>Inicio de sesión exitoso</h2>
                </div>
            ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
            )}
        </div>
    );
}

export default App;
