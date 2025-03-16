import { useState, useEffect } from 'react';
import cn from 'classnames';

interface ModalProps {
    id: string;
    children: React.ReactNode;
    defaultIsOpen?: boolean;
    showCloseButton?: boolean;
    onClickCloseButton?: () => void;
}

function Modal({ id, children, defaultIsOpen, showCloseButton, onClickCloseButton }: ModalProps) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    useEffect(() => {
        if (defaultIsOpen) {
            setIsOpen(defaultIsOpen);
        }
    }, [defaultIsOpen]);

    return (
        <dialog
            id={id}
            className={cn('modal', {
                'bg-slate-950 bg-opacity-50 visible pointer-events-auto': isOpen
            })}
        >
            <div
                className={cn('modal-box', {
                    'opacity-100': isOpen
                })}
            >
                {showCloseButton && (
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={onClickCloseButton}
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
