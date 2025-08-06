import type { Models } from "appwrite";
import { Link } from "react-router-dom";
import type { IUser } from "@/types";
import { Button } from "../ui/button";

type UserCardProps = {
	user: Models.Document & IUser;
};

export const UserCard = ({ user }: UserCardProps) => {
	return (
		<Link to={`/profile/${user.$id}`} className="user-card">
			<img
				src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
				className="rounded-full w-14 h-14"
				alt="user"
			/>
			<div className="flex-center flex-col gap-1">
				<p className="base-medium text-light-1 text-center line-clamp-1">
					{user.name}
				</p>
				<p className="text-light-3 items-center small-regular line-clamp-1">
					@{user.username}
				</p>
			</div>

			<Button className="shad_button-primary px-5" size="sm" type="button">
				Follow
			</Button>
		</Link>
	);
};
