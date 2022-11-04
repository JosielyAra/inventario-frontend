import { Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./Context/productsContext";
import { AuthProvider } from "./Context/authContext";
import {
  Navigation,
  Login,
  Register,
  ProductCarrito,
  ProtectedRoute
} from "./components";
import { Home, CreateProduct, Facturas, Products, NotFoundPage, Clients, CreateClient, Monedas } from "./pages";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="max-w-screen-2xl min-w-full bg-neutral-900">
      <AuthProvider>
        <div>
          <Navigation />
        </div>
        <div className=" min-h-screen min-w-full">
          <div className="container m-auto">
            <ProductsProvider>
              <Routes>
                <Route
                  path="/"
                  element={

                    <Home />

                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/facturas"
                  element={
                    <ProtectedRoute>
                      <Facturas />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/new"
                  element={
                    <ProtectedRoute>
                      <CreateProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CreateProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/clients"
                  element={
                    <ProtectedRoute>
                      <Clients />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/clients/create"
                  element={
                    <ProtectedRoute>
                      <CreateClient />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/clients/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CreateClient />
                    </ProtectedRoute>
                  }
                />
                <Route path="/carrito" element={<ProtectedRoute>
                  <ProductCarrito />
                </ProtectedRoute>} />

                <Route
                  path="/moneda"
                  element={
                    <ProtectedRoute>
                      <Monedas />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Toaster />
            </ProductsProvider>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
