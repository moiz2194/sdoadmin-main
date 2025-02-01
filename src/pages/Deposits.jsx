import React, { useContext, useEffect, useState } from 'react';
import context from '../context/context';
import Loading from '../components/loading';
import "./deposit.css"
const Deposits = () => {
    const a = useContext(context);
    const deposits = a.deposits;
    const getalldeposits = a.getalldeposits;
    const updatedeposit=a.updatedeposit;
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('pending'); // Initially, set to 'pending'

    useEffect(() => {
        const getdata = async () => {
            setLoading(true);
            await getalldeposits();
            setLoading(false);
        };
        getdata();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    function formatDateToDdmmyyyy(inputDate) {
        const date = new Date(inputDate);
      
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear().toString();
      
        return `${day}/${month}/${year}`;
      }
      function formatTimeTo12hr(inputTime) {
        const date = new Date(inputTime);
      
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12 || 12; // Convert to 12-hour format
      
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        return formattedTime;
      }    
      const handleapprove=(id)=>{
        updatedeposit({id,status:"approve"})
      }  
      const handlereject=(id)=>{
        updatedeposit({id,status:"reject"})
      }  
    return (
        <div className='container'>
            <h2 className='my-3'>Deposits</h2>
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <ul className="nav nav-tabs" id="myTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                                id="pending-tab"
                                data-toggle="tab"
                                href="#pending"
                                role="tab"
                                aria-controls="pending"
                                aria-selected={activeTab === 'pending'}
                                onClick={() => handleTabClick('pending')}
                            >
                                Pending
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'approved' ? 'active' : ''}`}
                                id="approved-tab"
                                data-toggle="tab"
                                href="#approved"
                                role="tab"
                                aria-controls="approved"
                                aria-selected={activeTab === 'approved'}
                                onClick={() => handleTabClick('approved')}
                            >
                                Approved
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'rejected' ? 'active' : ''}`}
                                id="rejected-tab"
                                data-toggle="tab"
                                href="#rejected"
                                role="tab"
                                aria-controls="rejected"
                                aria-selected={activeTab === 'rejected'}
                                onClick={() => handleTabClick('rejected')}
                            >
                                Rejected
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabsContent">
                        <div
                            className={`tab-pane fade ${activeTab === 'pending' ? 'show active' : ''}`}
                            id="pending"
                            role="tabpanel"
                            aria-labelledby="pending-tab"
                        >
                            {/* Table for Pending Withdrawals */}
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>User Email</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deposits?.pending?.map((withdraw) => (
                                            <tr key={withdraw.id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>{withdraw.amount}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                                <td>{withdraw?.user?.email}</td>
                                                <td><img width={100} src={withdraw.image?.url} alt="Image of deposit" className='pointer' onClick={()=>{window.location.href=withdraw.image?.url}}/></td>
                                                <td>
                                                    <button onClick={()=>handleapprove(withdraw._id)} className="btn btn-success mx-1 my-1">Approve</button>
                                                    <button onClick={()=>handlereject(withdraw._id)} className="btn btn-danger mx-1">Reject</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'rejected' ? 'show active' : ''}`}
                            id="rejected"
                            role="tabpanel"
                            aria-labelledby="rejected-tab"
                        >
                            {/* Table for Rejected Withdrawals */}
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>User Email</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deposits.rejected.map((withdraw) => (
                                            <tr key={withdraw.id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>{withdraw.amount}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                                <td>{withdraw?.user?.email}</td>
                                                <td><img width={100} src={withdraw.image?.url} alt="Image of deposit" className='pointer' onClick={()=>{window.location.href=withdraw.image?.url}}/></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Similar tab content for Approved withdrawals */}
                        <div
                            className={`tab-pane fade ${activeTab === 'approved' ? 'show active' : ''}`}
                            id="approved"
                            role="tabpanel"
                            aria-labelledby="approved-tab"
                        >
                            {/* Table for Approved Withdrawals */}
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>User Email</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deposits.approved.map((withdraw) => (
                                            <tr key={withdraw.id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>{withdraw.amount}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                                <td>{withdraw?.user?.email}</td>
                                                <td><img width={100} src={withdraw.image?.url} alt="Image of deposit" className='pointer' onClick={()=>{window.location.href=withdraw.image?.url}}/></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Deposits;
