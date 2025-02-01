import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import context from '../context/context';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/loading';
import TreeView from "../components/TreeView.jsx";
import "./plan.css"

function UserProfile() {
    const a = useContext(context);
    const user = a.userdata;
    
    const refferals = a.userrefferal;

    const loading = a.loading;
    const history=a.history;
    const getuserbyid = a.getuserbyid;
    const [activeTab, setActiveTab] = useState('withdraw'); // Initially, set to 'withdraw'

    const { id } = useParams()
    useEffect(() => {
        getuserbyid(id)
    }, [id])

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    // Invoices
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


    return (
        <div className='container my-4'>
            {
                loading ? <Loading /> : <>
                    <h1>User Profile</h1>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Wallet:</strong> {user.wallet_address}</p>
                    <p><strong>Refferal Code:</strong> {user.referralcode}</p>
                    <p><strong>Balance:</strong> {user.balance}</p>
                    <p><strong>Locked Amount:</strong> {user.locked_amount}</p>
                    <TreeView data={refferals} />
                    <>
                    <h2>History Record</h2>
                    <ul className="nav nav-tabs" id="myTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <div
                                className={`nav-link ${activeTab === 'withdraw' ? 'active' : ''}`}
                                id="withdraw-tab"
                                data-toggle="tab"
                                href="#"
                                role="tab"
                                aria-controls="withdraw"
                                aria-selected={activeTab === 'withdraw'}
                                onClick={() => handleTabClick('withdraw')}
                            >
                                Withdraws
                            </div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <div
                                className={`nav-link ${activeTab === 'deposit' ? 'active' : ''}`}
                                id="deposit-tab"
                                data-toggle="tab"
                                href="#"
                                role="tab"
                                aria-controls="deposit"
                                aria-selected={activeTab === 'deposit'}
                                onClick={() => handleTabClick('deposit')}
                            >
                                Deposits
                            </div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <div
                                className={`nav-link ${activeTab === 'reward' ? 'active' : ''}`}
                                id="reward-tab"
                                data-toggle="tab"
                                href="#"
                                role="tab"
                                aria-controls="reward"
                                aria-selected={activeTab === 'reward'}
                                onClick={() => handleTabClick('reward')}
                            >
                                Rewards
                            </div>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabsContent">
                        <div
                            className={`tab-pane fade ${activeTab === 'withdraw' ? 'show active' : ''}`}
                            id="withdraw"
                            role="tabpanel"
                            aria-labelledby="withdraw-tab"
                        >
                            {/* Table for withdraw Withdrawals */}
                            <div className="table-responsive">
                                <table className="table table-light">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history?.withdraw?.map((withdraw) => (
                                            <tr key={withdraw._id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>${withdraw.amount?.toFixed(2)}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                                <td>
                                                    <div className="status">{withdraw.status?.toUpperCase()}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'reward' ? 'show active' : ''}`}
                            id="reward"
                            role="tabpanel"
                            aria-labelledby="reward-tab"
                        >
                            {/* Table for reward Withdrawals */}
                            <div className="table-responsive">
                                <table className="table table-light">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history?.reward?.map((withdraw) => (
                                            <tr key={withdraw._id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>${withdraw.amount?.toFixed(2)}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                               <td> <div className="status">{withdraw.type?.toUpperCase()}</div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Similar tab content for deposits */}
                        <div
                            className={`tab-pane fade ${activeTab === 'deposit' ? 'show active' : ''}`}
                            id="deposit"
                            role="tabpanel"
                            aria-labelledby="deposit-tab"
                        >
                            {/* Table for deposits */}
                            <div className="table-responsive">
                                <table className="table table-light">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history?.deposit?.map((withdraw) => (
                                            <tr key={withdraw._id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>${withdraw.amount?.toFixed(2)}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                                <td>
                                                    <div className="status">{withdraw.status?.toUpperCase()}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
                </>
            }

        </div>
    );
}

export default UserProfile;
