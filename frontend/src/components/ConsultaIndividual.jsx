import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ConsultaIndividual() {
    let { _id } = useParams();

    const [user, setUser] = useState({})
    const getData = async() => {
      const res = await axios.get('../../api/users/' + _id)
      setUser(res.data)
    }
  
    useEffect(() => {
      getData()
    }, [])

    return (
        <div className="w-screen h-screen p-20 bg-yellow-100">
            <div className="flex flex-row">
                <h1 className="flex-grow font-bold text-4xl">Detalle del Usuario</h1>
                <Link to="../">
                    <h1 className="font-light text-2xl"> Regresar </h1>
                </Link>
            </div>
            <div className="w-full mt-4 bg-white p-10 shadow-md rounded-md">
                {
                    user ? 
                    <table className="w-full text-xl">
                        <tbody>
                            <tr>
                                <th className="p-3">First name:</th>
                                <td className="p-3">{ user.firstName }</td>
                            </tr>
                            <tr>
                                <th className="p-3">Second name:</th>
                                <td className="p-3">{ user.secondName }</td>
                            </tr>
                            <tr>
                                <th className="p-3">Email:</th>
                                <td className="p-3">{ user.email }</td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    {
                                        user.isAdmin ? <b>Administrador</b> : <b>Usuario Normal</b>
                                    }
                                </th>
                            </tr>
                        </tbody>
                    </table> :
                    <h1>No existe dicho usuario.</h1>
                }
            </div>
        </div>
    )
}
