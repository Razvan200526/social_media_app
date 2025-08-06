import { Loader } from "@/components/shared/Loader";
import { UserCard } from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { toast } from "sonner";
const AllUsers = () => {
  const {
    data: users,
    isPending: isFetchingUsers,
    isError: ErrorFetchingUsers,
  } = useGetUsers();

  if (ErrorFetchingUsers) {
    toast("Error loading users");
  }
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">
          {isFetchingUsers && !users ? (
            <Loader />
          ) : (
            <ul className="user-grid">
              {users?.documents.map((user) => (
                <li key={user?.$id} className="flex-1 w-full min-w-[200px]">
                  <UserCard user={user} />
                </li>
              ))}
            </ul>
          )}
        </h2>
      </div>
    </div>
  );
};
//TO DO: IMPLEMENT SHOWING USERS BY FILTERS, LIKE NR OF POSTS AND OTHER STUFF
export default AllUsers;
