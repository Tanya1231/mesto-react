import React from 'react';

const PopupWithForm = ({ title, name, isOpen, onClose, container, buttonText, children}) => {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_open' : ''}`}>
            <div className={`popup__container ${container}`}>
                <form className={`form form_popup_${name}`} name={`${name}`} noValidate>
                    <h2 className="popup__heading">{title}</h2>
                    {children}
                    <button type="submit" className="form__button form__button_invalid" value="Сохранить">{buttonText}</button>
                </form>
                <button onClick={onClose} className="popup__button-close"></button>
                </div>
            </div>
    )
}

export default PopupWithForm;