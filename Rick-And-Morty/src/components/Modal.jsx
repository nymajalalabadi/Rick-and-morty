import { XCircleIcon } from "@heroicons/react/24/outline";
import { Children } from "react";

function Modal({title, Children,open, onOpne}) {
    if(!open)
    {
        return null
    }

  return (
    <div>
      <div className="backdrop" onClick={() => onOpne(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onOpne(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {Children}
      </div>
    </div>

  )
}

export default Modal
