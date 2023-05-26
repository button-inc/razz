export default function Login() {

  const URL = import.meta.env.BASE_URL + 'auth/login';
  return (
    <>
      <form action={URL} method="POST">
        <input className="link-button" type="submit" value="Login with Github" />
      </form>
    </>
  );
}
