import React, { useState } from "react";
import Layout from "../../Layouts/Default";
import PopoverHover from "@/Components/Popover";
import { Inertia } from '@inertiajs/inertia';
import {
	RiErrorWarningFill
} from "react-icons/ri";
import Alert from "@/Components/Alert";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import SelectServiceCode from "@/Components/Selects/SelectServiceCode";
import ComboboxShip from "@/Components/ComboboxShip";

export default function ActivityCreate({ ships, errors, user }) {
	const [activity_id, setActivityId] = useState('');
	const [ship_id, setShipId] = useState('');
	const [eta, setEta] = useState('');
	const [etd, setEtd] = useState('');
	const [service_code, setServiceCode] = useState('');

	const storeActivity = async (e) => {
		e.preventDefault();

		Inertia.post('/admin/activities', {
			activity_id: activity_id,
			ship_id: ship_id,
			eta: eta,
			etd: etd,
			service_code: service_code
		});
	}

	const handleReset = () => {
		setActivityId("");
		setShipId("");
		setEta("");
		setEtd("");
		setServiceCode("");
		Inertia.visit('/admin/activities');
	};

	return (
		<Layout user={user}>
			<div className="space-y-6">

				<div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Informasi Aktifitas Kapal</h3>
							<p className="mt-1 text-sm text-gray-500">Tambahkan informasi aktifitas kapal.</p>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<form onSubmit={storeActivity}>
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-6">
										<label htmlFor="activity_id" className="text-sm font-medium text-gray-700 flex">
											Vessel ID
											<span className="text-red-500 text-sm mx-1"> *</span>
										</label>
										<input
											value={activity_id}
											onChange={(e) => {
												setActivityId(e.target.value)
											}}
											placeholder="Contoh: VS1142"
											type="text"
											name="activity_id"
											id="activity_id"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											
										/>
										{errors.activity_id && (
											<Alert message={errors.activity_id} />
										)}
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="ship_id" className="text-sm font-medium text-gray-700 relative flex">
											Nama Kapal
											<span className="text-red-500 text-sm mx-1"> *</span>
										</label>
										<ComboboxShip onDataChange={setShipId} datas={ships}/>
										{errors.ship_id && (
											<Alert message={errors.ship_id} />
										)}
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="ship_id" className="text-sm font-medium text-gray-700 relative flex">
											Service Code
											<span className="text-red-500 text-sm mx-1"> *</span>
										</label>
										<SelectServiceCode
											onDataChange={setServiceCode}
											values={[
												{ key: "siklus_pelayanan_air", name: "Siklus Pelayanan Air" },
												{ key: "siklus_pelayanan_keberangkatan", name: "Siklus Pelayanan Keberangkatan" },
												{ key: "siklus_pelayanan_labuh", name: "Siklus Pelayanan Labuh" },
												{ key: "siklus_pelayanan_perpanjangan", name: "Siklus Pelayanan Perpanjangan" },
												{ key: "siklus_pelayanan_perubahan_kapal", name: "Siklus Pelayanan Perubahan Kapal" },
												{ key: "siklus_pelayanan_pindah", name: "Siklus PelayananPindah" },
												{ key: "siklus_pelayanan_tambat", name: "Siklus Pelayanan Tambat" }
											]}
										/>
										{errors.ship_id && (
											<Alert message={errors.ship_id} />
										)}
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="eta" className="text-sm font-medium text-gray-700 relative mb-2 flex">
											ETA
											<span className="text-red-500 text-sm mx-1"> *</span>
											<PopoverHover
												icon={<RiErrorWarningFill size={12} />}
												content={<div><strong>Estimated Time Arrive</strong><p>Memperkirakan waktu tiba kapal di Armada</p></div>}
											/>
										</label>
										<DateTimePicker
											sx={{
												width: '100%'
											}}
											slotProps={{ textField: { size: 'small' } }}
											label="Estimated Time Arrive"
											onChange={setEta}
											id="eta"
											name="eta"
										/>
										{errors.eta && (
											<Alert message={errors.eta} />
										)}
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="etd" className="flex text-sm font-medium text-gray-700 mb-2 relative">
											ETD
											<span className="text-red-500 text-sm mx-1"> *</span>
											<PopoverHover
												icon={<RiErrorWarningFill size={12} />}
												content={<div><strong>Estimated Time Departure</strong><p>Memperkirakan waktu keberangkatan kapal dari Armada</p></div>}
											/>
										</label>
										<DateTimePicker
											sx={{
												width: '100%'
											}}
											slotProps={{ textField: { size: 'small' } }}
											label="Estimated Time Departure"
											onChange={setEtd}
											id="etd"
											name="etd"
										/>
										{errors.etd && (
											<Alert message={errors.etd} />
										)}
									</div>

								</div>
								<div className="flex my-5">
									<button
										onClick={handleReset}
										type="button"
										className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Simpan
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>


			</div>
		</Layout>
	)
}