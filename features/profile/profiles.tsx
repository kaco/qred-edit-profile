import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProfiles } from "./profileSlice";
import { useEffect } from "react";
import { ProfileListItem } from "../../components/profile-list-item";
import {Spinner} from "../../components/spinner";

export function Profiles() {
  const { profiles, status } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div className="profiles-wrapper">
      {profiles.map((profile) => {
        return <ProfileListItem key={profile.id} profile={profile} />;
      })}
    </div>
  );
}
