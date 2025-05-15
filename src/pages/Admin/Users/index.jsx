import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardCard10 from '../../../components/common/DashboardCard10'
import TableCard from '../../../components/common/ListingTableCard';
import Avatar from '../../../components/common/user-36-05.jpg'
import BACKEND_API from '../../../services/userApi';
import { useAuth } from '../../../context/AuthContext';
import { formatDateAndTime } from '../../../utils/Utils';
import { ro } from 'react-day-picker/locale';
import { toast } from 'react-toastify';

export const Users = () => {
    const nagivate = useNavigate();
    const { accessToken } = useAuth();
    const [users, setUsers] = useState([]);

    // const customerData = [
    //     {
    //         id: '0',
    //         image: Avatar,
    //         name: 'Alex Shatov',
    //         email: 'alexshatov@gmail.com',
    //         location: '🇺🇸',
    //         spent: '$2,890.66',
    //     },
    //     {
    //         id: '1',
    //         image: Avatar,
    //         name: 'Philip Harbach',
    //         email: 'philip.h@gmail.com',
    //         location: '🇩🇪',
    //         spent: '$2,767.04',
    //     },
    //     {
    //         id: '2',
    //         image: Avatar,
    //         name: 'Mirko Fisuk',
    //         email: 'mirkofisuk@gmail.com',
    //         location: '🇫🇷',
    //         spent: '$2,996.00',
    //     },
    //     {
    //         id: '3',
    //         image: Avatar,
    //         name: 'Olga Semklo',
    //         email: 'olga.s@cool.design',
    //         location: '🇮🇹',
    //         spent: '$1,220.66',
    //     },
    //     {
    //         id: '4',
    //         image: Avatar,
    //         name: 'Burak Long',
    //         email: 'longburak@gmail.com',
    //         location: '🇬🇧',
    //         spent: '$1,890.66',
    //     },
    //     {
    //         id: '5',
    //         image: Avatar,
    //         name: 'Burak Long',
    //         email: 'longburak@gmail.com',
    //         location: '🇬🇧',
    //         spent: '$1,890.66',
    //     },
    // ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await BACKEND_API.fetchAllUsers(accessToken);
                const users = result.users;
                const usersWithId = users.map((user, index) => ({
                    // id: index + 1,
                    ...user
                }));
                setUsers(usersWithId);

            } catch (err) {
                console.error(err);
            } finally {
                // setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (row) => {
        console.log('Edit:', row);
        nagivate(`/admin/users/edit/${row._id}`);
        // open edit modal or navigate
    };

    const handleDelete = async (row) => {
        try {
            console.log('Delete:', row);
            // confirm and delete logic
            const result = await BACKEND_API.deleteUserById(row._id, accessToken);
            if (result.status) {

                setTimeout(() => {                    
                    // navigate('/admin/users'); // Go back to user list after success
                    window.location.href = '/admin/users';
                }, 3000);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    };


    const customerColumns = [
        // {
        //     label: 'Name',
        //     key: 'name',
        //     render: (val, row) => (
        //         <div className="flex items-center">
        //             <img src={row.image} alt={row.name} className="w-10 h-10 rounded-full mr-2" />
        //             <span className="font-medium text-gray-800 dark:text-gray-100">{val}</span>
        //         </div>
        //     ),
        // },
        // {
        //     label : 'Id',
        //     key : '_id'
        // },
        { label: 'Email', key: 'email' },
        {
            label: 'Status',
            key: 'status',
            render: val => {
                const statusMap = {
                    ACTIVE: { text: 'Active', color: 'text-green-500' },
                    INACTIVE: { text: 'Inactive', color: 'text-blue-800' },
                    SUSPENDED: { text: 'Suspended', color: 'text-red-500' },
                    PENDING_VERIFICATION: { text: 'Pending Verification', color: 'text-yellow-500' },
                };

                const { text, color } = statusMap[val] || { text: val, color: 'text-black' };

                return <span className={`font-medium ${color}`}>{text}</span>;
            }
        },
        {
            label: 'Role',
            key: 'role',
            align: 'text-center',
        },
        {
            label: 'Created At',
            key: 'createdAt',
            align: 'text-center',
            render: val => formatDateAndTime(val)
        },
        {
            label: 'Action',
            key: 'action',
            render: (val, row) => (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="px-2 py-1 text-sm bg-violet-500 hover:bg-violet-600 text-white rounded cursor-pointer"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row)}
                        className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            ),
        }

    ];

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <TableCard title="Users" data={users} columns={customerColumns} />
        </div>
    )
}
