import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./loginForm.css";
import { useAuth } from "@/contexts/authContext";
interface loginFormProps {
  //handleLogin: (matricula: string, senha: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  credentials: { matricula: string; senha: string };
  validated: boolean;
  setValidated: (validated: boolean) => void;
}

export default function LoginForm({
  validated,
  credentials,
  setValidated,
  handleChange,
}: loginFormProps) {
  const { login } = useAuth();
  //const { showSnackbar } = useSnackbar();
  return (
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => login({ event, credentials, setValidated })}
      >
        <div className="fields-container">
          <Form.Group controlId="validationMatricula">
            <FloatingLabel controlId="matricula" label="Matrícula">
              <Form.Control
                className="form-input"
                required
                type="text"
                placeholder="Matrícula"
                name="matricula"
                value={credentials.matricula}
                onChange={handleChange}
                isInvalid={validated && !credentials.matricula}
              />
              <Form.Control.Feedback type="invalid">
                Informe a sua matrícula.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="validationSenha">
            <FloatingLabel controlId="senha" label="Senha">
              <Form.Control
                className="form-input"
                required
                type="password"
                placeholder="Senha"
                name="senha"
                value={credentials.senha}
                onChange={handleChange}
                isInvalid={validated && !credentials.senha}
              />
              <Form.Control.Feedback type="invalid">
                Informe a senha.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </div>
        <div className="buttons-container">
          <button className="btn btn-primary btn-block" type="submit">
            Entrar
          </button>
          <button className="btn btn-primary btn-block" type="button">
            Recuperar Senha
          </button>
        </div>
      </Form>
    </div>
  );
}
