import { GetServerSideProps } from "next";
import cookie from "cookie";
import axios from "axios";

export const authServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  // Parse cookies from the request header
  const cookies = cookie.parse(req.headers.cookie || "");

  let accessToken = cookies.accessToken || null;
  let refreshToken = cookies.refreshToken || null;

  // If no tokens, fetch them from the API
  if (!accessToken || !refreshToken) {
    try {
      // Call your DRF API to get tokens
      const response = await axios.get(`${process.env.API_BASE_URL}/get-tokens`, {
        headers: {
          // Pass any headers required by your DRF API
          Authorization: `Bearer ${cookies.sessionToken || ""}`,
        },
      });

      // Extract tokens from API response
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

      // Save tokens in HTTP-only cookies
      res.setHeader("Set-Cookie", [
        `accessToken=${newAccessToken}; HttpOnly; Secure; SameSite=Strict; Path=/;`,
        `refreshToken=${newRefreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/;`,
      ]);

      accessToken = newAccessToken;
      refreshToken = newRefreshToken;
    } catch (error) {
      console.error("Error fetching tokens:", error);

      // Redirect to login if token fetch fails
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  // Pass tokens as props to the page
  return {
    props: {
      accessToken,
      refreshToken,
    },
  };
};
