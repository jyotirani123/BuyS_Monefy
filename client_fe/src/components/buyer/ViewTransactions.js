import React from 'react'
import Header from '../header/Header'
function ViewTransactions() {
  return (
    <div>
      <Header />
      
      <div classNameName="d-flex justify-content-center">
        
        <table className="container table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Buyer Name</th>
              <th>Suplier Name</th>
              <th>Item Name</th>
              <th>Number of Items</th>
              <th>Total Price</th>
              <th>Mode of Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td><p className="fw-normal mb-1">Software engineer</p></td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
            </tr>
            <tr>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td><p className="fw-normal mb-1">Software engineer</p></td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
            </tr>
            <tr>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td><p className="fw-normal mb-1">Software engineer</p></td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewTransactions