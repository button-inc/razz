export default function Login() {
  const URL = import.meta.env.BASE_URL + "auth/login";
  return (
    <>
      <div>
        <p>Connect to GitHub to start estimating issues</p>
        <br />
        <form action={URL} method="POST" className="centerpage">
          <input
            className="link-button"
            type="submit"
            value="Connect to GitHub"
          />
        </form>
      </div>
    </>
  );
}
