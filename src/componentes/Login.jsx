import { useState, useEffect, useRef } from "react";

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Crear una referencia para rastrear si el componente está montado
    const isMounted = useRef(true);

    // Limpiar la referencia al desmontar el componente
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            // Solo actualiza el estado si el componente sigue montado
            if (isMounted.current) {
                setIsAuthenticated(true);
                alert("Inicio de sesión exitoso");
            }
        } catch (err) {
            // Solo actualiza el estado si el componente sigue montado
            if (isMounted.current) {
                setError(err.message);
            }
        } finally {
            // Solo actualiza el estado si el componente sigue montado
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Card container */}
            <div className="bg-white shadow-lg rounded-lg w-96">
                <form onSubmit={handleLogin} className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <div className="mb-4">
                        <label className="block text-gray-700">Correo Electrónico:</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
