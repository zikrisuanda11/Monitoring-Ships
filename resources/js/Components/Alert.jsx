import React from "react";
import { XCircleIcon } from '@heroicons/react/solid'

export default function Alert({ message }) {

    return (
        <div className="rounded-md bg-red-50 p-2.5 my-1 full-width">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-xs font-medium text-red-800 pt-0.5">
                        {message}
                    </h3>
                </div>
            </div>
        </div>
    )
}