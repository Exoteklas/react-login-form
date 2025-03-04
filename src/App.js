import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const initialValues = {
        username: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "¡El nombre de usuario es obligatorio!";
        }
        if (!values.password) {
            errors.password = "La contraseña es obligatoria";
        } else if (values.password.length < 4) {
            errors.password = "La contraseña debe tener más de 4 caracteres";
        } else if (values.password.length > 10) {
            errors.password = "La contraseña no puede tener más de 10 caracteres";
        }
        return errors;
    };

    return (
        <>
            <div className="bgImg"></div>
            <div className="container">
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="ui message success">
                        Inicio de sesión exitoso
                    </div>
                ) : (
                    console.log("Detalles ingresados", formValues)
                )}

                <form onSubmit={handleSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Nombre de Usuario</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Ingrese su nombre de usuario"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.username}</p>
                        <div className="field">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Ingrese su contraseña"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.password}</p>
                        <button className="fluid ui button blue">Enviar</button>
                    </div>
                </form>
                <div className="text">
                    ¿No tienes una cuenta? <span>Regístrate</span>
                </div>
            </div>
        </>
    );
}

export default App;
