import React from 'react';
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'

export default function PopoverHover({ icon, content }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      as="div"
      className="relative text-xs"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {({ isOpen }) => (
        <>
          <Popover.Button
            className={`${
              isOpen ? '' : 'text-opacity-90'
            } text-white group bg-gray-500 rounded-md text-sm font-medium hover:text-opacity-100 my-1`}
          >
            {icon}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 left-0 w-48 bg-white rounded-lg shadow-lg text-center"
            >
              <div className="p-4">{content}</div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
