import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <>
      <div>
        <form>
          <div className='auth-form__container'>
            <p className='auth-form__title'>Entrar</p>
            <input
              type='email'
              name='email'
              value={props.values.email}
              onChange={props.handleChange}
              placeholder='E-mail'
              className='auth-form__input'
              id='register_email'
              required=''
              minLength='2'
              maxLength='30'
            />
            <input
              type='password'
              name='password'
              value={props.values.password}
              onChange={props.handleChange}
              placeholder='Senha'
              className='auth-form__input'
              id='register_password'
              required=''
              minLength='2'
              maxLength='30'
            />
            <button
              className={'auth-form__button'}
              type='submit'
              onClick={props.handleSubmit}
            >
              Entrar
            </button>
            <p className='auth-form__text'>
              <Link to='signup' className='auth-form__text'>
                Ainda não é membro? Inscreva-se aqui!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
