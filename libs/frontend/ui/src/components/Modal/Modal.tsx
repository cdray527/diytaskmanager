import { useState, useEffect } from 'react';
import cn from 'classnames';

interface ModalProps {
    id: string;
    children: React.ReactNode;
    defaultIsOpen?: boolean;
    showCloseButton?: boolean;
}

function Modal({ id, children, defaultIsOpen, showCloseButton }: ModalProps) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    useEffect(() => {
        console.log(defaultIsOpen);
        if (defaultIsOpen) {
            setIsOpen(defaultIsOpen);
        }
    }, [defaultIsOpen]);

    return (
        <dialog
            id={id}
            className={cn('modal', {
                hidden: !isOpen
            })}
        >
            <div className="modal-box">
                {showCloseButton && (
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </form>
                )}
                {children}
            </div>
        </dialog>
    );
}

export default Modal;
