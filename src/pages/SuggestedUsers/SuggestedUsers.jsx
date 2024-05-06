// import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
// import Heading from "../../ui/Heading";
// import Spinner from "../../ui/Spinner";
// import SuggestedUser from "./SuggestedUser";

// function SuggestedUsers() {
//   const { isLoading, suggestedUsers } = useGetSuggestedUsers();
//   console.log(suggestedUsers);
//   if (isLoading) return <Spinner />;
//   if (!suggestedUsers.length)
//     return (
//       <Heading as="h3">
//         There is not anyone for we can Suggest for you,Because you follow all of
//         the users
//       </Heading>
//     );
//   return (
//     <div className="bg-gray-700">
//       <Heading as="h3">Suggested for you</Heading>
//       {suggestedUsers.map((user) => (
//         <SuggestedUser user={user} key={user.uid} />
//       ))}
//     </div>
//   );
// }

// export default SuggestedUsers;

import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import SuggestedUser from "./SuggestedUser";

function SuggestedUsers() {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  if (isLoading) return <Spinner />;
  if (!suggestedUsers.length)
    return (
      <div className="flex flex-col  items-center justify-center py-16">
        <Heading
          className="text-center"
          fontSize={{ base: "2rem", md: "4rem" }}
          style={{ color: "#29ABE2" }}
        >
          {" "}
          <p className="text-[3rem]">There is no one to suggest for you because you follow all users.</p>
        </Heading>
      </div>
    );

  return (
    <div className=" py-8 px-4">
      <Heading as="h4" className=" text-slate-600 pb-8">
        Suggested for you
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.uid} />
        ))}
      </div>
    </div>
  );
}

export default SuggestedUsers;
