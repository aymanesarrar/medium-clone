import { NextPage } from "next";
import { MouseEventHandler, useState } from "react";
import Form from "../components/layouts/Form";
import * as S from "../styles/pages/Login.style";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Login: NextPage = () => {
  const [rEmail, setREmail] = useState(false);
  const handleEmail: MouseEventHandler = (e) => {
    e.preventDefault();
    setREmail(!rEmail);
  };
  return (
    <S.Login>
      <S.LoginFormContainer>
        {!rEmail ? (
          <S.LoginForm>
            <S.MeduimTitle> Welcome back </S.MeduimTitle>
            <S.ButtonsContainer>
              <S.ButtonSignInWithGoogle>
                <S.googleIcon>
                  <FcGoogle />
                </S.googleIcon>
                <S.SignInWithGoogleText>
                  Sign in with Google
                </S.SignInWithGoogleText>
              </S.ButtonSignInWithGoogle>
              <S.ButtonSignInWithFacebook>
                <S.facebookIcon>
                  <FaFacebookSquare />
                </S.facebookIcon>
                Sign In with Facebook
              </S.ButtonSignInWithFacebook>
              <S.ButtonSignInWithEmail onClick={handleEmail}>
                <S.emailIcon>
                  <SiGmail />
                </S.emailIcon>
                Sign In with email
              </S.ButtonSignInWithEmail>
            </S.ButtonsContainer>
            <S.SignUp>
              <S.SignUpText>
                <span> Don&apos;t have an account?</span>
                <S.SignUpLink to="/register">Sign Up</S.SignUpLink>
              </S.SignUpText>
            </S.SignUp>
          </S.LoginForm>
        ) : (
          <Form title="Sign In" />
        )}
      </S.LoginFormContainer>
    </S.Login>
  );
};
export default Login;
