import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchCustomers } from './asyncActions/customers';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { incrementCreator, decrementCreator, asyncIncrementCreator, asyncDecrementCreator } from './store/countReducer';
import { fetchUsers } from './store/userReducer';

function App() {

  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)
  const count = useSelector(state => state.count.count)
  const users = useSelector(state => state.users.users)

  const addCash = cash => {
    dispatch({ type: "ADD_CASH", payload: cash })
  }

  const getCash = cash => {
    dispatch({ type: "GET_CASH", payload: cash })
  }

  const addCustomer = name => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = customer => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">

      <h2>Cash</h2>
      <div style={{ fontSize: "2rem" }} className='cash'>{cash}</div>

      <div className="wrapper">
        <button onClick={() => addCash(Number(prompt()))}>Пополнить счет</button>
        <button onClick={() => getCash(Number(prompt()))}> Снять со счета</button>
      </div>
      <hr />

      <h2>Customers</h2>
      <div className="wrapper">
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        <button disabled onClick={() => dispatch(fetchCustomers())}>Получить клиентов</button>
      </div>

      {customers.length > 0 ?
        <div className="wrapper">
          {customers.map(customer =>
            <div
              style={{ fontSize: "1.5rem", border: "1px solid black", padding: "1px", marginTop: "3px" }}
              onClick={() => removeCustomer(customer)}
            >{customer.name}</div>
          )}
        </div>
        :
        <div className="wrapper" style={{ fontSize: "1.5rem" }}>
          Клиенты отсутствуют!
        </div>
      }
      <hr />

      <h2>Redux Saga (Async actions)</h2>
      <div style={{ fontSize: "2rem" }} className='cash'>{count}</div>

      <div className="wrapper">
        <button onClick={() => dispatch(asyncIncrementCreator())}>Увеличить</button>
        <button onClick={() => dispatch(asyncDecrementCreator())}>Уменьшить</button>
        <button onClick={() => dispatch(fetchUsers())}>Получить список пользователей</button>
      </div>

      {users.length > 0 ?
        <div className="wrapper">
          {users.map(user =>
            <div
              style={{ fontSize: "1.5rem", border: "1px solid black", padding: "1px", marginTop: "3px" }}
              onClick={() => removeCustomer(user)}
            >{user.name}</div>
          )}
        </div>
        :
        <div className="wrapper" style={{ fontSize: "1.5rem" }}>
          Клиенты отсутствуют!
        </div>
      }

      <hr />

      <div>
        <span>The data for the application was parsed from the website </span>
        <a href='https://jsonplaceholder.typicode.com/'>JSONPlaceholder</a>
      </div>

    </div>
  );
}

export default App;