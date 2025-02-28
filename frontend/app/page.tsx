import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getRefreshToken } from "./actions/serverActions";

import TestHome from "./components/home/TestHome";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let refreshToken = null;
  const login = searchParams?.login;

  if (!login) {
    refreshToken = await getRefreshToken();

    if (!refreshToken) {
      redirect("/login");
    }
  } else if (login === "true") {
    refreshToken = cookies().get("refreshToken");
  }

  console.log("refreshToken : ", refreshToken);

  return (
    <div className="max-w-[1400px] mx-auto mt-[70px]">
      <TestHome />
    </div>
  );
}
