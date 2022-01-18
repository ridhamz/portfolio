import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../navigation/backDrop';
import './modal.css';

const ModalOverlay = ({
    className,
    style,
    onSubmit,
    children,
    header,
    headerClass,
    contentClass,
    footer,
    footerClass
}) => {
    const content = (
        <div className={`modal ${className}`} style={style}>
            <header className={`modal__header ${headerClass}`}>
                <h2>{header}</h2>
            </header>
            <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()} >
                <div className={`modal__content ${contentClass}`}>
                    {children}
                </div>
                <footer className={`modal__footer ${footerClass}`}>
                    {footer}
                </footer>
            </form>
        </div>
    )
    return ReactDom.createPortal(content, document.getElementById('modal-hook'))
};

const Modal = props => {
    return (
        <Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={300}
                classNames='modal'
            >
            <ModalOverlay {...props} />
            </CSSTransition>
        </Fragment>
    );
}

export default Modal;