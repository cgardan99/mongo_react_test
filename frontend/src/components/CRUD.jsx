import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function CRUD() {
    const [users, setUsers] = useState([])
    const [idEdit, setIdEdit] = useState('')
    const [creation, setCreation] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const getData = async() => {
        const res = await axios.get('/api/users')
        setUsers(res.data)
    }

    const cleanFields = () => {
        setFirstName('');
        setSecondName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setIsAdmin(false);
    }

    const sendNewData = async (payload) => {
        var res;
        if(creation){
            res = await axios.post('/api/users/new', payload)   
        } else {
            res = await axios.post('/api/users/update/' + idEdit, payload)
            setCreation(true);
        }
        setUsers(res.data)
        cleanFields();
    }

    const startEdit = (e, u) => {
        setCreation(false);
        setFirstName(u.firstName);
        setSecondName(u.secondName);
        setUserName(u.userName);
        setEmail(u.email);
        setPassword(u.password);
        setIsAdmin(u.isAdmin);
        setIdEdit(u._id);
    }

    const startDelete = async (e, u) => {
        var res = await axios.get('/api/users/delete/' + u._id)
        setUsers(res.data)
    }

    const cancelEdit = () => {
        setCreation(true);
        setFirstName('');
        setSecondName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setIsAdmin('');
        setIdEdit('');
    }

    useEffect(() => {
      getData()
    }, [])

    const manageSubmit = (evt) => {
        evt.preventDefault();
        sendNewData({
            firstName: firstName,
            secondName: secondName,
            userName: userName,
            email: email,
            password: password,
            isAdmin: isAdmin
        })
    } 

    return (
        <div className="p-20">
            <h1 className="font-light text-4xl">
                {
                    creation ? "Crear ": "Editar "
                }Usuario
            </h1>
            <div className="w-full text-2xl font-light m-3 bg-white p-10 shadow-md rounded-md">
                <form action="" onSubmit={(e) => manageSubmit(e)}>
                    <label htmlFor="">
                        <p>Primer nombre:</p>
                        <input value={firstName} className="w-full rounded-md border border-gray-300 p-3" onChange={(e) => {setFirstName(e.target.value)}} type="text" name="firstName" required />
                    </label><br /><br />
                    <label htmlFor="">
                        <p>Segundo nombre:</p>
                        <input value={secondName} className="w-full rounded-md border border-gray-300 p-3" onChange={(e) => {setSecondName(e.target.value)}} type="text" name="secondName" required />
                    </label><br /><br />
                    <label htmlFor="">
                        <p>Nombre de usuario:</p>
                        <input value={userName} className="w-full rounded-md border border-gray-300 p-3" onChange={(e) => {setUserName(e.target.value)}} type="text" name="userName" required />
                    </label><br /><br />
                    <label htmlFor="">
                        <p>Email:</p>
                        <input value={email} className="w-full rounded-md border border-gray-300 p-3" onChange={(e) => {setEmail(e.target.value)}} type="email" name="email" required />
                    </label><br /><br />
                    <label htmlFor="">
                        <p>Contraseña:</p>
                        <input value={password} className="w-full rounded-md border border-gray-300 p-3" onChange={(e) => {setPassword(e.target.value)}} type="password" name="password" required />
                    </label><br /><br />
                    <label htmlFor="">
                        Es administrador:
                        <input checked={isAdmin} className="ml-3" onChange={(e) => {setIsAdmin(e.target.checked)}} name="isAdmin " type="checkbox" />
                    </label><br /><br />
                    <input type="submit" value="Enviar" className="rounded-lg bg-blue-500 font-bold text-lg p-2 cursor-pointer text-white text-center" />
                    {
                        creation ? "" : <button onClick={(e) => cancelEdit()} className="rounded-lg bg-red-500 font-bold text-lg ml-5 p-2 cursor-pointer text-white text-center" >Cancelar</button>
                    }
                </form>
            </div><br />
            <h1 className="font-light text-4xl">Usuarios existentes:</h1>
            {users.map(u =>
                    <div key={u._id} className="bg-white m-3 hover:bg-gray-200 rounded-md shadow-md p-5 duration-75">
                        <Link key={u._id + "1"} to={"/user/" + u._id}>
                            <p className="font-bold text-lg">{u.userName} ({u.email})</p>
                            <p className="font-light text-md">{u.firstName}</p>
                            { u.isAdmin ? <b>Admin</b> : <b>No admin</b> }
                            <br />
                        </Link>
                        <button className="rounded-lg bg-green-500 font-light text-lg p-1 cursor-pointer text-white text-center" onClick={ e => startEdit(e, u)}>Editar</button>
                        <button className="rounded-lg bg-red-500 ml-5 font-light text-lg p-1 cursor-pointer text-white text-center" onClick={ e => startDelete(e, u)}>Eliminar</button>
                    </div>
            )}
        </div>
    )
}
