import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../Context/authContext";
import axios from "axios";
import toast from "react-hot-toast";

export function CreateClient() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [client, setClient] = useState({
    name: "",
    ci: "",
    phone: "",
    userId: user.uid,
  });

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    if (params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/client/" + params.id
      );

      setClient(res.data);
    }
  };

  const createClient = async (values) => {
    try {
      await axios.post("http://localhost:4000/api/client", values);
      getClient();
    } catch (error) {
      toast(
        (t) => {
          return (
            <div>
              <p className="mb-2 text-white">{error.message} </p>
            </div>
          );
        },
        {
          style: {
            background: "#fb923c",
          },
        }
      );
    }
  };

  const updateClient = async (values) => {
    try {
      const res = await axios.put("http://localhost:4000/api/client/" + params.id, values);
      navigate('/carrito')
    } catch (error) {
      toast(
        (t) => {
          return (
            <div>
              <p className="mb-2 text-white">{error.message} </p>
            </div>
          );
        },
        {
          style: {
            background: "#fb923c",
          },
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="bg-orange-400 p-10 shadow-md shadow-white">
        <Link
          to="/products"
          className="absolute text-gray-200 text-lg hover:text-gray-400 h-10 w-10"
        >
          <FaArrowLeft />
        </Link>
        <header className="justify-between items-center py-4 text-white">
          <h1 className="text-4xl mt-2 text-white">Nuevo Cliente</h1>
        </header>
        <Formik
          initialValues={client}
          onSubmit={async (values, actions) => {
            if (params.id) {
              updateClient(values);
              navigate("/clients");
            } else {
              createClient(values);
              navigate("/clients");
            }
          }}
          enableReinitialize
        >
          {({ handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="m-3">
                  <label className="text-white font-semibold" htmlFor="name">
                    Nombre
                  </label>
                  <Field
                    className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full focus:bg-gray-600"
                    name="name"
                    placeholder="Nombre"
                    maxlength="20"
                  />
                </div>

                <div className="m-3">
                  <label className="text-white font-semibold" htmlFor="cedula">
                    Cedula
                  </label>
                  <Field
                    className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full focus:bg-gray-600"
                    name="ci"
                    placeholder="Cedula"
                    required
                    pattern="[0-9]{7,8}"
                  />
                </div>

                <div className="m-3">
                  <label className="text-white font-semibold" htmlFor="phone">
                    Numero de telefono
                  </label>
                  <Field
                    type="text"
                    className="px-3 py-2 focus:outline-none focus:bg-gray-600 rounded bg-gray-600 text-white w-full"
                    name="phone"
                    placeholder="Numero de telefono"
                    pattern="[0-9]{11}"
                  />
                </div>

                <button
                  className="px-3 py-2 focus:outline-none rounded bg-gray-600 hover:bg-gray-500 text-white w-full"
                  type="submit"
                >
                  Enviar
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
