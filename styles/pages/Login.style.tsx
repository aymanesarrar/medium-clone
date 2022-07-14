import styled from "styled-components";

export const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #a9baf0;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  height: 600px;
  background: rgba(13, 13, 13, 0.48);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border: 1px solid rgba(13, 13, 13, 0.3);

  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
    border-radius: 0;
  }
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #c9d0d0;
  position: absolute;
  top: 40px;
`;

export const MeduimTitle = styled.h1`
  font-size: 2.5rem;
  color: azure;
`;

export const ButtonSignInWithGoogle = styled.button`
  width: 65%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c9d0d0;
  border-radius: 18px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #070707;
  cursor: pointer;
  margin: 14px;
  text-align: start;
`;

export const ButtonSignInWithFacebook = styled.button`
  width: 65%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c9d0d0;
  border-radius: 18px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #070707;
  cursor: pointer;
  margin: 14px;
  text-align: start;
`;

export const ButtonSignInWithEmail = styled.button`
  width: 65%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c9d0d0;
  border-radius: 18px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #070707;
  cursor: pointer;
  margin: 14px;
  text-align: start;
`;

export const googleIcon = styled.span`
  font-size: 1.2rem;
`;

export const facebookIcon = styled.span`
  font-size: 1.2rem;

  color: #3b5998;
`;

export const emailIcon = styled.span`
  font-size: 1.2rem;

  color: #be3611;
`;

export const SignUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const SignUpText = styled.span`
  font-size: 1.2rem;
  color: #c9d0d0;
  cursor: pointer;
  margin-right: 10px;
`;

export const SignUpLink = styled.a`
  font-size: 1.2rem;
  color: #159898;
  cursor: pointer;
  margin-right: 10px;
  text-decoration: underline;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 400px;
  margin-top: 20px;
`;

export const SignInWithGoogleText = styled.span`
  font-size: 1.1rem;
  color: #0e0e0e;
  cursor: pointer;
  margin-left: 5px;
`;

export const SignInWithFacebookText = styled.span``;
