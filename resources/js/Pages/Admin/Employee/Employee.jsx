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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false)

  const modalContent = useRef({
    title: '',
    description: '',
    id: null,
    actionConfirm: null,
  })

  const handleDelete = () => {
    Inertia.delete(`/admin/employees/${modalContent.current.id}`)
    closeModal();
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeModalMessage = () => {
    setIsModalMessageOpen(false)
  }

  useEffect(() => {
    if (session.success.message) {
      setIsModalMessageOpen(true);
    }
  }, [session.success.message]);

  const rows = employees.map((employee, index) => ({
    id: employee.id,
    name: employee.name,
    nip: employee.nip,
    roles: employee.roles
  }));

  const columns = [
    { 
      field: 'nip', 
      headerName: 'NIP Pegawai', 
      width: 200 ,
    },
    { field: 'name', headerName: 'Nama', width: 200 },
    { field: 'roles', headerName: 'Jabatan', width: 150 },
    {
      sortable: false,
      field: 'id',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        const isDeleteUser = () => {
          modalContent.current = {
            title: 'Hapus Data',
            description: 'Data yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin melanjutkan penghapusan data armada kapal?',
            id: params.row.id,
            actionConfirm: handleDelete,
          };

          openModal();
        };
        return (
          <>
            <InertiaLink as="button" key={`edit-${params.row.id}`} href={`/admin/employees/${params.row.id}/edit`}>
              <RiEditLine size={18} className="text-indigo-600 hover:text-indigo-900 mx-1" />
            </InertiaLink>
            <button
              onClick={isDeleteUser}
              type="button"
            >
              <RiDeleteBin2Line size={18} className="text-indigo-600 hover:text-indigo-900 mx-1" />
            </button>
          </>
        )
      },
    },
  ];

  return (
    <>
      <Head title='TenagaKerja-Admin' />
      <Layout user={user}>
        {session.success.message && (
          <SuccessAlert
            openModal={isModalMessageOpen}
            closeModal={closeModalMessage}
            message={session.success.message}
          />
        )}
        {isModalOpen && <DeleteModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          title={modalContent.current.title}
          description={modalContent.current.description}
          actionConfirm={modalContent.current.actionConfirm}
        />}

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Data Tenaga Kerja</h1>
              <p className="mt-2 text-sm text-gray-500">
                List Nama, Email & Jabatan para tenaga kerja
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                <InertiaLink
                  href="/admin/employees/create"
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