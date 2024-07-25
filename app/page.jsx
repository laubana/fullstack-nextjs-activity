import AuthForm from "@components/AuthForm";

export default async ({ searchParams }) => {
  const mode = searchParams.mode;

  return <AuthForm mode={mode} />;
};
