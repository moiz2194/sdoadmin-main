import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import context from '../context/context';
import Loading from "../components/loading.jsx"
import "./profile.css"
const Plans = () => {
  const a = useContext(context);
  const getallusers = a.getallusers;
  const users = a.users;
  const deluser = a.deluserbyid;
  const loading = a.dataloading;
  const [filteredusers, setfilteredusers] = useState([]);
  useEffect(() => {
    getallusers();
  }, []);
  useEffect(() => {
    setfilteredusers(users)
  }, [users]);


  const handleDelete = (id) => {
    deluser({ id });
  };

  // Search bar 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Implement the search functionality here, for example:
    const filteredata = users.filter((elem) =>
    elem.name.toLowerCase().includes(query.toLowerCase()) ||
    elem.email.toLowerCase().includes(query.toLowerCase())
  );
    setfilteredusers(filteredata)
  };

  return (
    <div className='container'>

      {
        loading ? <Loading /> : <>
          <h1 className="my-3 text-center">All Users</h1>
          <div className="toprow">
            <div style={{minWidth:"15rem"}} class="form-inline my-2 my-lg-0">
              <input value={searchQuery}
                onChange={handleSearchChange} class="form-control mr-sm-2" type="search" placeholder="Search by name or email" aria-label="Search" />
            </div>
          </div>

<div className="table-responsive">
          <Table bordered >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredusers.map((plan) => (
                <tr key={plan._id}>
                  <td>{plan.name}</td>
                  <td>{plan.email}</td>
                  <td>${plan.balance?.toFixed(2)}</td>
                  <td style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                    <Button
                      variant="success"
                      onClick={() => window.location.href=`/user/${plan._id}`}
                    >
                      More info...
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(plan._id)}
                      style={{ marginRight: '5px' }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </>
      }

    </div>
  );
};

export default Plans;
