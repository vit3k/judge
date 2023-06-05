'use client';

import { Task } from '@/db/schema';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

interface TaskDropDownProps {
    tasks: Task[]
    currentTask: Task
}
export default function TasksDropDown({tasks, currentTask}: TaskDropDownProps) {
    const router = useRouter();
    const select = (idx: number) => {
        router.push(`/${tasks[idx].id}`)
    }
    return <Menu as="div" className="relative inline-block text-left w-full">
                <div>
                    <Menu.Button className="inline-flex w-full justify-between rounded-md bg-black bg-opacity-20 px-4 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {currentTask.name}
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute left-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            { tasks.map( (task, idx) => 
                            <Menu.Item key={task.id}>
                                {({ active }) => (
                                <button
                                    onClick={() => select(idx)}
                                    className={`${
                                    active ? 'bg-gray-700 text-white' : 'text-gray-900'
                                    } group w-full text-left rounded-md px-2 py-2 text-sm`}
                                >
                                    {task.name}
                                </button>
                                )}
                            </Menu.Item>
                            )}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
}