export default function Login() {
  return (
    <>
      <form action="http://localhost:3001/auth/login" method="POST">
        <input type="submit" value="Login with Github" />
      </form>
    </>
  );
}
