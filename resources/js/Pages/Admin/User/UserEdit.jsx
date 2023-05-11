import React, { useState } from "react";
import Layout from "../../Layouts/Default";
import { Inertia } from '@inertiajs/inertia';
import Alert from "@/Components/Alert";
import { Head } from "@inertiajs/inertia-react";

export default function ShipsCreate({ users, errors, user }) {
  const [name, setName] = useState(users.name);
  const [email, setEmail] = useState(users.email);
  // const [password, setPassword] = useState(users.password);

  const storeUser = async (e) => {
    e.preventDefault();

    Inertia.put(`/admin/users/${users.id}`, {
      name: name,
      email: email,
      // password: password,
    });
  }

  const handleReset = () => {
    setName("");
    setEmail("");
    // setPassword("");
    Inertia.visit('/admin/users');
  };
  return (
    <>
    <Head title='TenagaKerja-Admin' />
    <Layout user={user}>
      <div className="space-y-6">

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informasi Kapal</h3>
              <p className="mt-1 text-sm text-gray-500">Tambahkan informasi data kapal.</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={storeUser}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 relative">
                      Nama Tenaga Kerja
                      <span className="text-red-500 text-sm "> *</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="email"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.name && (
                      <Alert message={errors.name} />
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 relative flex">
                      Email
                      <span className="text-red-500 text-sm mx-1"> *</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.email && (
                      <Alert message={errors.email} />
                    )}
                  </div>

                  {/* <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 flex">
                      Password
                      <span className="text-red-500 text-sm mx-1">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.password && (
                      <Alert message={errors.password} />
                    )}
                  </div> */}

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