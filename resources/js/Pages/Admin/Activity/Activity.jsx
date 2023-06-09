import React, { useState, useEffect, useRef } from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import { RiEditLine, RiDeleteBin2Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import Layout from "../../Layouts/Default";
import SuccessAlert from "@/Components/SuccessAlert";
import DeleteModal from "@/Components/DeleteModal";

export default function activities({ activities = null, session, user }) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false)

  const modalContent = useRef({
    title: '',
    description: '',
    id: null,
    actionConfirm: null,
  })

  const handleDelete = () => {
    Inertia.delete(`/admin/activities/${modalContent.current.id}`)
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
      field: 'activity_id',
      headerName: 'Vessel ID',
      width: 120,
      headerAlign: 'center',
      align: 'center'
    },
    { field: 'ship_name', headerName: 'Nama Kapal', width: 250 },
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
    { field: 'eta', headerName: 'ETA', width: 170 },
    { field: 'etd', headerName: 'ETD', width: 200 },
    {
      sortable: false,
      field: 'getRowId',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        const isDeleteActivity = () => {
          modalContent.current = {
            title: 'Hapus Data',
            description: 'Menghapus data Kegiatan kapal juga menghapus data armada kapal secara tidak langsung',
            id: params.row.activity_id,
            actionConfirm: handleDelete,
          };

          openModal();
        };
        return (
          <>
            <InertiaLink as="button" key={`edit-${params.row.activity_id}`} href={`/admin/activities/${params.row.activity_id}/edit`}>
              <RiEditLine size={18} className="text-indigo-600 hover:text-indigo-900 mx-1" />
            </InertiaLink>
            <button
              onClick={isDeleteActivity}
              type="button"
            >
              <RiDeleteBin2Line size={18} className="text-indigo-600 hover:text-indigo-900 mx-1">
              </RiDeleteBin2Line>
            </button>
          </>
        )
      },
    },
  ];

  return (
    <>
      <Head title='Aktifitas-Admin' />
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
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                <InertiaLink
                  href="/admin/activities/create"
                  className="w-full"
                  tabIndex="-1"
                  method="get"
                >
                  Tambah Data
                </InertiaLink>
              </button>
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