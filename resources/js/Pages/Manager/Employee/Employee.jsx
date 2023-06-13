import React, { useState, useEffect, useRef } from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import { RiEditLine, RiDeleteBin2Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import Layout from "../../Layouts/Default";
import SuccessAlert from "@/Components/SuccessAlert";
import DeleteModal from "@/Components/DeleteModal";

export default function Employee({ employees, session, user }) {

  const rows = employees.map((employee) => ({
    id: employee.id,
    name: employee.name,
    nip: employee.nip,
    roles: employee.roles
  }));

  const columns = [
    { 
      field: 'nip', 
      headerName: 'NIP Pegawai', 
      width: 150 ,
    },
    { field: 'name', headerName: 'Nama', width: 200 },
    { field: 'roles', headerName: 'Jabatan', width: 150 },
  ];

  return (
    <>
      <Head title='TenagaKerja-Admin' />
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
                      getRowId={(row) => row.nip}
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