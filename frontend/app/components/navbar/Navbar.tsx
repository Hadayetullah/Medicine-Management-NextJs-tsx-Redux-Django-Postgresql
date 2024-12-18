import { headers } from "next/headers";
import NavContent from "./NavContent";

const Navbar = () => {
  const tokenStatus = headers().get("access-token-status");
  const isAccessTokenExpired = tokenStatus !== "valid"; // If no header, assume expired

  console.log("Token Status: ", tokenStatus);
  return <NavContent isAccessTokenExpired={isAccessTokenExpired} />;
};

export default Navbar;
