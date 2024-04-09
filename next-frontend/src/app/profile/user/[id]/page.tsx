import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const userDetailsApi = async () => {
    try {
      const response = await fetch(`http:localhost:4000/user/${params.id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${session?.tokens.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      return await responseJson;
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const data = await userDetailsApi();

  return (
    <div>
      {'{ "'}id{'"'}: {params.id},{' "'}login email{'" '}: {' "'}
      {session?.user.email}
      {'" }'}
      <div>{data && JSON.stringify(data, null, 2)}</div>
    </div>
  );
};

export default UserProfile;
