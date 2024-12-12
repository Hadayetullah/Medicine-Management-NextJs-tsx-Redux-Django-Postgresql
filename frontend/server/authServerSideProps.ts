// 'use server'
import { GetServerSideProps } from "next";
import {parse} from "cookie"; // For parsing cookies

export const authServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // Parse cookies from the request header
  const cookies = parse(req.headers.cookie || "");

  // Get tokens from cookies
  const accessToken = cookies.accessToken || null;
  const refreshToken = cookies.refreshToken || null;

  // Redirect if no accessToken is found
  console.log("This does not print",accessToken)
  if (!accessToken) {
    return {
      redirect: {
        destination: "/login", // Does not go to login page
        permanent: false,
      },
    };
  }

  // Pass tokens as props to the page
  return {
    props: {
      accessToken,
      refreshToken,
    },
  };
};
