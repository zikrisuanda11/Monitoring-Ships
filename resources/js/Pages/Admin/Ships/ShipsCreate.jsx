import React, { useState } from "react";
import Layout from "../../Layouts/Default";
import PopoverHover from "@/Components/Popover";
import { Inertia } from '@inertiajs/inertia';
import {RiErrorWarningFill} from "react-icons/ri";
import Alert from "@/Components/Alert";
import { Head } from "@inertiajs/inertia-react";

export default function ShipsCreate({ errors, user }) {
	const [ship_name, setShipName] = useState('');
	const [grt, setGrt] = useState('');
	const [loa, setLoa] = useState('');
	const [agent, setAgent] = useState('');

	const storeShip = async (e) => {
		e.preventDefault();

		Inertia.post('/admin/ships', {
			ship_name: ship_name,
			grt: grt,
			loa: loa,
			agent: agent,
		});
	}

	const handleReset = () => {
    setShipName("");
    setGrt("");
    setLoa("");
    setAgent("");
    Inertia.visit('/admin/ships');
  };
	return (
		<>
		<Head title='Kapal-Admin' />
		<Layout user={user}>
			<div className="space-y-6">

				<div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Informasi Kapal</h3>
							<p className="mt-1 text-sm text-gray-500">Tambahkan informasi data kapal.</p>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<form onSubmit={storeShip}>
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="ship_name" className="block text-sm font-medium text-gray-700 relative">
											Nama Kapal
											<span className="text-red-500 text-sm "> *</span>
										</label>
										<input
											value={ship_name}
											onChange={(e) => {
												setShipName(e.target.value)
											}}
											type="text"
											name="ship_name"
											id="ship_name"
											autoComplete="email"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
										{errors.ship_name && (
											<Alert message={errors.ship_name} />
										)}
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="agent" className="block text-sm font-medium text-gray-700 relative">
											Nama Agent
											<span className="text-red-500 text-sm "> *</span>
										</label>
										<input
											value={agent}
											onChange={(e) => {
												setAgent(e.target.value)
											}}
											type="text"
											name="agent"
											id="agent"
											autoComplete="email"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
										{errors.agent && (
											<Alert message={errors.agent} />
										)}
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="loa" className="text-sm font-medium text-gray-700 flex">
											LOA
											<span className="text-red-500 text-sm mx-1">*</span>
											<PopoverHover
												icon={<RiErrorWarningFill size={12} />}
												content={<div>Length Over All: panjang kapal dari titik terluar pada bagian depan hingga titik terluar pada bagian belakang kapal</div>}
											/>
										</label>
										<input
											value={loa}
											onChange={(e) => {
												setLoa(e.target.value)
											}}
											type="number"
											name="loa"
											id="loa"
											autoComplete="family-name"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
										{errors.loa && (
											<Alert message={errors.loa} />
										)}
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label htmlFor="grt" className="text-sm font-medium text-gray-700 relative flex">
											GRT
											<span className="text-red-500 text-sm mx-1"> *</span>
											<PopoverHover
												icon={<RiErrorWarningFill size={12} />}
												content={<div>Gross Register Tonnage: pengukuran kapasitas kapal yang digunakan untuk menghitung ukuran kapal secara kasar.</div>}
											/>
										</label>
										<input
											value={grt}
											onChange={(e) => {
												setGrt(e.target.value)
											}}
											type="number"
											name="grt"
											id="grt"
											autoComplete="given-name"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
										{errors.grt && (
											<Alert message={errors.grt} />
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
		</>
	)
}