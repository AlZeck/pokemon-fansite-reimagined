import Head from "next/head";
import React from "react";
import { Card, Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { postData } from "../util/webutils";
import { Formik } from "formik";
import * as yup from "yup";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPassword: false };
    this.changeVisibilityPassword = this.changeVisibilityPassword.bind(this);
  }

  changeVisibilityPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  submit = async (data, handlers) => {
    handlers.setSubmitting(true);
    console.log(handlers);
    const response = await postData("/login", data);

    if (response.status !== "success") {
      handlers.setFieldError("username", response.info);
      handlers.setFieldError("password", response.info);
      handlers.setSubmitting(false);
    } else {
      window.location.href = "/";
    }
  };

  render = () => {
    const schema = yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    });
    return (
      <>
        <Head>
          <title>PokemonFanSite</title>
        </Head>
        <style global jsx>
          {`
            html,
            body {
              background-image: url(/assets/img/login-signup/login.jpg);
              background-size: cover;
              background-position: initial;
            }
          `}
        </style>
        
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div>
            <Card className="transparent-card">
              <Card.Body>
                <h3 className="card-title text-center">Log In</h3>
                <Formik
                  validationSchema={schema}
                  onSubmit={this.submit}
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    isSubmitting,
                  }) => (
                    <Form
                      className="px-4 pt-4 pb-2"
                      style={{ maxWidth: 330 }}
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <Form.Group controlId="userGroup">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={values.username}
                          onChange={handleChange}
                          isValid={touched.username && !errors.username}
                          isInvalid={touched.username && !!errors.username}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.username}
                        </FormControl.Feedback>
                      </Form.Group>
                      <Form.Group controlId="passwordGroup">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={this.state.showPassword ? "text" : "password"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isValid={touched.password && !errors.password}
                            isInvalid={touched.password && !!errors.password}
                            placeholder="Password"
                          />
                          <InputGroup.Append>
                            <Button
                              className="border"
                              variant="light"
                              onClick={this.changeVisibilityPassword}
                            >
                              {this.state.showPassword ? (
                                <BsEyeSlashFill />
                              ) : (
                                <BsEyeFill />
                              )}
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                        <FormControl.Feedback type="invalid">
                          {errors.password}
                        </FormControl.Feedback>
                      </Form.Group>
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                        block
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
                <p className="px-4 pb-2 pt-3" style={{ maxWidth: 330 }}>
                  Non hai ancora un account? Fai la registrazione cliccando
                  <a href="/signup"> qui!</a>
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
    );
  };
}
