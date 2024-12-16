import validateToken from "@/app/utils/validateToken";
import NavContent from "./NavContent";

const Navbar = () => {
  const isTokenExpired: boolean = validateToken();
  return (
    <nav className="bg-indigo-600 py-3 px-2 sm:px-4 fixed top-0 left-0 w-full z-50">
      <NavContent isTokenExpired={isTokenExpired} />
    </nav>
  );
};

export default Navbar;
