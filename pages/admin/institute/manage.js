import React, { useEffect, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
// import styles from '../../../styles/manage.module.scss'
import styles from '../../../styles/portals/insti_manage.module.css'


function Candidates() {
    const [activeTabName, setActiveTabName] = useState()
    const [activeChildTabName, setActiveChildTabName] = useState()
    // useEffect(() => {
    //     setExpandedTabName('Institutes')
    // })
    return (
        <Portal_Layout activeTabName='institutes' activeChildTabName='manage institutes' userType='admin'>
            <div>
                <h1>Manage institutes</h1>
                <span type='hr'></span>
                <h2>Add or Edit institutes</h2>
                <label htmlFor="">Name</label> <br />
                <input type="text" status='success' name="" id="" value={'here is a text'} />
                <br />
                <input type="text" status='failed' name="" id="" value={'here is a text'} />
                <p type='helper' status='success'>helper text</p>
                <p type='helper' status='failed' className={styles.over}>helper text jkldfsjkla</p>

                <table >
                    <tr>
                        <th>Month</th>
                        <th>Savings</th>
                        <th>Month</th>
                        <th>Savings</th>
                        <th>Month</th>
                        <th>Savings</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                        <td>1</td>
                        <td>$100</td>
                    </tr>
                </table>            </div>
        </Portal_Layout>
    )
}

export default Candidates