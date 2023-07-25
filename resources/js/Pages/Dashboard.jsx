import React, { useEffect, useState } from "react";
import Layout from "./Layouts/Default";
import Chartjs from "@/Components/Chartjs";
import { Head } from "@inertiajs/inertia-react";
import { GrPrevious, GrNext } from 'react-icons/gr'
import { Inertia } from "@inertiajs/inertia";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard({ user, totalKapal, totalKegiatanKapal, charts, totalDataBongkarMuat, monthBongkar, monthEta, monthEtd }) {
  const [bongkarMonth, setFrontMonth] = useState(monthBongkar);
  const [etaMonth, setEtaMonth] = useState(monthEta);
  const [etdMonth, setEtdMonth] = useState(monthEtd);
  console.log('eta', etaMonth);
  console.log('etd', etdMonth);
  console.log('bongkarMonth', bongkarMonth);

  useEffect(() => {
    Inertia.post('/dashboard',{
      month_bongkar: bongkarMonth,
      month_eta: etaMonth,
      month_etd: etdMonth,
    });
  }, [bongkarMonth, etaMonth, etdMonth])

  const handleBongkarNext = (e) => {
    setFrontMonth((prevCounter) => prevCounter+1)
    
  }
  const handleBongkarPrev = () => {
    setFrontMonth((prevCounter) => prevCounter-1)
  }

  return (
    <>
      <Head title='Dashboard-Admin' />
      <Layout user={user}>
        <div className="mx-8 flex flex-col gap-5">
          {/* <h3 className="text-lg leading-6 font-medium text-gray-900 flex gap-2">Last 30 days
            <PopoverHover
              className="mx-2"
              icon={<RiErrorWarningFill size={12} />}
              content={<div>Data persentase diambil dari data bulan sebelumnya</div>}
            />
          </h3> */}
          <div className="grid grid-cols-12 gap-3 w-full">
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
          <div className="container mt-10 grid grid-cols-2 gap-10">
            <div className="flex items-center">
              <button onClick={() => setEtdMonth((prev) => prev-1)}><GrPrevious /></button>
              <Chartjs charts={charts[2].etd} label={charts[2].label} yLabel={'jumlah data'} />
              <button onClick={() => setEtdMonth((prev) => prev+1)}><GrNext /></button>
            </div>
            <div className="flex items-center">
              <button onClick={() => setEtaMonth((prev) => prev-1)}><GrPrevious /></button>
              <Chartjs charts={charts[1].eta} label={charts[1].label} yLabel={'jumlah data'} />
              <button onClick={() => setEtaMonth((prev) => prev+1)}><GrNext /></button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-12 justify-content-center">
            <div className="col-span-2"></div>
            <div className="col-span-8 flex items-center">
              <button onClick={handleBongkarPrev}><GrPrevious /></button>
              <Chartjs charts={charts[0].chartKapal} label={charts[0].label} yLabel={'jumlah data'} />
              <button onClick={handleBongkarNext}><GrNext /></button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}