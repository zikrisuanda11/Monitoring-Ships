import React from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import Layout from "../../Layouts/Default";
import SuccessAlert from "../../Components/SuccessAlert";
import {
  RiEditLine,
  RiDeleteBin2Line
} from "react-icons/ri";
import { DataGrid } from "@mui/x-data-grid";

export default function Fleet({ fleets, session }) {
  const rows = fleets.map((fleet) => ({
    id: fleet.id,
    activity_id: fleet.activity_id,
    status_doc: fleet.status_doc,
    pkk_no: fleet.pkk_no,
    ppkb: fleet.ppkb,
    getRowId: fleet.id
  }));

  const columns = [
    { field: 'id', headerName: 'ID Armada', flex: 1 },
    { field: 'activity_id', headerName: 'ID Vessel', flex: 2 },
    { field: 'status_doc', headerName: 'Status Document', flex: 2 },
    { field: 'pkk_no', headerName: 'PKK No', flex: 2 },
    { field: 'ppkb', headerName: 'PPKB', flex: 2 },
    {
      sortable: false,
      field: 'getRowId',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <InertiaLink as="button" key={`edit-${params.row.id}`} href={`/fleets/${params.row.id}/edit`}>
            <RiEditLine size={18} className="text-indigo-600 hover:text-indigo-900 mx-1" />
          </InertiaLink>
          <InertiaLink as="button" method="delete" key={`delete-${params.row.id}`} href={`/fleets/${params.row.id}`}>
            <RiDeleteBin2Line size={18} className="text-indigo-600 hover:text-indigo-900 mx-1" />
          </InertiaLink>
        </>
      ),
    },
  ];

  return (
    <Layout>
      {session.success && (
        <SuccessAlert
          message={session.success}
        />
      )}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">fleets</h1>
            <p className="mt-2 text-sm text-gray-500">
              List logistik ID, nama kapal, ETA (Estimated Time Arrive), ETD (Estimated Time Departure)
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <InertiaLink
                href="/fleets/create"
                className="w-full"
                tabIndex="-1"
                method="get"
              >
                Tambah Data
              </InertiaLink>
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <div style={{ height: 480, width: '100%' }}>
                  <DataGrid
                    getRowId={(row) => row.activity_id}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}