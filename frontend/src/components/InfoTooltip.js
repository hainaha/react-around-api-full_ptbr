import success_icon from '../images/success_icon.png';
import error_icon from '../images/error_icon.png';

function InfoTooltip(props) {
  return (
    <>
      <div className={`popup ` + (props.isOpen ? 'popup_opened' : '')}>
        <div className='popup__container info-tooltip'>
          <img
            src={props.success ? success_icon : error_icon}
            alt='Ícone que mostra um V em caso de sucesso ou um X em caso de erro no registro, ler o texto seguinte para melhor entendimento.'
            className='info-tooltip__icon'
          />
          <p className='popup__title info-tooltip__text'>
            {props.success
              ? 'Tudo certo! Você já pode fazer o login.'
              : 'Ops, algo deu errado! Por favor, tente novamente.'}
          </p>
          <button
            className='popup__close'
            type='button'
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
