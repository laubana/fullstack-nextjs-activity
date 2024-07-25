import { signOut } from "@services/actions";

export default ({ children }) => {
  return (
    <>
      <header id="auth-header">
        <p>Welcome back!</p>
        <form action={signOut}>
          <button type="submit">Sign Out</button>
        </form>
      </header>
      {children}
    </>
  );
};
