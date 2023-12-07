import React, { useState, useEffect } from "react";
import * as client from "./client";
import { BsFillCheckCircleFill, BsTrash3Fill, BsPlusCircleFill, BsPencil } from "react-icons/bs";
function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => { fetchUsers(); }, []);

    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };
    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div style={{color:"#808080"}}>
            <h2 style={{marginTop:"20px", textAlign:"center"}}>Users Management</h2>
            <hr />
            <table className="table" style={{maxWidth:"1200px", margin:"0 auto"}}>
                <thead>
                    <tr>
                        <th style={{color:"#808080"}}>Username</th>
                        <th style={{color:"#808080"}}>First Name</th>
                        <th style={{color:"#808080"}}>Last Name</th>
                    </tr>
                    <tr>
                        <td>
                            <input value={user.username} placeholder="username" className="form-control w-25 d-inline" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                            <input value={user.password} placeholder="password" className="ms-2 form-control w-50 d-inline" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </td>
                        <td>
                            <input value={user.firstName} placeholder="first name" className="form-control" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                        </td>
                        <td>
                            <input value={user.lastName} placeholder="last name" className="form-control" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                        </td>
                        <td>
                            <select value={user.role} className="form-select" onChange={(e) => setUser({ ...user, role: e.target.value })}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </td>
                        <td className="text-nowrap">
                            <BsPlusCircleFill onClick={createUser} style={{ fontSize: "2.5em", color:"#808080" }} />
                            <BsFillCheckCircleFill onClick={updateUser} className="me-2 ms-2 fs-1 text" style={{color:"#808080"}} />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td className="text-nowrap">
                                <button className="btn btn-outline-secondary me-2">
                                    <BsPencil onClick={() => selectUser(user)}/>
                                </button>
                                <button className="btn btn-outline-secondary me-2">
                                    <BsTrash3Fill onClick={() => deleteUser(user)}/>
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}
export default UserTable;