import React from 'react';
import { usePage, InertiaLink } from '@inertiajs/inertia-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Navbar from '@/Components/Navbar';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  HomeIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { BiUserCircle } from 'react-icons/bi';
import { GiBigWave } from 'react-icons/gi';
import { MdOutlineSailing } from 'react-icons/md';
import { Head } from "@inertiajs/inertia-react";

import {RiShip2Line} from "react-icons/ri";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children, user }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { url } = usePage();

  const navigationAdmin = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, isActive: url === '/dashboard' },
    { name: 'Data Kapal', href: '/admin/ships', icon: RiShip2Line, isActive: url === '/admin/ships' || url === '/admin/ships/create' },
    { name: 'Data Kegiatan Kapal', href: '/admin/activities', icon: GiBigWave, isActive: url === '/admin/activities' || url === '/admin/activities/create' || url === '/activities/id/edit' },
    { name: 'Data Bongkar Muat Kapal', href: '/admin/fleets', icon: MdOutlineSailing, isActive: url === '/admin/fleets' || url === '/admin/fleets/create' },
    // { name: 'Data Tenaga Kerja', href: '/admin/employees', icon: BiUserCircle, isActive: url === '/admin/employees' || url === '/admin/employees/create' },
    { name: 'Data Users', href: '/admin/users', icon: BiUserCircle, isActive: url === '/admin/users' || url === '/admin/users/create' },
  ]

  const navigationManager = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, isActive: url === '/dashboard' },
    { name: 'Data Kapal', href: '/manager/ships', icon: RiShip2Line, isActive: url === '/manager/ships' },
    { name: 'Data Kegiatan Kapal', href: '/manager/activities', icon: GiBigWave, isActive: url === '/manager/activities' },
    { name: 'Data Bongkar Muat Kapal', href: '/manager/fleets', icon: MdOutlineSailing, isActive: url === '/manager/fleets' },
    // { name: 'Data Tenaga Kerja', href: '/manager/employees', icon: BiUserCircle, isActive: url === '/manager/employees' || url === '/manager/employees/create' },
    { name: 'Data Users', href: '/manager/users', icon: BiUserCircle, isActive: url === '/manager/users' || url === '/manager/users/create' },
  ]

  const isAdmin = user.roles.find(role => role.name === 'admin');
  const navigation = isAdmin ? navigationAdmin : navigationManager;

  return (
    <>
    {/* <Head title='tes' /> */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="/assets/image/logo_pelindo.png"
                      alt="Pelindo"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <InertiaLink
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                        aria-current={item.isActive ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </InertiaLink>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src="/assets/image/logo_pelindo.png"
                  alt="Pelindo"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {navigation.map((item) => (
                  <InertiaLink
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.isActive ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </InertiaLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <Navbar />
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {children}
                </LocalizationProvider>
              </div>
            </div>
          </main>
        </div>
      </div>

    </>
  )

}