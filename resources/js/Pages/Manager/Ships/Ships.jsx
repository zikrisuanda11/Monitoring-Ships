import React from "react";
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from "../../Layouts/Default";
import SuccessAlert from "@/Components/SuccessAlert";
import {
  RiEditLine,
  RiDeleteBin2Line
} from "react-icons/ri";
import { DataGrid } from "@mui/x-data-grid";

export default function Ships({ ships, session, user }) {
  const rows = ships.map((ship) => ({
    id: ship.id,
    ship_name: ship.ship_name,
    grt: ship.grt,
    loa: ship.loa,
    agent: ship.agent,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'ship_name', headerName: 'Nama Kapal', flex: 3 },
    { field: 'grt', headerName: 'GRT', flex: 1 },
    { field: 'loa', headerName: 'LOA', flex: 1 },
    { field: 'agent', headerName: 'Agent', flex: 3 },
  ];

  return (
    <Layout user={user}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Ships</h1>
            <p className="mt-2 text-sm text-gray-500">
              List nama kapal, GRT(Gross Register Tonnage), LOA(Length Over All), dan nama Agent.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <div style={{ height: 480, width: '100%' }}>
                  <DataGrid
                    getRowId={rows.id}
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