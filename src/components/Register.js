import React from "react";
import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(user.email, user.password);
      navigate("/products");
    } catch (error) {
      toast(
        (t) => {
          return (
            <div>
              <p className="m-2 text-white">{error.message} </p>
            </div>
          );
        },
        {
          style: {
            background: "#dc2626",
          },
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="bg-orange-400 p-10 shadow-md shadow-white">

        <header className="justify-between items-center py-4 text-white">
          <h1 className="text-4xl mt-2 text-white">Registro</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="m-3">
            <label className="text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full focus:bg-gray-600"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div className="m-3">
            <label className="text-white font-semibold" htmlFor="password">
              Contraseña
            </label>
            <input
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full focus:bg-gray-600"
              type="password"
              name="password"
              minLength="6"
              id="password"
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>

          <button
            className="px-3 py-2 focus:outline-none rounded bg-gray-600 hover:bg-gray-500 text-white w-full"
            type="submit"
          >
            Registro
          </button>
        </form>
      </div>
    </div>
  );
}
