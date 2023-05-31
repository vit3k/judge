"use client";

import { Menu } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react';

const ProfileMenu = () => {
    const { data: session } = useSession();
    return session ? <Menu as="div">
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">{session?.user?.name}
                <svg className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </Menu.Button>
                <Menu.Items className="text-sm text-gray-700 text-right p-2 absolute right-6 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item><button onClick={() => signOut()}>Logout</button></Menu.Item>
                </Menu.Items>
            </Menu> : <></>
}

export default ProfileMenu;