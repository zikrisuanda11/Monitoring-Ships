import React from "react";
import Layout from "../Layouts/Default";
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ClockIcon,
    CreditCardIcon,
    DocumentReportIcon,
    HomeIcon,
    ScaleIcon,
    UserGroupIcon,
} from '@heroicons/react/outline'
import {
    CashIcon,
    ChevronRightIcon,
} from '@heroicons/react/solid'

const stats = [
    { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
    { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
    { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'History', href: '#', icon: ClockIcon, current: false },
    { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
    { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
    { name: 'Reports', href: '#', icon: DocumentReportIcon, current: false },
]

const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
}

const transactions = [
    {
        id: 1,
        name: 'Payment to Molly Sanders',
        href: '#',
        amount: '$20,000',
        currency: 'USD',
        status: 'success',
        date: 'July 11, 2020',
        datetime: '2020-07-11',
    },
    // More transactions...
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    return (
        <Layout>
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
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
            </div>
            <div className="mt-8">
                <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                    Recent activity
                </h2>

                {/* Activity list (smallest breakpoint only) */}
                <div className="shadow sm:hidden">
                    <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                        {transactions.map((transaction) => (
                            <li key={transaction.id}>
                                <a href={transaction.href} className="block px-4 py-4 bg-white hover:bg-gray-50">
                                    <span className="flex items-center space-x-4">
                                        <span className="flex-1 flex space-x-2 truncate">
                                            <CashIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span className="flex flex-col text-gray-500 text-sm truncate">
                                                <span className="truncate">{transaction.name}</span>
                                                <span>
                                                    <span className="text-gray-900 font-medium">{transaction.amount}</span>{' '}
                                                    {transaction.currency}
                                                </span>
                                                <time dateTime={transaction.datetime}>{transaction.date}</time>
                                            </span>
                                        </span>
                                        <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <nav
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                        aria-label="Pagination"
                    >
                        <div className="flex-1 flex justify-between">
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                            >
                                Next
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Activity table (small breakpoint and up) */}
                <div className="hidden sm:block">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col mt-2">
                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Transaction
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transactions.map((transaction) => (
                                            <tr key={transaction.id} className="bg-white">
                                                <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex">
                                                        <a href={transaction.href} className="group inline-flex space-x-2 truncate text-sm">
                                                            <CashIcon
                                                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                                {transaction.name}
                                                            </p>
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                    <span className="text-gray-900 font-medium">{transaction.amount} </span>
                                                    {transaction.currency}
                                                </td>
                                                <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                                    <span
                                                        className={classNames(
                                                            statusStyles[transaction.status],
                                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                                        )}
                                                    >
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                    <time dateTime={transaction.datetime}>{transaction.date}</time>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <nav
                                    className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                                    aria-label="Pagination"
                                >
                                    <div className="hidden sm:block">
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                            <span className="font-medium">20</span> results
                                        </p>
                                    </div>
                                    <div className="flex-1 flex justify-between sm:justify-end">
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Previous
                                        </a>
                                        <a
                                            href="#"
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Next
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}