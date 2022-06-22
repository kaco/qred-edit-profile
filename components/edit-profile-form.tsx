import { Form } from "react-final-form";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Input } from "./input";
import { useEffect } from "react";
import { fetchProfile, updateProfile } from "../features/profile/profileSlice";
import { useRouter } from "next/router";

type validator = (value: string) => any;

const required: validator = (value: any) => (value ? undefined : "Required");
const emailValidator: validator = (value: any) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    ? undefined
    : "Please type in a valid email address";
const composeValidators =
  (...validators: validator[]) =>
  (value: string) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

type Fields = "street" | "postalCode" | "city" | "email" | "phone";
export type SubmitObj = Record<Fields | "id", string>;

const fieldsMap: Record<Fields, [string, validator | validator[]]> = {
  street: ["Street name", required],
  postalCode: ["Postal code", required],
  city: ["City", required],
  email: ["Email", [required, emailValidator]],
  phone: ["Phone", required],
};

interface EditProfileFormProps {
  id?: string;
}

export const EditProfileForm = ({ id }: EditProfileFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onSubmit = async (values: any) => {
    dispatch(
      updateProfile({
        id: id || String(router.query?.id),
        ...values,
      })
    );
  };
  const profile = useAppSelector((state) =>
    state.profile.profiles.find(({ id }) => String(id) === router.query?.id)
  );

  useEffect(() => {
    if (!profile && id) {
      dispatch(fetchProfile(id));
    }
  }, [profile]);

  return (
    <div className="edit-profile-wrapper">
      <Form
        onSubmit={onSubmit}
        initialValues={{
          street: profile?.address.street,
          postalCode: profile?.address.street,
          city: profile?.address.city,
          email: profile?.email,
          phone: profile?.phone,
        }}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              {Object.keys(fieldsMap).map((key) => {
                let v = fieldsMap[key][1];
                if (Array.isArray(v)) {
                  v = composeValidators(...v);
                }

                return (
                  <Input
                    key={key}
                    label={fieldsMap[key][0]}
                    name={key}
                    validate={v}
                  />
                );
              })}
              <button type="submit" className="button">
                Save changes
              </button>
            </form>
          );
        }}
      />
    </div>
  );
};
