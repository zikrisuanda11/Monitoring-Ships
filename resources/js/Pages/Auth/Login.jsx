import React from "react"
import { useForm } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import Alert from "@/Components/Alert";

export default function Login({ errors }) {
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
  });


  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    Inertia.post('login', {
      email: data.email,
      password: data.password,
    })
  };

  return (
    <>
      <div className="min-h-full flex h-screen bg-blue-50">
        <div className="flex-2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 mx-auto w-auto"
                src="assets/image/logo_pelindo.png"
                alt="Workflow"
              />
            </div>

            <div className="mt-8">

              <div className="mt-6">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <form onSubmit={submit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={handleOnChange}
                          value={data.email}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && (
                          <Alert message={errors.email} />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={handleOnChange}
                          value={data.password}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="assets/image/kapal_kargo.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  )
}
