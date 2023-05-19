export default function Login () {
    return (
        <>
            {/* display a link that will prompt users to authenticate your app. */}
            <div className="login">
                <a href={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`}>Login with GitHub</a>
            </div>
        </>
    )
}
