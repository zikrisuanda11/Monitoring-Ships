import React from "react";
import Layout from "./Layouts/Default";
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import PopoverHover from "@/Components/Popover";
import { RiErrorWarningFill } from "react-icons/ri";
import Chartjs from "@/Components/Chartjs";
import { Head } from "@inertiajs/inertia-react";
// import { Inertia } from "@inertiajs/inertia";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard({ user, stats, charts }) {
  return (
    <>
      <Head title='Dashboard-Admin' />
      <Layout user={user}>
        <div className="mx-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex gap-2">Last 30 days
            <PopoverHover
              className="mx-2"
              icon={<RiErrorWarningFill size={12} />}
              content={<div>Data persentase diambil dari data bulan sebelumnya</div>}
            />
          </h3>
          <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
            {stats.map((item) => (
              <div key={item.name} className="px-4 py-5 sm:p-6">
                <dt className="text-base font-normal text-gray-900">{item.name}</dt>

                <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {item.stat}
                    <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
                  </div>

                  <div
                    className={classNames(
                      item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                      'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                    )}
                  >
                    {item.changeType === 'increase' ? (
                      <ArrowSmUpIcon
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowSmDownIcon
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    )}

                    <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                    {item.change}
                  </div>
                </dd>
              </div>
            ))}
          </dl>
          <div className="container mt-10 grid grid-cols-2 gap-7">
            <div className="">
              <Chartjs charts={charts[2].etd} label={charts[2].label} />
            </div>
            <div className="">
              <Chartjs charts={charts[1].eta} label={charts[1].label} />
            </div>
          </div>

          <div className="container mt-10">
            <Chartjs charts={charts[0].chartKapal} label={charts[0].label} />
          </div>
        </div>
      </Layout>
    </>
  )
}