import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { Logo } from "../../components/logo";
import { EditProfileForm } from "../../components/edit-profile-form";
import { Spinner } from "../../components/spinner";
import { useAppSelector } from "../../hooks";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const status = useAppSelector((state) => state.profile.status);
  return (
    <div>
      <Logo />
      <div className="edit-profile-title">Edit your profile</div>
      {status === "loading" ? <Spinner /> : <EditProfileForm id={props.id} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query?.id,
    },
  };
};

export default Home;
