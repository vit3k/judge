'use client';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    username: string,
    password: string,
  };

export default function LoginPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const searchParams = useSearchParams();
    let callbackUrl = searchParams.get('callbackUrl') || '/';
    const onSubmit: SubmitHandler<Inputs> = data => {
        signIn('credentials', {...data, callbackUrl});
    }

    return (
        <div className="w-full flex justify-center items-start h-screen bg-gray-700">
            <form onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col m-10 items-center 
                    rounded-t border-0 shadow-md p-10 bg-white
                    shadow-gray-500/50 gap-6">
                <h1 className="text-lg text-gray-700 font-semibold">Logowanie</h1>
                <input type="text" placeholder="Nazwa uzytkownika"
                    className="border-[1px] border-gray-100 rounded-lg px-6 py-2 text-gray-500"
                    {...register("username", { required: true })}/>
                <input {...register("password", { required: true })}  type="password" placeholder="Hasło"
                    className="border-[1px] border-gray-100 rounded-lg px-6 py-2 text-gray-500"/>
                <button type="submit"
                     className="border-[1px] border-gray-100 rounded-md px-4 py-2
                     bg-gray-700/90 text-gray-300 text-sm hover:bg-gray-700/100 font-medium">
                        Zaloguj
                </button>
                {searchParams.has('error') ? 
                <div className="bg-rose-600/25 text-rose-400 text-center w-full py-2 border-0 
                    border-rose-600/40 font-semibold">Błąd logowania</div> : <></>}
            </form>
        </div>
      )

}