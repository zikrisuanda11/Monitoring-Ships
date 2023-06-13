import React from "react";
import Layout from "../../Layouts/Default";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Head } from "@inertiajs/inertia-react";

export default function activities({ activities, session, user }) {
  const rows = activities.map((activity) => ({
    activity_id: activity.activity_id,
    ship_name: activity.ships.ship_name,
    service_code: activity.service_code,
    eta: activity.eta,
    etd: activity.etd,
    getRowId: activity.activity_id
  }));

  const columns = [
    {
      field: 'ship_name',
      headerName: 'Nama Kapal',
      width: 200,

    },
    {
      field: 'service_code',
      headerName: 'Service Code',
      width: 250,
      valueGetter: (params) => {
        const capitalizedText = params.row.service_code
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return capitalizedText;
      }
    },
    {
      field: 'eta',
      headerName: 'ETA',
      width: 170,
      renderCell: (params) => {
        const date = new Date(params.row.eta)
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        return (
          <>
            {formattedDateTime}
          </>
        )
      }
    },
    { 
      field: 'etd', 
      headerName: 'ETD', 
      width: 200,
      renderCell: (params) => {
        const date = new Date(params.row.etd)
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        return (
          <>
            {formattedDateTime}
          </>
        )
      }
    },
  ];

  return (
    <>
      <Head title='Aktifitas-Manager' />
      <Layout user={user}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Data Kegiatan Kapal</h1>
              <p className="mt-2 text-sm text-gray-500">
                List Vessel ID, Nama Kapal, ETA (Estimated Time Arrive), ETD (Estimated Time Departure)
              </p>
              <div className="mt-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  <a className="text-xs" href="/print-report-daily">Cetak PDF</a>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col">
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