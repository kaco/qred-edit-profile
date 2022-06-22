import { useRouter } from "next/router";
import { Profile } from "../features/profile/profileSlice";

interface ProfileListItemProps {
  profile: Profile;
}

export const ProfileListItem = ({
  profile: { id, name, email },
}: ProfileListItemProps) => {
  const router = useRouter();
  return (
    <div
      className="profile-list-item"
      onClick={() => {
        router.push(`/edit-profile/${id}`);
      }}
    >
      <div>
        {name} ({email})
      </div>
    </div>
  );
};
