import React from "react";
import Layout from "../../Layouts/Default";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Head } from "@inertiajs/inertia-react";

export default function Ships({ ships, session, user }) {
  const rows = ships.map((ship, index) => ({
    no: index + 1,
    id: ship.id,
    ship_name: ship.ship_name,
    grt: ship.grt,
    loa: ship.loa,
    agent: ship.agent,
  }));

  const columns = [
    { field: 'ship_name', headerName: 'Nama Kapal', width: 300 },
    { field: 'grt', headerName: 'GRT', width: 120 },
    { field: 'loa', headerName: 'LOA', width: 150 },
    { field: 'agent', headerName: 'Agent', width: 300 },
  ];

  return (
    <>
      <Head title='Kapal-Manager' />
      <Layout user={user}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Data Kapal</h1>
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
                      initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
                      components={{ Toolbar: GridToolbar }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}