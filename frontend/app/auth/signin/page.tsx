import { cookies } from 'next/headers';

// workaround for https://github.com/nextauthjs/next-auth/discussions/7256
function getCsrfToken(): string {
    if(!cookies().has("next-auth.csrf-token"))
        return "";

    let cookie = cookies().get("next-auth.csrf-token")?.value;

    if (cookie) {
        let cookieParts = cookie.split("|");
        if (cookieParts.length > 0)
            return cookieParts[0];
    }
    return "";
}

export default async function LoginPage({
    searchParams,
  }: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    let csrfToken = getCsrfToken();
    let error = false;
    if (searchParams && searchParams.error) {
        error = true;
    }

    return (
        <div className="w-full flex justify-center items-start h-screen bg-gray-700">
            <form method="post" action="/api/auth/callback/credentials"
                className="flex flex-col m-10 items-center 
                    rounded-t border-0 shadow-md p-10 bg-white
                    shadow-gray-500/50 gap-6">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <h1 className="text-lg text-gray-700 font-semibold">Logowanie</h1>
                <input name="username" type="text" placeholder="E-mail"
                    className="border-[1px] border-gray-100 rounded-lg px-6 py-2 text-gray-500"/>
                <input name="password" type="password" placeholder="Password"
                    className="border-[1px] border-gray-100 rounded-lg px-6 py-2 text-gray-500"/>
                <button type="submit"
                     className="border-[1px] border-gray-100 rounded-md px-4 py-2
                     bg-gray-700/90 text-gray-300 text-sm hover:bg-gray-700/100 font-medium">
                        Zaloguj
                </button>
                {error ? 
                <div className="bg-rose-600/25 text-rose-400 text-center w-full py-2 border-0 
                    border-rose-600/40 font-semibold">Błąd logowania</div> : <></>}
            </form>
        </div>
      )

}