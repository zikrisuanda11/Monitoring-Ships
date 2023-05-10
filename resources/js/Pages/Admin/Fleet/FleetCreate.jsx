import React, { useState } from "react";
import Layout from "../../Layouts/Default";
import { Inertia } from '@inertiajs/inertia';
import Alert from "@/Components/Alert";
import SelectVessel from "@/Components/Selects/SelectVessel";
import SelectStatusDoc from "@/Components/Selects/SelectStatusDoc";
import ComboboxVessel from "@/Components/ComboboxVessel";

export default function FleetCreate({ activities, errors, user }) {
	const [activity_id, setActivityId] = useState('');
	const [status_doc, setStatusDoc] = useState('');
	const [pkk_no, setPkkNo] = useState('');
	const [ppkb, setPpkb] = useState('');

	const storeFleet = async (e) => {
		e.preventDefault();

		Inertia.post('/admin/fleets', {
			activity_id: activity_id,
			status_doc: status_doc,
			pkk_no: pkk_no,
			ppkb: ppkb,
		});
	}

	const handleReset = () => {
		setActivityId("");
		setStatusDoc("");
		setPkkNo("");
		setPpkb("");
		Inertia.visit('/admin/fleets');
	};

	return (
		<Layout user={user}>
			<div className="space-y-6">

				<div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Informasi Armada Kapal</h3>
							<p className="mt-1 text-sm text-gray-500">Tambahkan informasi armada kapal.</p>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<form onSubmit={storeFleet}>
								<div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
										<label htmlFor="pkk_no" className="text-sm font-medium text-gray-700 flex">
											PKK No
											<span className="text-red-500 text-sm mx-1"> *</span>
										</label>
										<input
											value={pkk_no}
											onChange={(e) => {
												setPkkNo(e.target.value)
											}}
											placeholder="Contoh: PKK.DN.IDBPN.2011.000480"
											type="text"
											name="pkk_no"
											id="pkk_no"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											// onInvalid={(e) => e.target.setCustomValidity('PKK No Wajib Diisi.')}
										/>
										{errors.pkk_no && (
											<Alert message={errors.pkk_no} />
										)}
									</div>
									
                  <div className="col-span-6 sm:col-span-3">
										<label htmlFor="ppkb" className="text-sm font-medium text-gray-700 flex">
											PPKB
											<span className="text-red-500 text-sm mx-1"> *</span>
										</label>
										<input
											value={ppkb}
											onChange={(e) => {
												setPpkb(e.target.value)
											}}
											placeholder="Contoh: 2020057650"
											type="number"
											name="ppkb"
											id="ppkb"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											onInvalid={(e) => e.target.setCustomValidity('PPKB Wajib Diisi.')}
										/>
										{errors.ppkb && (
											<Alert message={errors.ppkb} />
										)}
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="status_doc" className="text-sm font-medium text-gray-700 relative flex">
											Status Document
											<span className="text-red-500 text-sm mx-1"> *</span>
										</label>
										<SelectStatusDoc
											onDataChange={setStatusDoc}
											values={[
												{ key: "nota", name: "Nota" },
												{ key: "cancel_pkk", name: "Cancel PKK" },
												{ key: "dtjk", name: "DTJK" },
												{ key: "pranota", name: "Pranota" },
											]}
										/>
										{errors.status_doc && (
											<Alert message={errors.status_doc} />
										)}
									</div>
                  <div className="col-span-6 sm:col-span-3">
										<label htmlFor="activity_id" className="text-sm font-medium text-gray-700 flex">
											Vessel ID
											<span className="text-red-500 text-sm mx-1"> *</span>
										</label>
                    {/* <SelectVessel
                      onDataChange={setActivityId}
                      activities={activities}
                    /> */}
										<ComboboxVessel
											onDataChange={setActivityId}
											activities={activities}
										/>
										{errors.activity_id && (
											<Alert message={errors.activity_id} />
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