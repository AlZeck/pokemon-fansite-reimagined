import Head from "next/head";
import Image from "next/image";
import React from "react";
import {
  Card,
  Form,
  Button,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { postData } from "../util/webutils";
import { Formik } from "formik";
import * as yup from "yup";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default class Signup extends React.Component {
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
    const response = await postData("/signup", data);
    if (response.status !== "success") {
      switch (response.info) {
        case "Username is not valid":
          handlers.setFieldError("username", response.info);
          break;
        case "Password is not strong enough":
          handlers.setFieldError("password", response.info);
          break;
        case "Email exists":
          handlers.setFieldError("email", response.info);
          break;
        default:
          handlers.setFieldError("username", response.info);
          handlers.setFieldError("password", response.info);
          handlers.setFieldError("email", response.info);
          break;
      }
      handlers.setSubmitting(false);
    } else {
      window.location.href = "/";
    }
  };

  render = () => {
    const schema = yup.object().shape({
      avatar: yup.number().min(1).max(55),
      username: yup
        .string()
        .required()
        .matches(
          /^[a-zA-Z0-9_\.]*$/,
          "Can only contain Alphanumeric characters, Periods and Underscorse"
        ),
      email: yup.string().email().required(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
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
              background-image: url(/assets/img/login-signup/signup.jpg);
              background-size: cover;
              background-position: right;
            }
          `}
        </style>

        <div
          className="d-flex vh-100 justify-content-center align-items-center"
          //style={{ height: "80vh" }}
        >
          <div>
            <Card className="transparent-card">
              <Card.Body>
                <h3 className="card-title mt-2 text-center">Sign Up</h3>
                <Formik
                  validationSchema={schema}
                  onSubmit={this.submit}
                  initialValues={{
                    avatar: 1,
                    username: "",
                    email: "",
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
                      className="px-3 pt-3 pb-2"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <Row>
                        <Col sm="4">
                          <div className="d-flex h-100 flex-column justify-content-center align-content-center">
                            <div
                              className="mx-auto"
                              style={{ maxHeight: 110, maxWidth: 110 }}
                            >
                              <Image
                                src={`/assets/img/allenatori/${
                                  values.avatar || 1
                                }.png`}
                                alt="Avatar allenatore"
                                width={110}
                                height={110}
                              />
                            </div>
                            <Form.Group
                              as={Row}
                              className="mt-3"
                              controlId="avatarGroup"
                            >
                              <Form.Label className="pr-0" column>
                                Avatar
                              </Form.Label>
                              <Col className="pl-0">
                                <Form.Control
                                  name="avatar"
                                  value={values.avatar}
                                  as="select"
                                  onChange={handleChange}
                                >
                                  {Array.from(new Array(55), (_, i) => (
                                    <option
                                      key={i + 1}
                                      value={i + 1}
                                      label={i + 1}
                                    >{i + 1}</option>
                                  ))}
                                </Form.Control>
                              </Col>
                            </Form.Group>
                          </div>
                        </Col>
                        <Col>
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
                          <Form.Group controlId="emailGroup">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={values.email}
                              onChange={handleChange}
                              isValid={touched.email && !errors.email}
                              isInvalid={touched.email && !!errors.email}
                            />
                            <FormControl.Feedback type="invalid">
                              {errors.email}
                            </FormControl.Feedback>
                          </Form.Group>
                          <Form.Group controlId="passwordGroup">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                              <FormControl
                                type={
                                  this.state.showPassword ? "text" : "password"
                                }
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isValid={touched.password && !errors.password}
                                isInvalid={
                                  touched.password && !!errors.password
                                }
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
                            <FormControl.Feedback
                              type="invalid"
                              className={
                                touched.password && !!errors.password
                                  ? "d-block"
                                  : ""
                              }
                            >
                              {errors.password}
                            </FormControl.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
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
                <p className="px-3 mb-2 pt-3">
                  Hai già un account? Accedi cliccando
                  <a href="/login"> qui!</a>
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
    );
  };
}
