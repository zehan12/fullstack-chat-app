import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const userDetailsApi = async () => {
    const response = await fetch(`http:localhost:4000/user/${params.id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.tokens.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
  };

  userDetailsApi();

  return <div>user profile{params.id}</div>;
};

export default UserProfile;
