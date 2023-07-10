import React from "react";
import Layout from "../../Layouts/Default";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Head } from "@inertiajs/inertia-react";

export default function Fleet({ fleets, user }) {
  const rows = fleets.map((fleet, index) => ({
    no: index + 1,
    id: fleet.id,
    ship_name: fleet.activity.ships.ship_name,
    activity_id: fleet.activity_id,
    status_doc: fleet.status_doc,
    pkk_no: fleet.pkk_no,
    ppkb: fleet.ppkb,
    getRowId: fleet.id
  }));

  const columns = [
    { field: 'activity_id', headerName: 'ID Vessel', width: 150 },
    { field: 'ship_name', headerName: 'Nama Kapal', width: 150 },
    {
      field: 'status_doc',
      headerName: 'Status Document',
      width: 150,
      valueGetter: (params) => {
        const capitalizedText = params.row.status_doc
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return capitalizedText;
      }
    },
    { field: 'pkk_no', headerName: 'No PKK', width: 230 },
    { field: 'ppkb', headerName: 'PPKB', width: 200 },
  ];

  return (
    <>
      <Head title='Armada-Manager' />
      <Layout user={user}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Data Bongkar Muat Kapal</h1>
              <p className="mt-2 text-sm text-gray-500">
                List Vessel ID, Status Dokumen, PKK No dan PPKB
              </p>
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