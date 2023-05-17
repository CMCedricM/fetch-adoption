import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
  Fragment,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type FetchModalProps = {
  children: ReactNode;
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  dialogTitle?: String;
  extraOnClose?: () => void;
  colorScheme?: string;
};

const FetchModal = ({
  children,
  openState,
  dialogTitle,
  extraOnClose,
  colorScheme,
}: FetchModalProps) => {
  const [open, setOpen] = openState;
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${
          colorScheme ? colorScheme : ""
        } bg-[#E0E1BC]`}
        onClose={() => (extraOnClose ? extraOnClose() : "")}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="fixed inset-0 rounded-md bg-black/30"
            aria-hidden="true"
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel
                  className={`w-full max-w-md transform overflow-hidden rounded-2xl ${
                    colorScheme ? colorScheme : "bg-white"
                  }  p-2 text-left align-middle shadow-xl transition-all`}
                >
                  <div className="pb-2">
                    <button onClick={() => setOpen(false)}>
                      <XMarkIcon width={20} height={20}></XMarkIcon>
                    </button>
                  </div>
                  {dialogTitle && (
                    <Dialog.Title
                      as="h3"
                      className="px-3 text-lg font-medium leading-6 text-gray-900"
                    >
                      {dialogTitle}
                    </Dialog.Title>
                  )}
                  {children}
                </Dialog.Panel>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default FetchModal;
