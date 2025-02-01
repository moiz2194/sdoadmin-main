import React, { useEffect, useState } from 'react';
import context from './context.js';
const host = process.env.REACT_APP_BACKEND;

const State = (props) => {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false)
  const [userdata, setuserdata] = useState({})
  const [userrefferal, setuserrefferal] = useState({})
  const [history, sethistory] = useState([])
  const [withdraws, setwithdraws] = useState({
    pending: [],
    approved: [],
    rejected: []
  })
  const [deposits, setdeposits] = useState({
    pending: [],
    approved: [],
    rejected: []
  })
  const login = async (data) => {
    const response = await fetch(`${host}/api/admin/login`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('panel-paysyncr-token', json.token)
      window.location.reload()
    } else {
      alert(json.message)
    }
  }
  const getallusers = async (data) => {
    const response = await fetch(`${host}/api/admin/user`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authentication": localStorage.getItem('panel-paysyncr-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setusers(json.data)
    } else {
      alert(json.message)
    }
  }
  const getuserbyid = async (data) => {
    setloading(true)
    const response = await fetch(`${host}/api/admin/user/${data}`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authentication": localStorage.getItem('panel-paysyncr-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setuserdata(json.user)
      setuserrefferal(json.data)
      sethistory(json.history)
    } else {
      alert(json.message)
    }
    setloading(false)
  }
  const deluserbyid = async (data) => {
    setloading(true)
    const response = await fetch(`${host}/api/admin/user/${data.id}`, {
      method: "delete",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authentication": localStorage.getItem('panel-paysyncr-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      window.location.reload()
    } else {
      alert(json.message)
    }
    setloading(false)
  }
  const getallwithdraws = async (data) => {
    const response = await fetch(`${host}/api/transaction/withdraws`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authentication": localStorage.getItem('panel-paysyncr-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setwithdraws({ pending: json.pending, approved: json.approved, rejected: json.rejected })
    } else {
      alert(json.message)
    }
  }
  const updatewithdraw = async (data) => {
    const response = await fetch(`${host}/api/transaction/withdraw/${data.status}`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authentication": localStorage.getItem('panel-paysyncr-token')
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      window.location.reload()
    } else {
      alert(json.message)
    }
  }

  const getalldeposits = async (data) => {
    const response = await fetch(`${host}/api/transaction/deposits`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authentication": localStorage.getItem('panel-paysyncr-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setdeposits({ pending: json.pending, approved: json.approved, rejected: json.rejected })
    } else {
      alert(json.message)
    }
  }
  const updatedeposit = async (data) => {
    const response = await fetch(`${host}/api/transaction/deposit/${data.status}`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authentication": localStorage.getItem('panel-paysyncr-token')
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      window.location.reload()
    } else {
      alert(json.message)
    }
  }

  return (
    <context.Provider value={{history,deluserbyid,
      updatedeposit, updatewithdraw, login,loading,getuserbyid,userrefferal,userdata,
      getallusers, users, getallwithdraws, withdraws, getalldeposits, deposits
    }}>
      {props.children}
    </context.Provider>
  )

}

export default State