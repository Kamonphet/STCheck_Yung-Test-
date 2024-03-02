import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "../assets/logo.png"
import { Logout } from '../middleware/authMiddle'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import { getUser } from '../middleware/authMiddle'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ifLogout=()=>{
  Swal.fire({
    title: 'แน่ใจนะว่าจะออก?',
    text: "มันก็ดีนะ แต่! คิดอีกที",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ใช่ ออกเลย',
    cancelButtonText: 'ไม่ เดี๋ยวคิดอีกที'
  }).then((result) => {
    if (result.isConfirmed) {
      Logout()
    }
  })
}
// if load  component is Login then getitem sesstionStorage

export default function Navbar_main() {

  let {slug} = useParams()

  const user = getUser()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Check Name', href: `/checkname/${slug}`, current: false },
    { name: 'Game', href: `/game/${slug}`, current: false },
    { name: 'Report', href: '#', current: false },
  ]

  const [active, setActive] = useState(null);

  useEffect(() => {
    const scrollActive = () => {
      setActive(window.scrollY > 10);
    };
    window.addEventListener("scroll", scrollActive);
    return () => window.removeEventListener("scroll", scrollActive);
  }, [active]);


  return (
    <Disclosure as="nav" className="bg-blue-400">
      {({ open }) => (
        <>
          <div className={`${active ? "shadow-lg bg-blue-400" : "bg-white"} fixed min-w-full top-0 left-0 z-20 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 `}>
            <div className={`${active ? "py-2 transition-all duration-500 text-white" : "py-4"} relative flex h-16 items-center justify-between`}>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <a href='/dashboard' className="flex flex-shrink-0 items-center ">
                  <img
                    className="h-20 w-auto mt-2"
                    src={logo}
                    alt="Your Company"
                  />
                </a>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 mt-5">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-amber-300',
                          'rounded-md px-3 py-2 text-md font-bold'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                             
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://source.unsplash.com/random?wallpapers"
                        alt=""
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 ">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(active ? 'bg-blue-200' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <h1 className='font-bold'>ข้อมูลของคุณ</h1>
                            <p> User: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>ระดับสมาชิก: {user.role}</p>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-blue-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={()=>ifLogout()}
                            className={classNames(active ? 'bg-blue-100' : '', 'block px-4 py-2 w-full text-start text-sm text-gray-700')}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
