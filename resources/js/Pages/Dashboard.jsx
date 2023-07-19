import React from "react";
import Layout from "./Layouts/Default";
import Chartjs from "@/Components/Chartjs";
import { Head } from "@inertiajs/inertia-react";
import {TbCrane} from 'react-icons/tb';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard({ user, totalKapal, totalKegiatanKapal, charts, totalDataBongkarMuat }) {

  return (
    <>
      <Head title='Dashboard-Admin' />
      <Layout user={user}>
        <div className="mx-8">
          {/* <h3 className="text-lg leading-6 font-medium text-gray-900 flex gap-2">Last 30 days
            <PopoverHover
              className="mx-2"
              icon={<RiErrorWarningFill size={12} />}
              content={<div>Data persentase diambil dari data bulan sebelumnya</div>}
            />
          </h3> */}
          <div className="grid grid-cols-12 gap-3 w-full mt-5">
            <div className="border col-span-4 shadow-md px-4 py-5 rounded-md flex justify-between items-center">
              <div>
                <dt className="text-base font-normal text-gray-900">Total Data Kapal</dt>
                <span className="text-xl font-semibold text-indigo-600">{totalKapal}</span>
              </div>
              <div className="w-16 h-auto" >
                <img src="/assets/image/cherry-ship-1.png" alt="" />
              </div>
            </div>
            <div className="border col-span-4 shadow-md px-4 py-5 rounded-md flex justify-between items-center">
              <div>
                <dt className="text-base font-normal text-gray-900">Total Data Bongkar Muat</dt>
                <span className="text-xl font-semibold text-indigo-600">{totalDataBongkarMuat}</span>
              </div>
              <div className="w-16 h-auto" >
                <img src="/assets/image/icons8-crane-64.png" alt="" />
              </div>
            </div>
            <div className="border col-span-4 shadow-md px-4 py-5 rounded-md flex justify-between items-center">
              <div>
                <dt className="text-base font-normal text-gray-900">Total Data Kegiatan Kapal</dt>
                <span className="text-xl font-semibold text-indigo-600">{totalKegiatanKapal}</span>
              </div>
              <div className="w-12 h-auto">
                <img src="/assets/image/transistor-crane-with-cargo.png" alt="" />
              </div>
            </div>
          </div>
          <div className="container mt-10 grid grid-cols-2 gap-7">
            <div className="">
              <Chartjs charts={charts[2].etd} label={charts[2].label} yLabel={'jumlah data'} />
            </div>
            <div className="">
              <Chartjs charts={charts[1].eta} label={charts[1].label} yLabel={'jumlah data'} />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-12 justify-content-center">
            <div className="col-span-2"></div>
            <div className="col-span-8">
              <Chartjs charts={charts[0].chartKapal} label={charts[0].label} yLabel={'jumlah data'} />
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </Layout>
    </>
  )
}