'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchAllUsers, deleteUser } from '@/features/auth/authTunks'
import { User } from '@/features/auth/authTypes'
import toast from 'react-hot-toast'

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { users = [], loading, error } = useSelector((state: RootState) => state.auth)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  // Delete user handler
  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId))
    }
    toast('user deleted successfully')
  }

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users List</h1>

      {loading && <p className="p-6">Loading users...</p>}
      {error && <p className="p-6 text-red-500">{error}</p>}

      {!loading && !error && currentUsers.length > 0 && (
        <>
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user: User, index: number) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{indexOfFirstUser + index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(user._id!)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  )
}
