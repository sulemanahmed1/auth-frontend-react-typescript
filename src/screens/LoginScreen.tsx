import { SyntheticEvent, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { UserState } from '../reducers/userReducers'
import { RootState } from '../store'

interface Props {
  history: RouteComponentProps['history']
}

const LoginScreen = ({ history }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo !== undefined && userInfo.firstName) {
      history.push('/')
    }
  }, [userInfo, history])

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='username' className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' className='my-3'>
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen