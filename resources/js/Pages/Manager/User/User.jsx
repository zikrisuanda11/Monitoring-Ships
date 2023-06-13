import React from "react";
import Layout from "../../Layouts/Default";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Head } from "@inertiajs/inertia-react";

export default function Users({ users, user }) {
  const rows = users.map((user, index) => ({
    no: index + 1,
    id: user.id,
    nip: user.nip,
    name: user.name,
    email: user.email,
    roles: user.roles.map((role) => role.name)
  }));

  const columns = [
    { field: 'nip', headerName: 'NIP Pegawai', width: 200 },
    { field: 'name', headerName: 'Nama', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'roles', headerName: 'Jabatan', width: 150 },
  ];

  return (
    <>
      <Head title='TenagaKerja-Manager' />
      <Layout user={user}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Data Tenaga Kerja</h1>
              <p className="mt-2 text-sm text-gray-500">
                List Nama, Email & Jabatan para tenaga kerja
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <div style={{ height: 480, width: '100%' }}>
                    <DataGrid
                      getRowId={(row) => row.email}
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