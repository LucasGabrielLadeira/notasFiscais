"use client";
import LogoImage from "../../../assets/images/logo.png";
import Image from "next/image";
import "./login.css";
import { useState } from "react";
import LoginForm from "@/components/loginForm/loginForm";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [credentials, setCredentials] = useState({
    matricula: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-page">
      <main>
        <div className="card login-card">
          <div className="card-header">
            <Image
              src={`${LogoImage.src}?variant=login`}
              width={LogoImage.width}
              height={LogoImage.height}
              alt="Logo"
              className="logo-image"
            />
          </div>
          <div className="card-body">
            <LoginForm
              credentials={credentials}
              handleChange={handleChange}
              validated={validated}
              setValidated={setValidated}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
